export const fetchProducts = async (session, setItems) => {
    try {
        const response = await fetch(`/api/getCartProducts?userId=${session.user.id}`, {
            method: 'GET',
        });

        if (response.ok) {
            const product = await response.json();
            setItems(product);
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
            fetchProducts(session, setItems)
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