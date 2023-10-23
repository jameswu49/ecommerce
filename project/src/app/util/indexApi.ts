import { useEffect } from 'react';

export const useFetchProductDetails = (
    paramsIndex: number,
    category: string,
    setProduct: Function,
    setImage: Function,
    setImageUrls: Function
) => {
    useEffect(() => {
        async function fetchProductDetails() {
            try {
                const response = await fetch(`/api/getProductDetails?id=${paramsIndex}&category=${category}`);
                if (response.ok) {
                    const productData = await response.json();
                    setProduct(productData);
                    setImage(productData.mainImage);
                    const imageArray = productData?.images[0];
                    const imageUrls = [
                        imageArray.image1,
                        imageArray.image2,
                        imageArray.image3,
                        imageArray.image4
                    ].filter(url => url !== null && url !== "");
                    setImageUrls(imageUrls);
                } else {
                    console.error('Error fetching product details:', response.status, response.statusText);
                }
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        }

        if (paramsIndex) {
            fetchProductDetails();
        }
    }, [paramsIndex, category, setImage, setImageUrls, setProduct]);
}

export const handleAddToCart = async (
    session: any,
    product: any,
    imageUrls: number[],
    setCartItems: Function,
    setModal: Function,
    modal: boolean,
    setIsAddingToCart: Function,
    quantity: number
) => {
    setIsAddingToCart(true)

    const data = {
        userId: session.user.id,
        productData: {
            name: product?.name,
            price: product?.price,
            image: imageUrls,
            quantity: quantity
        }
    }

    try {
        const response = await fetch('/api/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            const cartData = await response.json();
            setCartItems(cartData)
            setModal(!modal)
            setIsAddingToCart(false)
        }
    } catch (error) {
        console.error('Error adding to cart:', error);
    }
}