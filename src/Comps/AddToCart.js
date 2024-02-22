import React from 'react';
import { useState, useEffect } from 'react';

export default function AddToCart(props) {
  return (
    <div className='w-1/2 h-full flex flex-col sm:flex-col-reverse justify-center sm:justify-start items-start ml-4 gap-4'>
        <button className='bg-red w-40 h-10 rounded-md font-semibold'>Add To Cart</button>
        <h3 className='font-bold text-xl'>${props.cost}</h3>
    </div>
  )
}
