'use client'
import { useEffect, useState } from 'react';
import { FaTrashAlt } from "react-icons/fa";
import { useSession } from "next-auth/react"
import Image from '../../../node_modules/next/image';
import { fetchProducts, removeItem } from '../util/cartApi';
import { total } from '../util/indexFunctions';
import { handleQuantity } from '../util/cartPageFunctions';
import { useRouter } from 'next/navigation';
import Modal from '../components/modal';

export default function Cart() {
    const [items, setItems] = useState<any>([])
    const [showModal, setShowModal] = useState(false)
    const [productIndex, setProductIndex] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [checkOutModal, setCheckOutModal] = useState(false)

    const router = useRouter()
    const { data: session } = useSession();

    useEffect(() => {
        if (!session) {
            const cartItems = localStorage.getItem('cart')
            const parsedCartItems = JSON.parse(cartItems);

            if (parsedCartItems) {
                setItems(parsedCartItems)
            }
        } else {
            const cartItems = localStorage.getItem('cart');
            const parsedCartItems = JSON.parse(cartItems);

            if (session && parsedCartItems && parsedCartItems.length > 0) {
                const data = {
                    userId: session.user.id,
                    productData: parsedCartItems.map(existingItem => ({
                        name: existingItem.product?.name,
                        price: existingItem.product?.price,
                        image: existingItem.image,
                        quantity: existingItem.quantity,
                    })),
                };

                const handleUpdateCart = async () => {
                    try {
                        const response = await fetch('/api/updateCart', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(data),
                        });

                        if (response.ok) {
                            fetchProducts(session).then((fetchedProducts) => {
                                setItems(fetchedProducts)
                            })
                        }
                    } catch (error) {
                        console.error('Error adding to cart:', error);
                    }
                };
                handleUpdateCart();
                localStorage.removeItem('cart');
            }
            fetchProducts(session).then((fetchedProducts) => {
                setItems(fetchedProducts)
            })
        }
    }, [session]);

    const handleModal = (index: number) => {
        setShowModal(!showModal)
        setProductIndex(index)
    }

    const itemsInCart = () => {
        let total = 0;
        items.map((elements: number) => (
            total += elements.quantity
        ))
        return total
    }

    // useEffect(() => {
    //     const cartItems = localStorage.getItem('cart');
    //     const parsedCartItems = JSON.parse(cartItems);

    //     if (session && parsedCartItems && parsedCartItems.length > 0) {
    //         const data = {
    //             userId: session.user.id,
    //             productData: parsedCartItems.map(existingItem => ({
    //                 name: existingItem.product?.name,
    //                 price: existingItem.product?.price,
    //                 image: existingItem.image,
    //                 quantity: existingItem.quantity,
    //             })),
    //         };

    //         const handleUpdateCart = async () => {
    //             try {
    //                 const response = await fetch('/api/updateCart', {
    //                     method: 'POST',
    //                     headers: {
    //                         'Content-Type': 'application/json',
    //                     },
    //                     body: JSON.stringify(data),
    //                 });

    //                 if (response.ok) {
    //                     localStorage.removeItem('cart');
    //                     // setItems([]);
    //                 }
    //             } catch (error) {
    //                 console.error('Error adding to cart:', error);
    //             }
    //         };
    //         console.log('ran')
    //         console.log(items)
    //         handleUpdateCart();
    //     }
    // }, [session, items]);

    // const handleCheckOut = () => {
    //     if (session) {
    //         const existingItems = JSON.parse(localStorage.getItem('cart'))
    //         console.log(existingItems)

    //         const handleUpdateCart = async () => {

    //             const data = {
    //                 userId: session.user.id,
    //                 productData: existingItems.map((existingItem: any) => ({
    //                     name: existingItem.product?.name,
    //                     price: existingItem.product?.price,
    //                     image: existingItem.image,
    //                     quantity: existingItem.quantity,
    //                 })),
    //             }

    //             try {
    //                 const response = await fetch('/api/updateCart', {
    //                     method: 'POST',
    //                     headers: {
    //                         'Content-Type': 'application/json',
    //                     },
    //                     body: JSON.stringify(data),
    //                 });

    //                 if (response.ok) {
    //                     const cartData = await response.json();
    //                     console.log('success')
    //                 }
    //             } catch (error) {
    //                 console.error('Error adding to cart:', error);
    //             }
    //         }
    //         handleUpdateCart()
    //     } else {
    //         setCheckOutModal(true)
    //     }
    // }

    const handleLogIn = () => {
        router.push('/api/auth/signin')
    }

    const handleCheckOutModal = () => {
        setCheckOutModal(!checkOutModal)
    }


    return (
        <section className='min-h-[90vh]'>
            {items?.length === 0 ? (
                <div className='flex h-[50vh] items-center justify-center font-bold text-xl'>
                    <h1>Cart is empty.</h1>
                </div>
            ) : (
                <div>
                    {showModal && <div className='fixed w-3/4 left-[50%] top-[40%] translate-x-[-50%] translate-y-[-50%] bg-white shadow-2xl md:w-[65%] lg:w-1/2'>
                        <p className='pl-5 py-3'>Remove Item</p>
                        <hr />
                        <div className='py-5'>
                            <p className='pl-5'>Are you sure you want to remove this item from your cart?</p>
                            <div className='flex flex-col items-center gap-y-4 mt-5 md:flex-row md:justify-center md:gap-x-4'>
                                <button className='bg-[red] text-white w-[90%] py-2 md:w-[45%]' onClick={() => removeItem(productIndex, items, session, setItems, setShowModal, showModal, setIsLoading)}>{isLoading ? 'Removing...' : 'REMOVE'}</button>
                                <button className='border border-black w-[90%] py-2 md:w-[45%]' onClick={() => handleModal(productIndex)}>CANCEL</button>
                            </div>
                        </div>
                    </div>}

                    {checkOutModal && <div className='fixed w-3/4 border border-black left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] bg-white shadow-2xl md:w-[40%] lg:w-1/4'>
                        {!session &&
                            <div className='pt-16 pb-12 relative'>
                                <div className='absolute top-2 right-5' onClick={() => handleCheckOutModal()}>X</div>
                                <div className='flex flex-col items-center gap-y-6 md:justify-center md:gap-x-4'>
                                    <button className='bg-[red] text-white w-[90%] py-2' onClick={() => handleLogIn()}>Log in</button>
                                    <button className='border border-black w-[90%] py-2'>Guest Checkout</button>
                                </div>
                            </div>}
                    </div>}

                    <div className='min-h-[70vh]'>
                        {items?.map((data: any, index: number) => (
                            <div key={index} className="flex h-fit">
                                <div className="w-3/4 flex gap-x-6 border border-slate-200 pl-3 py-5">
                                    <Image src={data.productImage || data.image} alt='' width={500} height={500} className='w-20' />
                                    <div className="flex flex-col justify-center items-center">
                                        <p className="font-semibold text-sm md:text-lg">{data.productName || data.product?.name}</p>
                                    </div>
                                </div>
                                <div className="border border-slate-200 w-[10%] flex items-center justify-center">
                                    <select name="quantity" id="quantity-select" className='w-10 text-center' onChange={(e) => handleQuantity(e, index, items, session)}>
                                        {data.quantity > 10 ? Array.from({ length: data.quantity + 1 }, (_, index) => (
                                            <option key={index} value={index} selected={data.quantity === index}>
                                                {index}
                                            </option>
                                        )) : (
                                            Array.from({ length: 10 }, (_, index) => (
                                                <option key={index} value={index + 1} selected={data.quantity === index + 1}>
                                                    {index + 1}
                                                </option>
                                            ))
                                        )}
                                    </select>
                                </div>
                                <div className="border border-slate-200 w-[15%] flex items-center justify-center">${data.productPrice || data.product?.price}</div>
                                <div className="border border-slate-200 w-[10%] flex items-center justify-center"><FaTrashAlt className='w-10 h-5 cursor-pointer' onClick={() => handleModal(index)} /></div>
                            </div>
                        ))}
                    </div>
                    {items?.length > 0 &&
                        <>
                            <div className='flex justify-center lg:hidden'>
                                <button className='bg-[red] text-white py-1 px-2 mt-5'>Checkout</button>
                            </div>
                            <div className='flex justify-around items-center h-20'>
                                <span>{itemsInCart()} item(s) in your cart.</span>
                                <div className='hidden lg:block'>
                                    <button className='bg-[red] text-white py-1 px-2 mt-5'>Checkout</button>
                                </div>
                                <span>subtotal: <span className='font-bold'>${total(items, session)}</span></span>
                            </div>
                        </>
                    }
                </div>
            )
            }
        </section >
    )
}