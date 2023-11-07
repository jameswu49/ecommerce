'use client'
import { useState } from 'react';
import { FaTrashAlt } from "react-icons/fa";
import { useSession } from "next-auth/react"
import Image from '../../../node_modules/next/image';
import { removeItem, removeLocalItem, FetchCartItems } from './util/cartApi';
import { total } from '../util/indexFunctions';
import { handleQuantity, handleModal, itemsInCart, handleLogIn, handleCheckOutModal, handleCloseModal } from './util/cartPageFunctions';
import { useRouter } from 'next/navigation';
import CheckOutModal from './components/checkoutModal';
import RemoveItemModal from './components/removeItemModal';

import handleCheckout from './components/checkoutButton';

export default function Cart() {
    const [items, setItems] = useState<any>([])
    const [showModal, setShowModal] = useState(false)
    const [productIndex, setProductIndex] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [checkOutModal, setCheckOutModal] = useState(false)

    const router = useRouter()
    const { data: session, status } = useSession();

    // fetch and show items in cart
    FetchCartItems(session, status, setItems)

    return (
        <section className='min-h-[90vh]'>
            {items?.length === 0 ? (
                <div className='flex h-[50vh] items-center justify-center font-bold text-xl'>
                    <h1>Cart is empty.</h1>
                </div>
            ) : (
                <div>
                    {/* Modal to confirm deletion of item */}
                    {showModal && <RemoveItemModal
                        showModal={showModal}
                        productIndex={productIndex}
                        items={items}
                        session={session}
                        setItems={setItems}
                        setShowModal={setShowModal}
                        setIsLoading={setIsLoading}
                        removeItem={removeItem}
                        removeLocalItem={removeLocalItem}
                        handleCloseModal={handleCloseModal}
                        isLoading={isLoading}
                    />}

                    {/* Modal for user to log in and checkout or checkout as a guest*/}
                    {checkOutModal && <CheckOutModal checkOutModal={checkOutModal} handleCheckOutModal={handleCheckOutModal} setCheckOutModal={setCheckOutModal} status={status} handleLogIn={handleLogIn} router={router} items={items} session={session} total={total} />}
                    <div className='min-h-[70vh] mb-5'>
                        {items?.map((data: any, index: number) => (
                            <div key={index} className="flex h-fit">
                                <div className="w-3/4 flex gap-x-6 border border-slate-200 pl-3 py-5">
                                    <Image src={data.productImage || data.image} alt='' width={500} height={500} className='w-20' />
                                    <div className="flex flex-col justify-center items-center">
                                        <p className="font-semibold text-sm md:text-lg">{data.productName || data.product?.name}</p>
                                    </div>
                                </div>
                                <div className="border border-slate-200 w-[10%] flex items-center justify-center">
                                    <select name="quantity" id="quantity-select" className='w-10 text-center' onChange={(e) => handleQuantity(e, index, items, session, setItems, itemsInCart)}>
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
                                <div className="border border-slate-200 w-[10%] flex items-center justify-center"><FaTrashAlt className='w-10 h-5 cursor-pointer' onClick={() => handleModal(index, setShowModal, setProductIndex)} /></div>
                            </div>
                        ))}
                    </div>
                    {items?.length > 0 && status === 'unauthenticated' ? (
                        <>
                            <div className='flex justify-center lg:hidden'>
                                <button className='bg-[red] text-white py-1 px-2' onClick={() => handleCheckOutModal(setCheckOutModal, checkOutModal)}>Checkout</button>
                            </div>
                            <div className='flex justify-around items-center h-16 lg:h-20'>
                                <span>{itemsInCart(items)} item(s) in your cart.</span>
                                <div className='hidden lg:block'>
                                    <button className='bg-[red] text-white py-1 px-2' onClick={() => handleCheckOutModal(setCheckOutModal, checkOutModal)}>Checkout</button>
                                </div>
                                <span>subtotal: <span className='font-bold'>${total(items, session)}</span></span>
                            </div>
                        </>
                    ) : <>
                        <div className='flex justify-center lg:hidden'>
                            <button className='bg-[red] text-white py-1 px-2' onClick={() => handleCheckout(total, items, session, router)}>Checkout</button>
                        </div>
                        <div className='flex justify-around items-center h-16 lg:h-20'>
                            <span>{itemsInCart(items)} item(s) in your cart.</span>
                            <div className='hidden lg:block'>
                                <button className='bg-[red] text-white py-1 px-2' onClick={() => handleCheckout(total, items, session, router)}>Checkout</button>
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