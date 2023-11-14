import { useEffect } from "react";
import Image from "../../../node_modules/next/image";
import { AiOutlineClose } from "react-icons/ai";
import { closeModal } from "../shop/(product)/[name]/[index]/util/indexFunctions"

import { useSession } from "next-auth/react"

interface ModalProps {
    modal: boolean;
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
    cartItems: any;
    router: any;
    image: string;
}

export default function Modal({ modal, setModal, cartItems, router, image }: ModalProps) {

    const { data: session } = useSession();

    useEffect(() => {
        if (modal) {
            document.body.classList.add('no-scroll');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            document.body.classList.remove('no-scroll');
        }
        return () => {
            document.body.classList.remove('no-scroll');
        };
    }, [modal]);

    return (
        <>
            <div className={`${!modal ? 'hidden' : ''}`}>
                <div className='modal w-[90%] z-40'>
                    <div className='flex justify-between m-[1rem] items-center'>
                        <div>
                            <p className='text-xl font-semibold'>Added to cart.</p>
                        </div>
                        <div className='flex flex-col items-center cursor-pointer md:py-3' onClick={() => closeModal(modal, setModal)}>
                            <span><AiOutlineClose className='text-xl' /></span>
                        </div>
                    </div>
                    <hr className='bg-black' />
                    <div className='flex justify-between lg:justify-around'>
                        <div className='m-4 w-1/2'>
                            <Image src={image} height={500} width={500} alt={cartItems.product?.name} />
                        </div>
                        <div className='flex flex-col justify-center text-center md:text-lg'>
                            <h1>{session ? cartItems.productName : cartItems.product?.name}</h1>
                            <p className="font-semibold">${session ? cartItems.productPrice : cartItems.product?.price}</p>
                        </div>
                    </div>
                    <hr className='bg-black' />
                    <div className='modal-buttons'>
                        <button className='cart-button py-2 my-4 md:mt-4 md:mb-0 text-sm hover:bg-red-600' onClick={() => router.push('/cart')}>VIEW CART</button>
                        <button className='continue-button py-2 my-4 md:mt-4 md:mb-0 text-sm' onClick={() => closeModal(modal, setModal)}>CONTINUE SHOPPING</button>
                    </div>
                </div>
            </div>
        </>
    )
}