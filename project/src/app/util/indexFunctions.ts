export const handleThumbnailImage = (
    image: string,
    index: number,
    setArrayIndex: React.Dispatch<React.SetStateAction<number>>,
    setImage: React.Dispatch<React.SetStateAction<string>>
) => {
    setArrayIndex(index);
    setImage(image);
};

export const handleNextImage = (
    arrayIndex: number,
    imageUrls: string[],
    setArrayIndex: React.Dispatch<React.SetStateAction<number>>,
    setImage: React.Dispatch<React.SetStateAction<string>>,
) => {
    if (arrayIndex < imageUrls.length - 1) {
        setArrayIndex((prevArrayIndex) => {
            setImage(imageUrls[prevArrayIndex + 1]);
            return prevArrayIndex + 1;
        });
    } else {
        setArrayIndex(0);
        setImage(imageUrls[0]);
    }
};

export const handlePreviousImage = (
    arrayIndex: number,
    setImage: React.Dispatch<React.SetStateAction<string>>,
    setArrayIndex: React.Dispatch<React.SetStateAction<number>>,
    imageUrls: string[]
) => {
    if (arrayIndex === 0) {
        setImage(imageUrls[imageUrls.length - 1]);
        setArrayIndex(imageUrls.length - 1);
    } else {
        setArrayIndex((prevArrayIndex) => {
            setImage(imageUrls[prevArrayIndex - 1]);
            return prevArrayIndex - 1;
        });
    }
};

export const handleImageChange = (
    src: string,
    index: number,
    setImage: React.Dispatch<React.SetStateAction<string>>,
    product: any,
    setImageUrls: React.Dispatch<React.SetStateAction<string[]>>,
    setArrayIndex: React.Dispatch<React.SetStateAction<number>>,
    setColorIndex: React.Dispatch<React.SetStateAction<number>>
) => {
    setImage(src);

    const imageArray = product?.images[index];
    const updatedImageUrls = [
        imageArray?.image1,
        imageArray?.image2,
        imageArray?.image3,
        imageArray?.image4
    ].filter((url) => url !== null && url !== "");

    setImageUrls(updatedImageUrls);
    setArrayIndex(0);
    setColorIndex(index)
};

export const total = (items: any, session: any) => {
    let price = 0;
    if (session) {
        items.forEach((elements: any) => {
            price += elements.productPrice * elements.quantity
        })
    } else {
        items.forEach((elements: any) => {
            price += elements.product?.price * elements.quantity
        })
    }
    return price
}

export const closeModal = (
    modal: boolean,
    setModal: React.Dispatch<React.SetStateAction<boolean>>
) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setModal(!modal);
};

export const updateQuantity = (
    event: React.ChangeEvent<HTMLInputElement>,
    setQuantity: React.Dispatch<React.SetStateAction<number>>
) => {
    setQuantity(parseInt(event.target.value, 10));
}

export const addToLocalStorage = (
    product: any,
    image: string,
    quantity: number,
    setIsAddingToCart: React.Dispatch<React.SetStateAction<boolean>>,
    setCartItems: React.Dispatch<React.SetStateAction<any>>,
    setModal: React.Dispatch<React.SetStateAction<boolean>>
) => {
    setIsAddingToCart(true)
    const cartItem = {
        product,
        image,
        quantity,
    };

    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingCartItem = existingCart.find((item: any) => item.image === image);

    if (existingCartItem) {
        existingCartItem.quantity += quantity;
        setCartItems(cartItem)
    } else {
        existingCart.push(cartItem);
        setCartItems(cartItem)
    }

    setTimeout(() => {
        setIsAddingToCart(false)
        setModal(true)
    }, 2000)

    localStorage.setItem('cart', JSON.stringify(existingCart));
}