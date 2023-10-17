// export const fetchProducts = async function fetchProducts({ setItems, session }) {
//     try {
//         const response = await fetch(`/api/getCartProducts?userId=${session.user.id}`, {
//             method: 'GET'
//         });

//         if (response.ok) {
//             const product = await response.json()
//             setItems(product)
//         } else {
//             console.error('Error fetching products:', response.status, response.statusText);
//         }
//     } catch (error) {
//         console.error('Error fetching products:', error);
//     }
// }