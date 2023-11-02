import { useRouter } from 'next/router';

interface CheckOutModalProps {
    handleCheckOutModal: (setCheckOutModal: React.Dispatch<React.SetStateAction<boolean>>, checkOutModal: boolean) => void;
    checkOutModal: boolean;
    setCheckOutModal: React.Dispatch<React.SetStateAction<boolean>>;
    status: any;
    handleLogIn: (router: typeof useRouter) => void;
    router: typeof useRouter;
}

export default function CheckOutModal({ handleCheckOutModal, checkOutModal, setCheckOutModal, status, handleLogIn, router }: CheckOutModalProps) {
    return (
        <section>
            <div className='fixed w-3/4 border border-black left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] bg-white shadow-2xl md:w-[40%] lg:w-1/4'>
                {status !== 'authenticated' &&
                    <div className='pt-16 pb-12 relative'>
                        <div className='absolute top-2 right-5' onClick={() => handleCheckOutModal(setCheckOutModal, checkOutModal)}>X</div>
                        <div className='flex flex-col items-center gap-y-6 md:justify-center md:gap-x-4'>
                            <button className='bg-[red] text-white w-[90%] py-2' onClick={() => handleLogIn(router)}>Log in</button>
                            <button className='border border-black w-[90%] py-2'>Guest Checkout</button>
                        </div>
                    </div>}
            </div>
        </section>
    )
}