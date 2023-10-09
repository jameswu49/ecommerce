'use client'
import { useEffect, useState } from 'react';
import { FaTrashAlt } from "react-icons/fa";

type Data = {
    image: string;
    name: string;
    price: number;
    length: number;
}

export default function Cart() {
    const [items, setItems] = useState<Data | []>([])

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const cartData = JSON.parse(localStorage.getItem('cart')) || [];
            setItems(cartData)
        }
    }, []);

    const total = () => {
        let price = 0;
        items.map((elements) => (
            price += elements.price
        ))
        return price
    }

    const removeItem = (index: number) => {
        const updatedItems = [...items];
        updatedItems.splice(index, 1)

        localStorage.setItem('cart', JSON.stringify(updatedItems));
        setItems(updatedItems);
    }

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
                                    <img src={data.image} alt={'jacket'} className='w-20' />
                                    <div className="flex flex-col justify-center items-center">
                                        <p className="font-semibold">{data.name}</p>
                                    </div>
                                </div>
                                <div className="border border-slate-200 w-[15%] flex items-center justify-center">${data.price}</div>
                                <div className="border border-slate-200 w-[10%] flex items-center justify-center"><FaTrashAlt className='w-10 h-5' onClick={() => removeItem(index)} /></div>
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