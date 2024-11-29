import React, { useContext, useState } from 'react'
import classes from './Payment.module.css'
import LayOut from '../../Components/LayOut/LayOut'
import { DataContext } from '../../Components/DataProvider/DataProvider'
import ProductCard from '../../Components/Product/ProductCard';
import {useStripe,useElements,CardElement} from "@stripe/react-stripe-js";
import CurrencyFormat from '../../Components/CurrencyFormat/CurrencyFormat';
import { getApp } from 'firebase/app';
import { axiosInstance } from '../../Components/Api/axios';
import { ClipLoader } from 'react-spinners';
import { db } from '../../Utility/firebase';
import { collection, doc, setDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { Type } from '../../Utility/action.type';

function Payment() {
  const [{user,basket},dispatch]=useContext(DataContext);
  console.log(user);
  const stripe = useStripe();
  const elements = useElements();
  const [cardError,setCardError]=useState(null);
  const [processing, setProcessing]=useState(false);
  const navigate=useNavigate();
  // console.log(user);
  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);
  const handleChange=(e)=>{
    e?.error?.message? setCardError(e?.error?.message):setCardError("")
    
  }
  const handlePayment=async(e)=>{
    e.preventDefault();
    try {
      setProcessing(true);
      // 1.
      //backend || functions------>contact to the client secret
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total * 100}`,
      });
      console.log(response);

      const clientSecret = response.data.ClientSecret;
      // 2. client side (react side confirmation)
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
      console.log(paymentIntent);
      // 3. after the confirmation ---->order firestore database save, clear basket
      if (!user?.uid) {
        throw new Error("User is not authenticated or UID is missing.");
      }
      const orderData = {
        basket: basket, // the items purchased
        amount: paymentIntent.amount, // the amount charged
        created: paymentIntent.created, // timestamp of payment
      };

      // Write to Firestore
      // await db
      //   .collection("user")
      //   .doc(user.uid) // User document
      //   .collection("orders") // Orders subcollection
      //   .doc(paymentIntent.id) // Order ID from payment intent
      //   .set(orderData);
      //   console.log("Order successfully written to Firestore:", orderData);

      // Firestore v9 write
      const userOrdersRef = collection(db, "user", user.uid, "orders");
      const orderDocRef = doc(userOrdersRef, paymentIntent.id); // Unique document ID based on paymentIntent
      await setDoc(orderDocRef, orderData);

      // Step 4: Clear the basket
      dispatch({
        type: Type.EMPTY_BASKET,
      });

      setProcessing(false);
      navigate("/orders",{state:{msg:"you have placed a new order"}})
    } catch (error) {
      console.log(error);
      setProcessing(false)
      
    }
    
   
   
  }
  return (
    <LayOut>
      {/* header */}
      <div className={classes.payment_header}>Checkout ({totalItem}) items</div>
      {/* payment method */}
      <section className={classes.payment}>
        {/* address */}
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>Matthew</div>
            <div>Charlotte,NC</div>
          </div>
        </div>
        <hr />

        {/* product */}
        <div className={classes.flex}>
          <h3>Review items and delivery </h3>
          <div className={classes.product_list} >
            {basket?.map((item,i) => (
              <ProductCard product={item} flex={true} key={i} />
            ))}
          </div>
        </div>
        <hr />

        {/* card form */}
        <div className={classes.flex}>
          <h3>Payment method</h3>
          <div className={classes.payment_card_container}>
            <div className={classes.payment_details}>
              <form action="" onSubmit={handlePayment}>
                {/* error */}
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                {/* card element */}
                <CardElement onChange={handleChange} />
                {/* price */}
                <div className={classes.payment_price}>
                  <div>
                    <span style={{display:"flex",gap:"10px"}}>
                      <p> Total order</p> | <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button type='submit'>
                    {processing?(<div className={classes.loading}><ClipLoader color='gray' size={12}/>
                    <p>processing...</p>
                    </div>
                    ):
                    "Pay Now"}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payment