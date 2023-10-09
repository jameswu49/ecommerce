import '../../../src/app/globals.css'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AiOutlineClose } from "react-icons/ai";
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
    const [image, setImage] = useState(product?.image1)
    const [modal, setModal] = useState(false)
    const [cartItems, setCartItems] = useState([])

    useEffect(() => {
        async function fetchProductDetails() {
            try {
                const response = await fetch(`/api/getProductDetails?id=${index}&category=${category}`);
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

        if (index) {
            fetchProductDetails();
        }
    }, [index, category]);


    const handleImageChange = (src: string) => {
        setImage(src)
    }

    const handleAddToCart = () => {
        const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');

        const newItem = {
            name: product?.name || '',
            price: product?.price || 0,
            image: category === 'Shoes' || category === 'Accessories' ? product?.image1 : image,
        };

        cartItems.push(newItem);

        localStorage.setItem('cart', JSON.stringify(cartItems));

        const cartData = JSON.parse(localStorage.getItem('cart'))

        setModal(!modal)
        setCartItems(cartData)
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

    const handleViewCartPage = () => {
        router.push('/cart')
    }

    return (
        <>
            <SidebarProvider>
                <Sidebar />
                <Navbar />
                <div className={`${!modal ? 'hidden' : ''}`}>
                    <div className='modal'>
                        <div className='modal-text'>
                            <div>
                                <p className='text-xl'>Added to cart.</p>
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
                            <button className='cart-button' onClick={handleViewCartPage}>VIEW CART</button>
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
                <Footer />
            </SidebarProvider>
        </>
    );
}

