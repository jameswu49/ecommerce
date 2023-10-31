import { useEffect } from "react";

export const FetchCartItems = (session, status, setItems) => useEffect(() => {
    if (status !== 'authenticated') {
        const cartItems = localStorage.getItem('cart')
        const parsedCartItems = JSON.parse(cartItems);

        if (parsedCartItems) {
            setItems(parsedCartItems)
        }
    } else {
        const cartItems = localStorage.getItem('cart');
        const parsedCartItems = JSON.parse(cartItems);

        if (status !== 'authenticated' && parsedCartItems && parsedCartItems.length > 0) {
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
}, [session, setItems, status]);

export const fetchProducts = async (session) => {
    try {
        const response = await fetch(`/api/getCartProducts?userId=${session.user.id}`, {
            method: 'GET',
        });

        if (response.ok) {
            const product = await response.json();
            return product
        } else {
            console.error('Error fetching products:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Error fetching products:', error);
    }
};

export const removeItem = async (index: number, items, session, setItems, setShowModal, showModal, setIsLoading) => {
    setIsLoading(true)
    try {
        const response = await fetch(`/api/deleteCartItem?cartItemId=${items[index].id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            fetchProducts(session).then((fetchedProducts) => { setItems(fetchedProducts) })
            setShowModal(!showModal)
            setIsLoading(false)
            return
        } else {
            console.error('Error fetching products:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }

};

export const removeLocalItem = (index: number, setIsLoading, setShowModal, setItems) => {
    setIsLoading(true)
    const cartItems = localStorage.getItem('cart')
    const parsedCartItems = JSON.parse(cartItems);
    parsedCartItems.splice(index, 1)
    setItems(parsedCartItems)
    const modifiedData = JSON.stringify(parsedCartItems);
    localStorage.setItem('cart', modifiedData);
    setIsLoading(false)
    setShowModal(false)
}