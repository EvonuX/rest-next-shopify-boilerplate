import axios from 'axios'

export default async function handler(req, res) {
	try {
		const { data } = await axios.get(
			`https://${req.cookies.shop}/admin/api/2020-10/customers.json`,
			{
				headers: {
					'X-Shopify-Access-Token': req.cookies.token
				}
			}
		)

		res.json(data)
	} catch (err) {
		res.json(err)
	}
}
