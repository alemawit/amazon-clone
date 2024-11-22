import React, { useEffect, useState } from 'react'
import LayOut from '../../Components/LayOut/LayOut'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { productUrl } from '../../Components/Api/endPoints';
import ProductCard from '../../Components/Product/ProductCard';
import classes from './Results.module.css'
import Loader from '../../Components/Loader/Loader';

const Results = () => {
    const [results ,setResults]=useState([]);
    const [isLoading, setisLoading] = useState(false);
    const { categoryName } = useParams();
    console.log(categoryName);
    
    useEffect(() => {
        
            setisLoading(true)
            axios.get(`${productUrl}/products/category/${categoryName}`)
            .then((res) => {
                console.log(res);
                setResults(res.data);
                setisLoading(false)
            })
            .catch((err) => {
                console.log(err);
                isLoading(false)
            });
    }, []);

    return (
        <LayOut>
            <div>
            <h1 style={{ padding: "30px" }}>Results</h1>
            <p style={{ padding: "30px" }}>category/{categoryName}</p>
            <hr />
            {isLoading ? (<Loader />) : (
                <div className={classes.product_container}>
                {results?.map((product) => (
                    <ProductCard key={product.id} product={product}
                    renderDescription={false}
                    renderAdd={true} />
                ))}
                </div>
            )}
            </div>
        </LayOut>
       
    );
}

export default Results