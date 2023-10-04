import '../../../src/app/globals.css'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from '../../../node_modules/next/image';
import Navbar from '@/app/components/navbar';
import Footer from '@/app/components/footer';
import { SidebarProvider } from '@/app/context/sidebarContext';
import Sidebar from '@/app/components/sidebar';

type Product = {
    name: string,
    price: number,
    description: string,
    image1: string,
    image2: string,
    image3: string,
    image4: string
}

export default function ProductDetail() {
    const router = useRouter();
    const { index, category } = router.query;
    const [product, setProduct] = useState<Product | null>(null);
    const [image, setImage] = useState('')

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

    const handleImageChange = (src: string) => {
        setImage(src)
    }

    console.log(product)

    return (
        <>
            <SidebarProvider>
                <Sidebar />
                <Navbar />
                {product && (
                    <section className='flex flex-col items-center'>
                        <div className='flex flex-col my-5'>
                            <h1 className='font-bold lg:hidden'>{product.name}</h1>
                        </div>
                        <div className='lg:flex lg:w-3/4 gap'>
                            <div className='w-3/4 mx-auto lg:w-1/2'>
                                <img src={image ? image : product.image1} alt={`Picture of ${product.name}`} />
                                <div className='flex justify-evenly my-5'>
                                    <img src={product.image1} className='shop-image cursor-pointer' onClick={() => handleImageChange(product.image1)} />
                                    {product.image2 !== null && <img src={product.image2} className='shop-image cursor-pointer' onClick={() => handleImageChange(product.image2)} alt={`Picture of ${product.name}`} />}
                                    {product.image3 !== null && <img src={product.image3} className='shop-image cursor-pointer' onClick={() => handleImageChange(product.image3)} alt={`Picture of ${product.name}`} />}
                                    {product.image4 !== null && <img src={product.image4} className='shop-image cursor-pointer' onClick={() => handleImageChange(product.image4)} alt={`Picture of ${product.name}`} />}
                                </div>
                            </div>
                            <div className='flex flex-col lg:w-1/2 center'>
                                <h1 className='hidden font-bold text-2xl justify-center lg:flex'>{product.name}</h1>
                                <div className='lg:my-10'>
                                    <hr />
                                    <p className='py-5 px-3 margin'>{product.description}</p>
                                    <hr />
                                </div>
                                <div className='flex flex-col items-center my-5'>
                                    <p className='font-bold pb-2'>${product.price}</p>
                                    <button className='bg-[red] text-white button'>Add to Bag</button>
                                </div>
                            </div>
                        </div>
                    </section>
                )}
                <Footer />
            </SidebarProvider>
        </>
    );
}

