const session = require('express-session')
const express = require('express')
const ShopifyToken = require('shopify-token')

const PORT = process.env.PORT || 3000

const baseUrl =
	process.env.NODE_ENV === 'development' ? `http://localhost:${PORT}` : `http://localhost:${PORT}`

const redirectUrl =
	process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : 'http://localhost:8080'

const config = {
	redirectUri: `${baseUrl}/callback`,
	apiKey: '3549cf352516673891ccb25f9af45e7c',
	sharedSecret: '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',
	shop: 'djordje-st-demo.myshopify.com',
	scopes: ['read_customers', 'write_customers']
}

const shopifyToken = new ShopifyToken(config)
const app = express()

app.use(express.json({ limit: '1mb' }))

app.use(
	session({
		secret: 'eo3Athuasd213o4Ang5gai',
		saveUninitialized: false,
		resave: false
	})
)

app.get('/', (req, res) => {
	if (req.session.token) return res.send('Token ready to be used')

	const nonce = shopifyToken.generateNonce()
	const uri = shopifyToken.generateAuthUrl(req.query.shop || config.shop, config.scopes, nonce)

	req.session.state = nonce
	res.redirect(uri)
})

app.get('/callback', (req, res) => {
	const state = req.query.state

	if (
		typeof state !== 'string' ||
		state !== req.session.state ||
		!shopifyToken.verifyHmac(req.query)
	) {
		return res.status(400).send('Security checks failed')
	}

	shopifyToken
		.getAccessToken(req.query.shop, req.query.code)
		.then(data => {
			const token = data.access_token

			req.session.token = token
			req.session.state = undefined
			res.cookie('token', token)
			res.cookie('shop', req.query.shop)
			res.redirect(`${redirectUrl}?token=${token}&shop=${req.query.shop}`)
		})
		.catch(err => {
			console.error(err.stack)
			res.status(500).send('Oops, something went wrong')
		})
})

app.listen(PORT, () => console.log(`Open ${baseUrl} in your browser`))
