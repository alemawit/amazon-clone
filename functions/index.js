
const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const express=require('express');
const cors=require('cors');
const dotenv=require('dotenv');
dotenv.config()
dotenv.config();

// Check if STRIPE_KEY is being loaded correctly
// if (!process.env.STRIPE_KEY) {
//     console.error("STRIPE_KEY is not defined. Check your .env file.");
// } else {
//     console.log("Stripe Key Loaded Successfully");
// }

// console.log("Stripe Key:", process.env.STRIPE_KEY); // This should print your key if it's correctly loaded.

const stripe = require("stripe")(process.env.STRIPE_KEY);

const app=express();
app.use(cors({origin:true}))
app.use(express.json())

app.get('/',(req,res)=>{
    res.status(200).json({
        message:"Success"
    })
});

app.post('/payment/create',async(req,res)=>{
    const total=parseInt(req.query.total);
    // if(total>0)
    // {
    //     const paymentIntent=await stripe.paymentIntents.create({
    //         amount:total,
    //         currency:"usd"
    //     })
    //     console.log(paymentIntent);
    //     res.status(201).json({
    //         ClientSecret: paymentIntent.client_secret
    //     })
    // }else
    // {
    //     res.status(403).json({
    //         message:"total must be greater than 0"
    //     })
    // }
     if (isNaN(total) || total <= 0) {
       return res.status(403).json({
         message: "Total must be a number greater than 0",
       });
     }

     try {
       const paymentIntent = await stripe.paymentIntents.create({
         amount: total,
         currency: "usd",
       });

       console.log("Payment Intent Created:", paymentIntent); // Log the payment intent details

       res.status(201).json({
         ClientSecret: paymentIntent.client_secret,
       });
     } catch (error) {
       console.error("Stripe Error:", error); // Log the error details
       res.status(500).json({
         message: "Payment failed",
         error: error.message, // Send the error message to the client
       });
     }
})

exports.api=onRequest(app)