import React from 'react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Styles.css';
import menuIcon from './icons/menu.png';
import Search from './icons/search';

export default function Products() {
    const [products, setProducts] = useState([]);
    const [storeProducts, setStoreProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [searchProducts, setSearchProducts] = useState([]);

    let skip = 0;
    const curLoc = useLocation();
    const fetchProducts = () => {
        fetch(`https://dummyjson.com/products?skip=0&limit=100`)
        .then(response => response.json())
        .then(json => {
            setStoreProducts(json.products);
            setProducts(json.products.slice(0, 10));
        });
    }
    useEffect(()=>{
        fetchProducts();
    }, []);

    useEffect(() => {
        let regex = new RegExp(search , "i");
        setSearchProducts(()=>{
            return storeProducts.filter((product) => {
                return regex.test(product.title);
            });
        });
    }, [search, storeProducts]);

    const handleScrolling = event => {
        if (event.target.scrollTop + event.target.clientHeight >= event.target.scrollHeight){
            if (skip < 100){
                skip += 10;
            } else {
                return;
            }
            const next10 = storeProducts.slice(skip, skip+10);
            setProducts(prev => [...prev, ...next10]);
        }
    }

  return (
    <div>
        {!curLoc.state && <div className='w-screen h-screen flex flex-row items-center justify-center gap-8'>
            <div className='bg-black w-2 h-2 rounded-full ball'>
            </div>
            <div className='bg-black w-2 h-2 rounded-full ball delay250'>
            </div>
            <div className='bg-black w-2 h-2 rounded-full ball delay500'>
            </div>
        </div>    
        }
        {curLoc.state && 
        <div className='w-screen h-screen bg-e8 flex flex-col items-center justify-start gap-4 overflow-y-auto'>
            <Link to="/account" state={{details: curLoc.state}}>
            <img src={menuIcon} alt="Menu" className='fixed w-8 h-8 left-2 top-2 sm:left-4 sm:top-8 hover:rotate-90 duration-500'/>
            </Link>
            
            <header className='text-2xl mt-3 font-semibold sm:text-3xl'>Zonakart</header>
            <div className='w-7/12 sm:w-3/12 relative flex flex-row items-center justify-center gap-2'>
                <input placeholder='Search' className='sm:h-12 sm:text-2xl outline-none bg-transparent border-b-2 pl-1 h-7 border-gray-500 w-full'
                onChange={(e)=>{setSearch(e.target.value); console.log(search)}}/>
                <button className='absolute right-0'>
                    <Search classStyle="w-5 h-5 sm:w-8 sm:h-8"/>
                </button>
                    
            </div>
            <div className='w-screen h-1 bg-black'>
            </div>

            {products.length !== 0 && search.length === 0 &&
            <div className='flex flex-row flex-wrap items-center justify-center w-full gap-4 overflow-y-auto'
            onScroll={handleScrolling}>
                {products.map((product, index )=> {
                    return (
                        <div className='w-5/12 sm:w-3/12 sm:h-72 sm:rounded-md h-40 bg-white flex flex-col items-center rounded-sm gap-2 productsBox overflow-y-auto
                        hover:scale-105 duration-700'
                        key={index}>
                            <Link className='w-full flex flex-col items-center justify-start'
                            to={`/products/${index + 1}`}>
                            <img src={product.thumbnail} alt="Product" width="60%" height="60%" className='w-11/12 mt-1 sm:mt-2'/>

                            <h1 className='text-sm mt-2 font-semibold text-center' >{product.title}</h1>
                            <p className='text-xs mb-4 font-semibold'>Upto {Math.floor(product.discountPercentage)}% off!!</p>
                            </Link>
                        </div>
                        
                    );
                })}
            </div>
            }

            {search.length > 0 && 
            <div className='flex flex-row flex-wrap items-center justify-center w-full gap-4 overflow-y-auto'>
                {searchProducts.map((product, index )=> {
                    return (
                        <div className='w-5/12 sm:w-3/12 sm:h-60 sm:rounded-md h-40 bg-white flex flex-col items-center rounded-sm gap-2 productsBox overflow-y-auto
                        hover:scale-105 duration-700'
                        key={index}>
                            <Link className='w-full flex flex-col items-center justify-start'
                            to={`/products/${index + 1}`}>
                            <img src={product.thumbnail} alt="Product" width="60%" height="60%" className='w-11/12 mt-1 sm:mt-2'/>
                            <h1 className='text-sm mt-2 font-semibold text-center' >{product.title}</h1> 
                            
                            <p className='text-xs mb-4 font-semibold'>Upto {Math.floor(product.discountPercentage)}% off!!</p>
                            </Link>
                        </div>
                        
                    );
                })}
            </div>
            }

        </div>
        }
    </div>
  )
}

//9uQFF1Lh
// eventObject.target.scrollTop + eventObject.target.clientHeight >= eventObject.target.scrollHeight