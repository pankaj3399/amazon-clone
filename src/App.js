import React, { useEffect } from 'react';
import './App.css';
import Header from './Header.js';
import Home from './Home.js';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Checkout from './Checkout.js';
import Login from './Login.js';
import { auth } from './firebase.js';
import { useStateValue } from './StateProvider';
import Payment from './Payment';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Orders from './Orders.js';

const promise = loadStripe(
	'pk_test_51HWm7TE4qpuq0zaDm1ywAK4nv8Nsm3c0nK2aHGUmgsqY0eRbsU8CgQD3SQyskdAEpduQ9TYeWGH1W3xEEdC75byb00nKFHLDGh'
);
function App() {
	const [ {}, dispatch ] = useStateValue();
	useEffect(() => {
		auth.onAuthStateChanged((authUser) => {
			//console.log(authUser);
			if (authUser) {
				dispatch({
					type: 'SET_USER',
					user: authUser
				});
			} else {
				dispatch({
					type: 'SET_USER',
					user: null
				});
			}
		});
	}, []);
	return (
		<Router>
			<div className="App">
				<Switch>
					<Route path="/orders">
						<Header />
						<Orders />
					</Route>
					<Route path="/login">
						<Login />
					</Route>

					<Route path="/checkout">
						<Header />
						<Checkout />
					</Route>

					<Route path="/payment">
						<Header />
						<Elements stripe={promise}>
							<Payment />
						</Elements>
					</Route>

					<Route path="/">
						<Header />
						<Home />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
