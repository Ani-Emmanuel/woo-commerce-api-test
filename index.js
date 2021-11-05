const express = require('express');
const WooCommerceRestApi = require('@woocommerce/woocommerce-rest-api').default;
require('dotenv').config();
const app = express();
app.use([express.urlencoded({ extended: true }), express.json()]);

var WooCommerce = new WooCommerceRestApi({
	url: process.env.URl,
	consumerKey: process.env.consumerKey,
	consumerSecret: process.env.consumerSecret,
	version: 'wc/v3'
});

app.get('/product', async (req, res) => {
	try {
		const products = await WooCommerce.get('products');
		res.send(products.data);
	} catch (error) {
		res.status(error.response.status).send(error.response.data);
	}
});

app.get('/product/:id', async (req, res) => {
	try {
		const products = await WooCommerce.get(`products/${req.params.id}`);
		res.send(products.data);
	} catch (error) {
		res.status(error.response.status).send(error.response.data);
	}
});

app.post('/product', async (req, res) => {
	try {
		const product = await WooCommerce.post('products', req.body);
		res.send(product.data);
	} catch (error) {
		res.status(error.response.status).send(error.response.data);
	}
});

app.put('/product/:id', async (req, res) => {
	try {
		const product = await WooCommerce.put(
			`products/${req.params.id}`,
			req.body
		);
		res.send(product.data);
	} catch (error) {
		res.status(error.response.status).send(error.response.data);
	}
});

app.delete('/product/:id', async (req, res) => {
	try {
		const product = await WooCommerce.delete(`products/${req.params.id}`, {
			force: true
		});
		res.send(product.data);
	} catch (error) {
		res.status(error.response.status).send(error.response.data);
	}
});

app.listen(3000, () => console.log(`we are live on 3000`));
