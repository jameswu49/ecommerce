'use client'
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

interface UserData {
    id?: number;
    name?: string | null;
    email?: string | null;
    image?: string | null;
}

export default function Success() {
    const router = useRouter()
    const { data: session, status } = useSession();

    // If signed in, delete items from database else, clear localstorage. Then redirect to homepage 
    useEffect(() => {
        const userId: UserData = session?.user?.id

        if (userId && status === 'authenticated') {
            const deleteCartItems = async () => {
                try {
                    const response = await fetch(`/api/checkoutCart?userId=${userId}`, {
                        method: 'DELETE'
                    })
                    if (response.ok) {
                        console.log('deleted')
                    }
                } catch (error) {
                    console.error('An error occured', error)
                }
            }

            deleteCartItems()

        } else {
            localStorage.clear()
        }

        setTimeout(() => {
            router.push("/");
        }, 3000);

    }, [session, status, router])

    return (
        <section className="h-[60vh] flex flex-col items-center justify-center text-xl">
            <div className="h-1/2 text-center flex flex-col justify-center">
                <h1 className="font-bold">Payment was successful!</h1>
                <h2>Thank you for shopping with us!</h2>
            </div>
            <div className="h-1/2 text-cener">
                <h3>Redirecting to homepage...</h3>
            </div>
        </section>
    )
}