import { useEffect } from 'react';

export const useFetchProductDetails = (
    paramsIndex: number,
    category: string,
    setProduct: React.Dispatch<React.SetStateAction<any[]>>,
    setImage: React.Dispatch<React.SetStateAction<string>>,
    setImageUrls: React.Dispatch<React.SetStateAction<string[]>>,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
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
                    setIsLoading(false);
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
    }, [paramsIndex, category, setImage, setImageUrls, setProduct, setIsLoading]);
}

export const handleAddToCart = async (
    session: any,
    product: any,
    imageUrls: number[],
    setCartItems: Function,
    setModal: Function,
    modal: boolean,
    setIsAddingToCart: Function,
    quantity: number,
    cartItems: any
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