import { useEffect } from "react";

type CartItem = {
    product?: {
        name: string;
        price: number;
    };
    image: string;
    quantity: number;
};

// If user is logged in, check for items in local storage and update their cart with it. Else, only show items from local storage 
export const FetchCartItems = (
    session: any,
    status: any,
    setItems: React.Dispatch<React.SetStateAction<CartItem[]>>
) => useEffect(() => {
    if (status !== 'authenticated') {
        const cartItems = localStorage.getItem('cart')
        const parsedCartItems = cartItems ? JSON.parse(cartItems) : null;

        if (parsedCartItems) {
            setItems(parsedCartItems)
        }
    } else {
        const cartItems = localStorage.getItem('cart');
        const parsedCartItems = cartItems ? JSON.parse(cartItems) : null;

        if (status === 'authenticated' && parsedCartItems && parsedCartItems.length > 0) {
            const data = {
                userId: session.user.id,
                productData: parsedCartItems.map((existingItem: CartItem) => ({
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

// Get all items in users cart 
export const fetchProducts = async (session: Session) => {
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

// Delete item from users cart  
export const removeItem = async (
    index: number,
    items: any[],
    session: any,
    setItems: React.Dispatch<React.SetStateAction<any[]>>,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
    showModal: boolean,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
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

// Remove item from local storage 
export const removeLocalItem = (
    index: number,
    setIsLoading,
    setShowModal,
    setItems
) => {
    setIsLoading(true)
    const cartItems = localStorage.getItem('cart')
    const parsedCartItems = cartItems ? JSON.parse(cartItems) : null;
    parsedCartItems.splice(index, 1)
    setItems(parsedCartItems)
    const modifiedData = JSON.stringify(parsedCartItems);
    localStorage.setItem('cart', modifiedData);
    setIsLoading(false)
    setShowModal(false)
}