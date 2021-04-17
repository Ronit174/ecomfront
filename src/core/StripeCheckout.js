import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import { cartEmpty, loadCart } from './helper/CartHelper';
import StripeCheckoutButton from "react-stripe-checkout";
import { API } from '../backend';
import { createOrder } from './helper/OrderHelper';




const StripeCheckout=({products, setReload = f=>f, reload= undefined})=> {
    
    const [data, setData] = useState({
        loading:false,
        sucess:false,
        error:"",
        address:""
    });

    const token = isAuthenticated() && isAuthenticated().token
    const userId = isAuthenticated() && isAuthenticated().user._id

    const getFinalAmount = () => {
       let amount =0
       products.map(p => {
           amount= amount + p.price
       })
       return amount;
    };

    const makePayment=(token) =>{
        const body ={
            token, products
        }
        const headers = {
            "Content-Type":"application/json"
        }
        return fetch(`${API}/stripepayment`,{
            method:"POST",
            headers,
            body: JSON.stringify(body)
        }).then(response => {
            console.log(response);
            const {status} = response;
            console.log("STATUS" , status);

        }).catch(error => console.log(error));
    };

    const showStripeButton =() =>{
        return isAuthenticated()? (
            <StripeCheckoutButton 
            
             stripeKey="pk_test_51HgP5BFnxuBtdAsJETK3HCRUjpWMrlDzE9pF27mpTROMQMYcNtXTfhfhjqE4wp88pi5EIRt1XDgU7NUjZ9Xi3JFM00pSHarohO"
             token={makePayment}
             amount={getFinalAmount() * 100}
             name="Buy Tshirts"
             shippingAddress
             billingAddress
            >
               <button className="btn btn-info">Pay with Stripe</button>
            </StripeCheckoutButton>
        ):(
            <Link to="/signin">
                <button className="btn btn-warning">Signin</button>
            </Link>
        )

    };



    return (
        <div>
            <h3 className="text-dark">Stripe Checkout ${getFinalAmount()}</h3>
            {showStripeButton()}
        </div>
    )
}

export default StripeCheckout;
