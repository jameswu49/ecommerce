import { useEffect, useState } from "react";
import Image from "../../../node_modules/next/image";
import { AiOutlineClose } from "react-icons/ai";
import { closeModal } from "../util/indexFunctions"
import { fetchProducts } from "../cart/util/cartApi";
import { Oval } from 'react-loading-icons'

import { useSession } from "next-auth/react"

interface ModalProps {
    modal: boolean;
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
    cartItems: any;
    router: any;
    image: string;
}

export default function Modal({ modal, setModal, cartItems, router, image }: ModalProps) {
    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const { data: session, status } = useSession();

    useEffect(() => {
        if (status !== 'authenticated') {
            const cartItems = localStorage.getItem('cart')
            const parsedCartItems = JSON.parse(cartItems);

            if (parsedCartItems) {
                setItems(parsedCartItems)
            }
        } else {
            fetchProducts(session)
                .then((fetchedItems) => {
                    setItems(fetchedItems)
                })
                .catch((error) => {
                    console.error('Error fetching products:', error);
                });
        }
        setIsLoading(false);

    }, [session, setItems, status]);

    return (
        <>
            {isLoading ? (
                <div className="flex items-center justify-center h-[80vh] lg:h-screen">
                    <Oval className='h-20 w-20' stroke="grey" />
                </div>
            ) : (
                <div className={`${!modal ? 'hidden' : ''}`}>
                    <div className='modal w-[90%]'>
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
                        <div className='flex justify-evenly'>
                            <div className='modal-image'>
                                <Image src={image} height={500} width={500} alt="" />
                            </div>
                            <div className='flex flex-col justify-center'>
                                <h1>{session ? cartItems.productName : cartItems.product?.name}</h1>
                                <p className="font-semibold">${session ? cartItems.productPrice : cartItems.product?.price}</p>
                            </div>
                        </div>
                        <hr className='bg-black' />
                        <div className='modal-buttons'>
                            <button className='cart-button py-2 text-sm' onClick={() => router.push('/cart')}>VIEW CART</button>
                            <button className='continue-button py-2 text-sm' onClick={() => closeModal(modal, setModal)}>CONTINUE SHOPPING</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}