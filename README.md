# Shopify REST boilerplate with Next.JS

## Setup

Create an app using your Shopify Partner account and get the API key and secret from the app dashboard.

Add the key and secret to the `index.js` file as follows:

```javascript
const config = {
	apiKey: 'SHOPIFY_API_KEY',
	sharedSecret: 'SHOPIFY_API_SECRET'
}
```

## Development

Start the server by running `npm run dev` and run the client by navigating to the `client` directory and running `npm run dev`.

Open the server on localhost and pass a query string with the shop name where you want to test the app.

Example:

```
http://localhost:3000?shop=test-shop.myshopify.com
```

You then get redirected to the store where you're asked to install the app.

Once the app is installed you'll get redirected to the client where you can make changes to the app.

## API Scope

Scopes can be edited in `index.js`.

```javascript
const config = {
	scopes: ['read_customers', 'write_customers']
}
```

## Deployment

You can deploy the server to Heroku and the client to Vercel or another hosting website of your choosing.
