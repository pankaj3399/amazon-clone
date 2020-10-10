import React, { useState ,useEffect} from 'react';
import './Payment.css';
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct.js';
import { Link, useHistory } from 'react-router-dom';
import {CardElement, useStripe, useElements} from"@stripe/react-stripe-js"
import CurrencyFormat from 'react-currency-format';
import axios from 'axios'
import {db} from './firebase'
function Payment() {
    const [ {basket,user}, dispatch ] = useStateValue();  
    const stripe = useStripe()
    const elemenets = useElements()
    const history = useHistory();
    const [error,setError]=useState(null);
    const [disabled,setDisabled]= useState(true);
    const [succeeded,setSucceeded]= useState(false);
    const [processing,setProcessing]= useState("");
    const [clientSecret,setClientSecret]= useState(true);
   // const[customer,setCustomer]=useState({})
    const getBasketTotal = (basket) => basket.reduce((amount, item) => item.price + amount, 0);
    useEffect(() => {
        // generate the client secret
       const getClientSecret = async() =>{
        axios.post(`https://us-central1-challenge-564f3.cloudfunctions.net/api/payments/create?total=${getBasketTotal(basket) * 100}`).then(response=>{ setClientSecret(response.data.clientSecret)})
       }

       getClientSecret();
        return () => {
            
        }
    }, [basket])
    console.log("Secret",clientSecret)
    const handleSubmit =async (event)=>{
        // stripe stuff
        event.preventDefault();
        setProcessing(true);
        

        const payload = await stripe.confirmCardPayment(clientSecret,{
            payment_method:{
                card:elemenets.getElement(CardElement)
            }
        }).then(({paymentIntent })=>{
            
            console.log(user)
            db.collection('users')
            .doc(user?.uid)
            .collection('orders').doc(paymentIntent.id)
            .set({
                basket:basket,
                amount:paymentIntent.amount,
                created:paymentIntent.created
            })

            setSucceeded(true);
            setError(null);
            setProcessing(false);
            dispatch({
                type:"EMPTY_BASKET"
            })
            history.replace("/orders")
        })

    }
    const handleChange =(event)=>{
        //Listen for changes in card element and show error
        setDisabled(event.empty)
        setError(event.error?event.error.message :"");
 

    }
	return (
		<div className="payment">
			<div className="payment__container">
            <h1>Checkout (<Link to='/checkout'> {basket.length} items </Link>)</h1>
				<div className="payment__section">
					<div className="payment__title">
						<h3> Delivery Address</h3>
					</div>
                    <div className='payment__address'>
                    <p>{user?.email}</p>
                    <p> 123 React Lane</p>
                    <p>Petaluma,CA</p>
                    </div>
				</div>
				<div className="payment__section" >
                <div className="payment__title">
                    <h3> Review items and deliveries</h3>
                </div>
                <div className='payment__items'>
                {basket.map((item) => (
						<CheckoutProduct
							id={item.id}
							title={item.title}
							image={item.image}
							price={item.price}
							rating={item.rating}
						/>
					))}
                </div>
                </div>
				<div className="payment__section" >
                <div className="payment__title">
                    <h3> Payment Method</h3>
                </div>
                <div className="payment__details">
            {/* Stripe */}
            <form onSubmit={handleSubmit}>
            <CardElement onChange={handleChange} />
            <div className="payment__priceContainer">
            <CurrencyFormat
				renderText={(value) => (
						<h3>
							Order Total<strong>{value}</strong>
						</h3>
				
				)}
				decimalScale={2}
				value={getBasketTotal(basket)}
				displayType={'text'}
				thousandSeaparator={true}
				prefix={'$'}
			/>
            <button disabled={processing|| disabled|| succeeded}><span>{processing?<p>Processing</p>:"Buy Now"}</span></button>
            </div>
            {error && <div>{error}</div>}
            </form>
                </div>
                </div>
			</div>
		</div>
	);
}

export default Payment;
