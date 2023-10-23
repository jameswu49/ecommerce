type Product = {
    name: string,
    price: number,
    description: string,
    mainImage: string,
    image1: string,
    image2: string,
    image3: string,
    image4: string,
    colors: [],
    images: string[]
}

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
    product: Product | null,
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

export const total = (items: any) => {
    let price = 0;
    items.map((elements: any) => (
        price += elements.productPrice * elements.quantity
    ))
    return price
}

export const closeModal = (
    modal: boolean,
    setModal: React.Dispatch<React.SetStateAction<boolean>>
) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setModal(!modal);
};
