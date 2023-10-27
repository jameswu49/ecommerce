// Set's the products quantity in cart

export const handleQuantity = async (event, index, items, session) => {
    const selectedValue = event.target.value;

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
        }
    } catch (error) {
        console.error('Error adding to cart:', error);
    }
}