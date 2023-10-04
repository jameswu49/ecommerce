'use client'
import { useState, useEffect } from "react";
import Link from "../../../node_modules/next/link";
import Image from "../../../node_modules/next/image";
import shop from "../images/shop.png"
import products from "../data/products";


export default function Shop() {
    const [data, setData] = useState([]);

    return (
        <section>
            <div className="hidden lg:flex">
                <div className="w-[20%] text-end mr-10 mt-5">
                    <h1 className="font-bold uppercase">New Releases</h1>
                    {products.map((elements, index) => (
                        <div key={index} className='text-sm leading-8 cursor-pointer'>
                            <Link href={`/shop/${encodeURIComponent(elements.name)}?id=${index}`}>
                                {elements.name}
                            </Link>
                        </div>
                    ))}
                </div>
                <div className="w-screen">
                    <Image src={shop} alt={'banner'} className='w-full' />
                </div>
            </div>
            <div className="lg:flex lg:flex-wrap lg:gap-x-3 lg:w-3/4 lg:ml-auto lg:my-10">
                {products.map((elements, index) => (
                    <div key={index} className="flex flex-col items-center text-center my-5 w-3/4 mx-auto cursor-pointer lg:w-1/4 lg:justify-end lg:text-center">
                        <Link href={`/shop/${encodeURIComponent(elements.name)}?id=${index}`}>
                            <Image src={elements.src} alt={elements.name} />
                            <h1>{elements.name}</h1>
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    );
}

