const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const express = require('express');
const cors = require('cors');

const stripe = require('stripe')(
	'sk_test_51HWm7TE4qpuq0zaDC3hyedAKx3B3dAkFHtCzwEu6KC8n0sY2qn4uu4iSzb67GNHraPzZXkkEdj4s8Ih0Nr3NeIIe00yC9edH12'
);

//api

// app config
const app = express();

// middlewares

app.use(cors({ origin: true }));
app.use(express.json());

// api routes
app.get('/', (req, res) => res.status(200).send('hello world'));

app.post('/payments/create', async (request, response) => {
	const total = request.query.total;

	console.log('Payment Request Recieved BOOM!!! for this amount >>> ', total);
	var customer = await stripe.customers.create({
		name: 'Jenny Rosen',
		address: {
			line1: '510 Townsend St',
			postal_code: '98140',
			city: 'San Francisco',
			state: 'CA',
			country: 'US'
		}
	});
	const paymentIntent = await stripe.paymentIntents.create({
		amount: total, // subunits of the currency
		currency: 'inr',
		description: 'Amazon Purchase'
	});

	// OK - Created
	response.status(201).send({
		clientSecret: paymentIntent.client_secret,
		customer: customer
	});
});

// listen command
exports.api = functions.https.onRequest(app);

//http:localhost:5001/challenge-564f3/us-central1/api
