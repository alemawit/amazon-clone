import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { productUrl } from '../../Components/Api/endPoints';
import ProductCard from '../../Components/Product/ProductCard';
import LayOut from '../../Components/LayOut/LayOut';
import Loader from '../../Components/Loader/Loader';

const ProductDetail = () => {
    const [product, setProduct] = useState({});
    const [isLoading, setisLoading] = useState(false);
    const {productId}=useParams();
    console.log(productId);

    useEffect(()=>{
        setisLoading(true)
        axios.get(`${productUrl}/products/${productId}`)
            .then((res) => {
                setProduct(res.data);
                setisLoading(false)
                console.log(res.data);
                
            })
            .catch((err) => {
                console.log(err);
                setisLoading(false)
            });
    },[])

    return (
      <LayOut>
        {isLoading ? <Loader /> : <ProductCard product={product} flex={true} renderDescription={true}  renderAdd={true}/>}
      </LayOut>
    );
}

export default ProductDetail