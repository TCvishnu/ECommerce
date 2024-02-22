import React from 'react';
import { useState } from 'react';

export default function Images(props) {
  return (
    <div className='ml-2 w-1/2 h-full flex flex-row justify-start items-center gap-4 overflow-x-scroll'>
        {props.imageArr.map((image, index)=>{
            return (
                <img src={image} key={index} alt="Prod Img" className=' min-w-full w-full h-5/6' />
            );
        })}
    </div>
  )
}
