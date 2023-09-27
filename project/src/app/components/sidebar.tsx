'use client'
import Link from "../../../node_modules/next/link"
import { FaTimes } from 'react-icons/fa';
import links from "../data/links"
import { useSidebarContext } from "../context/sidebarContext";
import { useSpring, animated } from '@react-spring/web';

export default function Sidebar() {
    const { handleMenuToggle, handleActiveLink, isOpen, id } = useSidebarContext()

    const menuAnimation = useSpring({
        transform: isOpen ? 'translateY(0%)' : 'translateY(-100%)',
        opacity: isOpen ? 1 : 0,
        config: { duration: 400 }
    });

    return (
        <animated.div className='fixed h-screen bg-white z-10 w-full flex justify-center lg:hidden' style={menuAnimation}>
            <div className="h-1/2 flex items-center">
                <div className="flex flex-col h-1/2 justify-evenly font-semibold">
                    {links.map((elements, index) => (
                        <Link key={index} href={elements.href} onClick={() => handleActiveLink(index)}>
                            <>
                                {elements.name}
                                <div className={`${index === id ? 'border-t-[red] border-2' : ''}`} />
                            </>
                        </Link>
                    ))}
                </div>
            </div>
        </animated.div>

    )
}