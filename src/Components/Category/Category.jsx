import React from "react";
import categoryInfo from "./categoryfullinfos.js";
import CategoryCard from "./CategoryCard.jsx";
import classes from './Category.module.css'

const Category = () => {
  return (
    <section className={classes.category_container}>
      {categoryInfo.map((info) => (
        // Make sure you return the component in the map callback
        <CategoryCard key={info.id} data={info} />
      ))}
    </section>
  );
};

export default Category;
