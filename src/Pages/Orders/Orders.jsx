import React, { useContext, useEffect, useState } from 'react'
import LayOut from '../../Components/LayOut/LayOut'
import { DataContext } from '../../Components/DataProvider/DataProvider'
import classes from './Orders.module.css'
import { db } from '../../Utility/firebase'
// import { collection,doc,orderBy,onSnapshot } from 'firebase/firestore'
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import ProductCard from '../../Components/Product/ProductCard'

function Orders() {
  const [{ user }, dispatch] = useContext(DataContext);
  const [orders, setOrders] = useState([]);
  // useEffect(()=>{
  //   if(user)
  //   {
  //     db.collection("user").doc(user.uid).collection("orders").orderBy("created","desc").onSnapshot((snapshot)=>{
  //       console.log(snapshot);
  //       setOrders(
  //         snapshot.docs.map((doc)=>({

  //           id:doc.id,
  //           data:doc.data(),
  //         }

  //         ))
  //       )
  //     })
  //   }
  //   else
  //   {
  //     setOrders([]);
  //   }

  // },[])
  useEffect(() => {
    if (user) {
      // Reference the orders collection under the specific user
      const userOrdersRef = collection(db, "user", user.uid, "orders");

      // Create a query to order by the "created" field in descending order
      const q = query(userOrdersRef, orderBy("created", "desc"));

      // Listen to the query snapshot
      const unsubscribe = onSnapshot(q, (snapshot) => {
        console.log(snapshot);
        setOrders(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });

      // Clean up the listener on component unmount
      // return () => unsubscribe();
    } else {
      setOrders([]);
    }
  }, [user]); // Add 'user' as a dependency if it's changing dynamically

  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.orders_container}>
          <h2>Your orders</h2>
          {/* ordered items */}
          {
            orders?.length==0&&(<div style={{padding:"20px"}}>You don't have orders yet.</div>)
          }
          <div>
            {
              orders?.map((eachOrder,i)=>{
                return(
                  <div key={i}>
                    <hr />
                    <p >Order ID: {eachOrder?.id}</p>
                    {eachOrder?.data?.basket?.map((order)=>(<ProductCard flex={true} product={order} key={order.id}/>))}

                  </div>
                )
              })
            }
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Orders