import { useEffect, useState } from "react";
import Image from "../../../node_modules/next/image";
import { AiOutlineClose } from "react-icons/ai";
import { closeModal, total } from "../util/indexFunctions"
import { fetchProducts } from "../util/cartApi";
import { Oval } from 'react-loading-icons'

import { useSession } from "next-auth/react"

export default function Modal({ modal, setModal, cartItems, router, image }) {
    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    const { data: session } = useSession();

    useEffect(() => {
        if (!session) {
            return
        } else {
            setIsLoading(true)
            fetchProducts(session, setItems).then(() => {
                setIsLoading(false);
            });
        }
    }, [session, setItems]);

    return (
        <>
            {isLoading ? (
                <div className="flex items-center justify-center h-[80vh] lg:h-screen">
                    <Oval className='h-20 w-20' stroke="grey" />
                </div>
            ) : (
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
                                <Image src={image} height={500} width={500} alt="" />
                            </div>
                            <div className='modal-image-text'>
                                <h1>{cartItems.productName}</h1>
                                <p>${cartItems.productPrice}</p>
                            </div>
                        </div>
                        <hr className='bg-black' />
                        <div className='modal-text font-bold'>
                            Subtotal: {items.length + 1} item(s) ${total(items)}
                        </div>
                        <div className='modal-buttons'>
                            <button className='cart-button' onClick={() => router.push('/cart')}>VIEW CART</button>
                            <button className='continue-button' onClick={() => closeModal(modal, setModal)}>CONTINUE SHOPPING</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}