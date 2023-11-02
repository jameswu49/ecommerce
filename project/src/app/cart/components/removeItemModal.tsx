export default function RemoveItemModal({
    showModal,
    productIndex,
    items,
    session,
    setItems,
    setShowModal,
    setIsLoading,
    removeItem,
    removeLocalItem,
    isLoading,
    handleCloseModal
}) {
    return showModal && (
        <div className='fixed w-3/4 left-[50%] top-[40%] translate-x-[-50%] translate-y-[-50%] bg-white shadow-2xl md:w-[65%] lg:w-1/2'>
            <p className='pl-5 py-3'>Remove Item</p>
            <hr />
            <div className='py-5'>
                <p className='pl-5'>Are you sure you want to remove this item from your cart?</p>
                <div className='flex flex-col items-center gap-y-4 mt-5 md:flex-row md:justify-center md:gap-x-4'>
                    <button
                        className='bg-[red] text-white w-[90%] py-2 md:w-[45%]'
                        onClick={() =>
                            session
                                ? removeItem(productIndex, items, session, setItems, setShowModal, showModal, setIsLoading)
                                : removeLocalItem(productIndex, setIsLoading, setShowModal, setItems)
                        }
                    >
                        {isLoading ? 'Removing...' : 'REMOVE'}
                    </button>
                    <button className='border border-black w-[90%] py-2 md:w-[45%]' onClick={() => handleCloseModal(setShowModal)}>CANCEL</button>
                </div>
            </div>
        </div>
    );
}
