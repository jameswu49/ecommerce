import Image from "../../../node_modules/next/image";
import { AiOutlineClose } from "react-icons/ai";
import { closeModal, total } from "../util/indexFunctions"

export default function Modal({ modal, setModal, cartItems, router, image }) {
    return (
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
                    Subtotal: {cartItems.length} item(s) ${total(cartItems)}
                </div>
                <div className='modal-buttons'>
                    <button className='cart-button' onClick={() => router.push('/cart')}>VIEW CART</button>
                    <button className='continue-button' onClick={() => closeModal(modal, setModal)}>CONTINUE SHOPPING</button>
                </div>
            </div>
        </div>
    )
}