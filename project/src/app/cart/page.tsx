'use client'
import { useEffect, useState, useCallback } from 'react';
import { FaTrashAlt } from "react-icons/fa";
import { useSession } from "next-auth/react"

type Data = {
    image: string;
    name: string;
    price: number;
    length: number;
}

export default function Cart() {
    const [items, setItems] = useState<Data | []>([])

    const { data: session } = useSession();

    const fetchProducts = useCallback(async function fetchProducts() {
        try {
            const response = await fetch(`/api/getCartProducts?userId=${session.user.id}`, {
                method: 'GET',
            });

            if (response.ok) {
                const product = await response.json();
                setItems(product);
            } else {
                console.error('Error fetching products:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }, [session]);

    useEffect(() => {
        if (!session) {
            return
        } else {
            fetchProducts()
        }

    }, [fetchProducts, session]);

    const total = () => {
        let price = 0;
        items.map((elements) => (
            price += elements.productPrice
        ))
        return price
    }

    const removeItem = async (index: number) => {
        try {
            const response = await fetch(`/api/deleteCartItem?cartItemId=${items[index].id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                fetchProducts()
                return
            } else {
                console.error('Error fetching products:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }

    };




    return (
        <section className='h-[80vh]'>
            {items.length === 0 ? (
                <div className='flex h-3/4 items-center justify-center font-bold text-xl'>
                    <h1>Cart is empty.</h1>
                </div>
            ) : (
                <div>
                    <div className='h-[70vh] overflow-auto'>
                        {items.map((data, index) => (
                            <div key={index} className="flex h-fit">
                                <div className="w-3/4 flex gap-x-6 border border-slate-200 pl-3 py-5">
                                    <img src={data.productImage} alt={'jacket'} className='w-20' />
                                    <div className="flex flex-col justify-center items-center">
                                        <p className="font-semibold">{data.productName}</p>
                                    </div>
                                </div>
                                <div className="border border-slate-200 w-[15%] flex items-center justify-center">${data.productPrice}</div>
                                <div className="border border-slate-200 w-[10%] flex items-center justify-center"><FaTrashAlt className='w-10 h-5 cursor-pointer' onClick={() => removeItem(index)} /></div>
                            </div>
                        ))}
                    </div>
                    {items.length > 0 &&
                        <div className='flex justify-around items-center h-20'>
                            <span>{items.length} item(s) in your cart.</span>
                            <span>subtotal: <span className='font-bold'>${total()}</span></span>
                        </div>
                    }
                </div>
            )}
        </section>
    )
}