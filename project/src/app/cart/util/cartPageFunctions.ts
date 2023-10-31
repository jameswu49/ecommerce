// Set's the products quantity in cart
export const handleQuantity = async (event, index, items, session, setItems, itemsInCart) => {
    const selectedValue = event.target.value;

    if (session) {
        const data = {
            userId: session.user.id,
            cartItemId: items[index].id,
            updatedQuantity: selectedValue,
        }

        try {
            const response = await fetch('/api/updateQuantity', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const cartData = await response.json();
                const updatedItems = [...items]
                updatedItems[index] = cartData
                setItems(updatedItems)
                itemsInCart(items)
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    } else {
        const updatedItems = [...items]
        updatedItems[index].quantity = parseInt(selectedValue, 10)
        const updatedItemsJSON = JSON.stringify(updatedItems);
        localStorage.setItem('cart', updatedItemsJSON);
        setItems(updatedItems)
        itemsInCart(items)
    }
}

// Show modal 
export const handleModal = (index: number, setShowModal, setProductIndex) => {
    setShowModal(true)
    setProductIndex(index)
}

// Close Modal
export const handleCloseModal = (setShowModal) => {
    setShowModal(false)
}

// Calculate items in cart 
export const itemsInCart = (items: Array<{ quantity: number }>) => {
    let total = 0;
    items.map((elements) => (
        total += elements.quantity
    ))
    return total
}

// Redirect to login page if not logged in 
export const handleLogIn = (router) => {
    router.push('/api/auth/signin')
}

// Show Checkout modal if user isn't logged in 
export const handleCheckOutModal = (setCheckOutModal, checkOutModal) => {
    setCheckOutModal(!checkOutModal)
}