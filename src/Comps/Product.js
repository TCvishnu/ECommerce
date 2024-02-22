import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Ratings from './Ratings';
import Images from './Images';
import AddToCart from './AddToCart';


export default function Product() {
    const {id} = useParams();
    const [product, setProduct] = useState({});
    const [images, setImages] = useState([]);
    const [discount, setDiscount] = useState(0);
    
    const fetchProduct = () => {
        fetch(`https://dummyjson.com/products/${id}`)
        .then(response => response.json())
        .then(json => {
            setProduct(json);
            setImages(json.images);
            console.log(json);
        })
    }
    useEffect(()=>{
        fetchProduct();
    }, []);

    const calcPrice = () => {
        setDiscount(product.price * product.discountPercentage / 100);
    }
  return (
    <div className='w-screen h-screen flex flex-col items-center justify-start sm:items-start gap-4'>
        <header className='mt-2 border-b-2 border-teal-600 w-full flex flex-col gap-2 h-auto' >
            <h1 className='font-bold text-xl text-center text-red'>{product.title}</h1>
            <h2 className='font-semibold text-md text-center'>{product.brand} : {product.category}</h2>
        </header>
        <div className='w-full h-full flex flex-col sm:flex-row sm:items-center gap-8'>
        <div className='w-full sm:w-1/2 h-2/6 sm:h-3/6 flex flex-row justify-start items-center gap-4'>
            <div className='h-full w-1/2 flex flex-col justify-end items-center ml-2 sm:ml-0'>
                <img src={product.thumbnail} alt="Thumbnail" className='aspect-square object-contain'/>
                <div className='flex flex-row h-1/6 items-center justify-start gap-2'>
                    <h4 className='font-semibold'>{product.rating}</h4>
                    < Ratings fullStars={Math.floor(product.rating)}
                    emptyStars={Math.floor(5 - product.rating)}
                    partialStar={5 - Math.floor(product.rating) - Math.floor(5 - product.rating)}
                    />
                
                </div>
            </div>

            <div className='w-1/2 h-full flex flex-col justify-end items-start gap-2'>
                <h3 className='text-sm'>{product.description}</h3>
                <p className='font-bold text-lg'>${product.price}</p>
                <p className='font-semibold text-md'>Stock: {product.stock}</p>
                <button className='w-40 h-10 bg-00BFB3 rounded-md font-semibold'
                onClick={calcPrice}>Apply Coupons
                </button>
            </div>

        </div>
            <div className='w-full h-2/6 sm:w-1/2 sm:h-1/2 flex flex-row justify-start items-center'>
                <Images imageArr={images}/>
                <AddToCart cost={Math.floor(product.price - discount)}/>
            </div>
        </div>

    </div>
  )
}
