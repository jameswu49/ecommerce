'use client'
import { FC } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/dist/client/components/navigation';
import { useEffect, useState } from 'react';
import { AiOutlineClose } from "react-icons/ai";
import { useSession } from "next-auth/react"

type Product = {
    name: string,
    price: number,
    description: string,
    image1: string,
    image2: string,
    image3: string,
    image4: string
}

interface pageProps {
    params: { index: number }
}

const Page: FC<pageProps> = ({ params }) => {
    const [product, setProduct] = useState<Product | null>(null);
    const [image, setImage] = useState(product?.image1)
    const [modal, setModal] = useState(false)
    const [cartItems, setCartItems] = useState([])

    const router = useRouter()

    const search = useSearchParams();
    const category = search?.get('category')

    const { data: session } = useSession();

    useEffect(() => {
        async function fetchProductDetails() {
            try {
                const response = await fetch(`/api/getProductDetails?id=${params.index}&category=${category}`);
                if (response.ok) {
                    const productData = await response.json();
                    setProduct(productData);
                    setImage(productData.image1)
                } else {
                    console.error('Error fetching product details:', response.status, response.statusText);
                }
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        }

        if (params.index) {
            fetchProductDetails();
        }
    }, [params.index, category]);


    const handleImageChange = (src: string) => {
        setImage(src)
    }

    const handleAddToCart = async () => {

        const data = {
            userId: session.user.id,
            productData: {
                name: product?.name,
                price: product?.price,
                image: image
            }
        }

        try {
            const response = await fetch('/api/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const cartData = await response.json();
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    }

    const total = () => {
        let price = 0;
        cartItems.map((elements) => (
            price += elements.price
        ))
        return price
    }

    const closeModal = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setModal(!modal)
    }

    return (
        <>
            <div className={`${!modal ? 'hidden' : ''}`}>
                <div className='modal'>
                    <div className='modal-text'>
                        <div>
                            <p className='text-xl font-semibold'>Added to cart.</p>
                        </div>
                        <div className='flex flex-col items-center cursor-pointer' onClick={closeModal}>
                            <span><AiOutlineClose className='text-xl' /></span>
                            <span>Close</span>
                        </div>
                    </div>
                    <hr className='bg-black' />
                    <div className='flex'>
                        <div className='modal-image'>
                            <img src={image} alt="" />
                        </div>
                        <div className='modal-image-text'>
                            <h1>{cartItems?.[cartItems.length - 1]?.name}</h1>
                            <p>${cartItems?.[cartItems.length - 1]?.price}</p>
                        </div>
                    </div>
                    <hr className='bg-black' />
                    <div className='modal-text font-bold'>
                        Subtotal: {cartItems.length} item(s) ${total()}
                    </div>
                    <div className='modal-buttons'>
                        <button className='cart-button' onClick={() => router.push('/cart')}>VIEW CART</button>
                        <button className='continue-button' onClick={closeModal}>CONTINUE SHOPPING</button>
                    </div>
                </div>
            </div>
            {product && (
                <section className='flex flex-col items-center index-screen'>
                    <div className='flex flex-col my-5'>
                        <h1 className='font-bold text-center lg:hidden'>{product.name}</h1>
                    </div>
                    <div className='lg:flex lg:w-3/4 gap'>
                        <div className='w-3/4 mx-auto flex flex-col items-center justify-center lg:w-1/2'>
                            <img src={image ? image : product.image1} alt={`Picture of ${product.name}`} className='products' />
                            <div className='flex justify-evenly my-5 lg:hidden'>
                                <img src={product.image1} className='shop-image cursor-pointer' onClick={() => handleImageChange(product.image1)} />
                                {product.image2 && <img src={product.image2} className='shop-image cursor-pointer' onClick={() => handleImageChange(product.image2)} alt={`Picture of ${product.name}`} />}
                                {product.image3 && <img src={product.image3} className='shop-image cursor-pointer' onClick={() => handleImageChange(product.image3)} alt={`Picture of ${product.name}`} />}
                                {product.image4 && <img src={product.image4} className='shop-image cursor-pointer' onClick={() => handleImageChange(product.image4)} alt={`Picture of ${product.name}`} />}
                            </div>
                        </div>
                        <div className='flex flex-col lg:w-1/2 center'>
                            <h1 className='hidden font-bold text-2xl justify-center lg:flex'>{product.name}</h1>
                            <div className='my-5'>
                                <hr />
                                <p className='py-5 text-center margin'>{product.description}</p>
                                <hr />
                            </div>
                            <div className='hidden lg:flex lg:flex-col lg:w-1/2 lg:mx-auto'>
                                <div className='flex justify-evenly my-2'>
                                    <img src={product.image1} className='shop-image cursor-pointer' onClick={() => handleImageChange(product.image1)} />
                                    {product.image2 && <img src={product.image2} className='shop-image cursor-pointer' onClick={() => handleImageChange(product.image2)} alt={`Picture of ${product.name}`} />}
                                    {product.image3 && <img src={product.image3} className='shop-image cursor-pointer' onClick={() => handleImageChange(product.image3)} alt={`Picture of ${product.name}`} />}
                                    {product.image4 && <img src={product.image4} className='shop-image cursor-pointer' onClick={() => handleImageChange(product.image4)} alt={`Picture of ${product.name}`} />}
                                </div>
                            </div>
                            <div className='flex flex-col items-center my-5'>
                                <p className='font-bold pb-2'>${product.price}</p>
                                <button className='bg-[red] text-white button' onClick={handleAddToCart}>Add to Bag</button>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}

export default Page;