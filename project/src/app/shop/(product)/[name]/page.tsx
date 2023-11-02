'use client'
import { FC } from 'react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import shop from "../../../images/shop.png"
import items from "../../../data/products"
import { Oval } from 'react-loading-icons'

interface pageProps {
    params: { name: string }
}

type Product = {
    mainImage: string,
    name: string,
    price: number
}

const Page: FC<pageProps> = ({ params }) => {
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(false)

    const search = useSearchParams();
    const id = search?.get('id')

    useEffect(() => {
        setIsLoading(true)
        async function fetchname() {
            try {
                const response = await fetch(`/api/get${params.name}`, {
                    method: 'GET',
                });

                if (response.ok) {
                    const product = await response.json();
                    setProduct(product);
                    setIsLoading(false)
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
                            <div key={index} className='text-sm leading-8'>
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
                    {isLoading ? (
                        <div className='h-screen flex items-center mx-auto lg:h-[20vh]'>
                            <Oval className='h-10 w-10 mx-auto' stroke="grey" />
                        </div>
                    ) : (
                        <>
                            {product && product?.map((elements: Product, index: number) => (
                                <div key={index} className="center-products items-center text-center my-5 w-3/4 mx-auto cursor-pointer lg:w-1/4 lg:justify-end lg:text-center" >
                                    <Link href={`/shop/${items[id]?.name}/${index}?category=${items[id]?.name}`}>
                                        <Image src={elements.mainImage} alt={elements.name} width={500} height={500} className="items" />
                                        <h1 className='mt-5'>{elements.name}</h1>
                                        <p className='grey'>${elements.price}</p>
                                    </Link>
                                </div>
                            ))}
                        </>
                    )}
                </div>
            </section>
        </>
    );
}

export default Page;

