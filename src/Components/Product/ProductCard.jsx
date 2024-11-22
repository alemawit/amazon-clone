import React, { useContext } from "react";
import Rating from "@mui/material/Rating";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";
import classes from "./Product.module.css";
import { Link } from "react-router-dom";
import { DataContext } from "../DataProvider/DataProvider";
import {Type} from '../../Utility/action.type'
function ProductCard({ product, flex, renderDescription, renderAdd }) {
  const { image, title, price, rating, id,description } = product;
  const [state,dispatch]=useContext(DataContext)
  console.log(state);
  const addtoCart=()=>{
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: {
        image,
        title,
        price,
        rating,
        id,
        description,
      },
    });
        
  }


  // Optional chaining to safely access rating and rate
  const productRating = rating?.rate || 0; // Default to 0 if rating is not available
  const ratingCount = rating?.count || 0; // Default to 0 if count is not available

  return (
    <div
      className={`${classes.card_container} ${
        flex ? classes.product_flexed : ""
      }`}
    >
      <Link to={`/products/${id}`}>
        <img src={image} alt={title} />
      </Link>
      <div>
        <h3 className={classes.title_container}>{title}</h3>
        {renderDescription && (
          <div style={{ maxWidth: "700px" }}>{description}</div>
        )}
        <div className={classes.rating}>
          {/* Rating */}
          <Rating value={productRating} precision={0.1} readOnly />
          {/* Rating count */}
          <small>{ratingCount} reviews</small>
        </div>
        <div>
          {/* Price */}
          <CurrencyFormat amount={price} />
        </div>
        {renderAdd && (
          <button className={classes.button} onClick={addtoCart}>
            Add to cart
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
