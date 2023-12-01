'use client'
import { useEffect } from "react";
import Link from "../../../node_modules/next/link"
import links from "../data/links"
import { useSidebarContext } from "../context/sidebarContext";
import { useSpring, animated } from '@react-spring/web';
import { signIn, signOut, useSession } from "next-auth/react"


export default function Sidebar() {
    const { handleActiveLink, isOpen } = useSidebarContext()

    const { data: session } = useSession();

    const menuAnimation = useSpring({
        transform: isOpen ? 'translateY(0%)' : 'translateY(-100%)',
        opacity: isOpen ? 1 : 0,
        config: { duration: 400 }
    });

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('no-scroll');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            document.body.classList.remove('no-scroll');
        }
        return () => {
            document.body.classList.remove('no-scroll');
        };
    }, [isOpen]);


    return (
        <animated.div className='fixed h-screen bg-white z-10 w-full flex justify-center lg:hidden' style={menuAnimation}>
            <nav className="h-1/2 flex items-center">
                <div className="flex flex-col h-1/2 justify-evenly font-semibold">
                    {links.map((elements, index) => (
                        <Link key={index} href={elements.href} onClick={() => handleActiveLink()}>
                            <>
                                {elements.name}
                            </>
                        </Link>
                    ))}
                    {session ? (
                        <div><button onClick={() => signOut()}>Sign Out</button></div>
                    ) : (
                        <>
                            <div><button onClick={() => signIn()}>Sign In</button></div>
                            <Link href={'/signup'} onClick={() => handleActiveLink()}>Create Account</Link>
                        </>
                    )}
                </div>
            </nav>
        </animated.div>

    )
}