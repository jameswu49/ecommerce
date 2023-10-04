import '../../../src/app/globals.css'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from '../../../node_modules/next/image';
import Navbar from '@/app/components/navbar';
import Footer from '@/app/components/footer';

export default function ProductDetail() {
    const router = useRouter();
    const { index, category } = router.query;
    const [product, setProduct] = useState(null);

    useEffect(() => {
        async function fetchProductDetails() {
            try {
                const response = await fetch(`/api/getProductDetails?id=${index}&category=${category}`);
                if (response.ok) {
                    const productData = await response.json();
                    setProduct(productData);
                } else {
                    console.error('Error fetching product details:', response.status, response.statusText);
                }
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        }

        if (index) {
            fetchProductDetails();
        }
    }, [index, category]);

    return (
        <>
            <Navbar />
            {product && (
                <section>
                    <div className='flex flex-col gap-y-4 text-center'>
                        <h1 className='font-bold'>{product.name}</h1>
                    </div>
                    <div className='w-3/4 mx-auto'>
                        <img src={product.image_front} />
                        <img src={product.image_back} />
                    </div>
                    <p className='text-center'>${product.price}</p>
                    <div className='flex justify-center my-5'>
                        <button className='bg-[red] text-white rounded-xl button'>Add to Bag</button>
                    </div>
                </section>
            )}
            <Footer />
        </>
    );
}

