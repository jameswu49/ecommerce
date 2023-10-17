'use client'
import { FC } from 'react';
import Image from '../../../../../../node_modules/next/image';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/dist/client/components/navigation';
import { useEffect, useState } from 'react';
import { AiOutlineClose } from "react-icons/ai";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { useSession } from "next-auth/react"
import { handleThumbnailImage, handleNextImage, handlePreviousImage, handleImageChange, total, closeModal } from "../../../../util/indexFunctions"

type Product = {
    name: string,
    price: number,
    description: string,
    mainImage: string,
    image1: string,
    image2: string,
    image3: string,
    image4: string,
    colors: []
}

interface pageProps {
    params: { index: number }
}

const Page: FC<pageProps> = ({ params }) => {
    const [product, setProduct] = useState<Product | null>(null);
    const [image, setImage] = useState('')
    const [modal, setModal] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [imageUrls, setImageUrls] = useState([])
    const [arrayIndex, setArrayIndex] = useState(0)
    const [activeIndex, setActiveIndex] = useState(0)

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
                    setImage(productData.mainImage)
                    const imageArray = productData.colors[0].images[0]
                    const imageUrls = [
                        imageArray.image1,
                        imageArray.image2,
                        imageArray.image3,
                        imageArray.image4
                    ].filter(url => url !== null && url !== "");
                    setImageUrls(imageUrls)
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
                setCartItems(cartData)
                setModal(!modal)
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    }

    return (
        <>
            <div className={`${!modal ? 'hidden' : ''}`}>
                <div className='modal'>
                    <div className='modal-text'>
                        <div>
                            <p className='text-xl font-semibold'>Added to cart.</p>
                        </div>
                        <div className='flex flex-col items-center cursor-pointer' onClick={() => closeModal(modal, setModal)}>
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
                            <h1>{cartItems.productName}</h1>
                            <p>${cartItems.productPrice}</p>
                        </div>
                    </div>
                    <hr className='bg-black' />
                    <div className='modal-text font-bold'>
                        Subtotal: {cartItems.length} item(s) ${total(cartItems)}
                    </div>
                    <div className='modal-buttons'>
                        <button className='cart-button' onClick={() => router.push('/cart')}>VIEW CART</button>
                        <button className='continue-button' onClick={() => closeModal(modal, setModal)}>CONTINUE SHOPPING</button>
                    </div>
                </div>
            </div>
            {product && (
                <section className='flex flex-col items-center justify-center lg:h-screen'>
                    <div className='flex flex-col my-5'>
                        <h1 className='font-bold text-center lg:hidden'>{product.name}</h1>
                    </div>
                    <div className='lg:flex'>
                        <div className="lg:flex lg:flex-col lg:w-1/2 lg:items-center">
                            <div className='w-3/4 mx-auto flex flex-col items-center justify-center lg:w-1/2'>
                                <div className='relative flex justify-center'>
                                    <BsChevronLeft className="absolute left-0 top-[50%] bg-[red] text-white h-10 w-5 cursor-pointer" onClick={() => handlePreviousImage(arrayIndex, setImage, setArrayIndex, setActiveIndex, imageUrls)} />
                                    <Image src={image} alt={`Picture of ${product.name}`} width={500} height={500} className='md:w-3/4 lg:w-full' />
                                    <BsChevronRight className="absolute top-[50%] right-0 bg-[red] text-white h-10 w-5 cursor-pointer" onClick={() => handleNextImage(arrayIndex, imageUrls, setArrayIndex, setImage, setActiveIndex)} />
                                </div>
                                <div className='flex justify-evenly my-5 lg:hidden'>
                                    <div className='flex justify-evenly my-2 gap-x-5'>
                                        {product?.colors.map((colors, index) => (
                                            <div key={index}>
                                                <Image src={colors.colorImage} alt="" width={500} height={500} className='cursor-pointer rounded-full h-12 w-12' onClick={() => handleImageChange(colors.colorImage, index, setImage, product, setImageUrls, setArrayIndex, setActiveIndex)} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className='hidden lg:flex gap-x-4'>
                                {imageUrls.map((images, index) => (
                                    <div key={index} className='h-16 w-16 mt-10' >
                                        <Image src={images} height={500} width={500} className={`cursor-pointer p-1 ${activeIndex === index ? 'border-2 border-[red]' : ''}`} onClick={() => handleThumbnailImage(images, index, setActiveIndex, setArrayIndex, setImage)} />
                                    </div>
                                ))}
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
                                <div className='flex justify-evenly my-2 gap-x-5'>
                                    {product?.colors.map((colors, index) => (
                                        <div key={index}>
                                            <Image src={colors.colorImage} alt="" width={500} height={500} className='cursor-pointer' onClick={() => handleImageChange(colors.colorImage, index, setImage, product, setImageUrls, setArrayIndex, setActiveIndex)} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className='flex flex-col items-center my-5'>
                                <p className='font-bold pb-2'>${product.price}</p>
                                <button className='bg-[red] text-white button' onClick={handleAddToCart}>Add to Bag</button>
                            </div>
                        </div>
                    </div>
                </section>
            )
            }
        </>
    );
}

export default Page;