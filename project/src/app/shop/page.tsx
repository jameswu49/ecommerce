'use client'
import { useState, useEffect } from "react";
import Image from "../../../node_modules/next/image";
import shop from "../images/shop.png"
import products from "../data/products";


export default function Shop() {
    const [data, setData] = useState([]);

    // Define the fetchJackets function outside the useEffect
    async function fetchProduct(type: string) {
        try {
            const response = await fetch(`/api/${type}`, {
                method: 'GET', // Use GET method to fetch jackets
            });

            if (response.ok) {
                const product = await response.json();
                console.log('Jackets fetched:', product);
                setData(product);
            } else {
                console.error('Error fetching jackets:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error fetching jackets:', error);
        }
    }

    useEffect(() => {
        // Call the fetchJackets function when the component mounts
        fetchProduct('getJackets');
    }, []); // Empty dependency array means this effect runs once when the component mounts

    return (
        <section>
            <div className="hidden lg:flex">
                <div className="w-[20%] text-end mr-10 mt-5">
                    <h1 className="font-bold uppercase">New Releases</h1>
                    {products.map((elements, index) => (
                        <div key={index} className='text-sm leading-8 cursor-pointer' onClick={() => fetchProduct(`get${elements.name}`)}>
                            {elements.name}
                        </div>
                    ))}
                </div>
                <div className="w-screen">
                    <Image src={shop} alt={'banner'} className='w-full' />
                </div>
            </div>
            <div className="lg:flex lg:flex-wrap lg:gap-x-3 lg:w-3/4 lg:ml-auto lg:my-10">
                {data.map((elements, index) => (
                    <div key={index} className="flex flex-col items-center my-5 w-3/4 mx-auto cursor-pointer lg:w-1/4 lg:justify-end lg:text-center">
                        <img src={elements.image_front} alt={elements.name} />
                        <h1>{elements.name}</h1>
                        <p>${elements.price}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

