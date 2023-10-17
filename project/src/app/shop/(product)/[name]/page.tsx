'use client'
import { FC } from 'react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import shop from "../../../images/shop.png"
import items from "../../../data/products"

interface pageProps {
    params: { name: string }
}

const Page: FC<pageProps> = ({ params }) => {
    const [product, setProduct] = useState(null);

    const search = useSearchParams();
    const id = search.get('id')

    useEffect(() => {
        async function fetchname() {
            try {
                const response = await fetch(`/api/get${params.name}`, {
                    method: 'GET',
                });

                if (response.ok) {
                    const product = await response.json();
                    setProduct(product);
                } else {
                    console.error('Error fetching products:', response.status, response.statusText);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }

        if (params.name) {
            fetchname();
        }

    }, [params.name]);

    return (
        <>
            <section>
                <div className="hidden lg:flex">
                    <div className="w-[20%] text-end mr-10 mt-5">
                        <h1 className="font-bold uppercase">New Releases</h1>
                        {items.map((elements, index) => (
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
                    {product && product.map((elements, index) => (
                        <div div key={index} className="center-products items-center text-center my-5 w-3/4 mx-auto cursor-pointer lg:w-1/4 lg:justify-end lg:text-center" >
                            <Link href={`/shop/${items[id]?.name}/${index}?category=${items[id]?.name}`}>
                                <img src={elements.mainImage} alt={elements.name} className="items" />
                                <h1 className='mt-5'>{elements.name}</h1>
                                <p className='grey'>${elements.price}</p>
                            </Link>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}

export default Page;

