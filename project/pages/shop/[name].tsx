import '../../src/app/globals.css'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from '../../node_modules/next/link';
import Image from '../../node_modules/next/image';
import shop from "../../src/app/images/shop.png"
import items from "../../src/app/data/products"
import Navbar from "../../src/app/components/navbar"
import Footer from '@/app/components/footer';

export default function FetchProductByName() {
    const router = useRouter();
    const { name, id } = router.query;

    const [product, setProduct] = useState(null);

    useEffect(() => {
        async function fetchname() {
            try {
                const response = await fetch(`/api/get${name}`, {
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

        if (name) {
            fetchname();
        }
    }, [name]);

    return (
        <>
            <Navbar />
            <section>
                <div className="hidden lg:flex">
                    <div className="w-[20%] text-end mr-10 mt-5">
                        <h1 className="font-bold uppercase">New Releases</h1>
                        {items.map((elements, index) => (
                            <div key={index} className='text-sm leading-8 cursor-pointer'>
                                <Link href={`/shop/${encodeURIComponent(elements.name)}`}>
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
                        <div key={index} className="flex flex-col items-center my-5 w-3/4 mx-auto cursor-pointer lg:w-1/4 lg:justify-end lg:text-center">
                            <Link href={`/shop/product/${index}?category=${items[id].name}`}>
                                <img src={elements.image_front} alt={elements.name} />
                                <h1>{elements.name}</h1>
                                <p>${elements.price}</p>
                            </Link>
                        </div>
                    ))}
                </div>
            </section>
            <Footer />
        </>
    );
}

