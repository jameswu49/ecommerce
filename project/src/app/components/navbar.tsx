'use client'
import Link from '../../../node_modules/next/link';
import { useEffect, useState } from 'react';
import Image from "../../../node_modules/next/image"
import logo from "../images/supreme.png"
import navbarLinks from '../data/links';
import { FiMenu } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import { useSidebarContext } from '../context/sidebarContext';
import { signIn, signOut, useSession } from "next-auth/react"

export default function Navbar() {
    const [currentTimeString, setCurrentTimeString] = useState('');
    const { handleMenuToggle, isOpen, handleActiveLink, accountOpen, setAccountIsOpen } = useSidebarContext()

    const { data: session } = useSession();

    const toggleDropdown = () => {
        setAccountIsOpen(!accountOpen)
    };

    const updateTime = () => {
        const currentDate = new Date();
        const options: Intl.DateTimeFormatOptions = {
            timeZone: 'America/New_York',
            hour12: true,
            hour: 'numeric',
            minute: 'numeric',
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
        };
        const newTimeString = currentDate.toLocaleTimeString('en-US', options);
        setCurrentTimeString(newTimeString);
    };

    useEffect(() => {
        updateTime();

        const intervalId = setInterval(updateTime, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return (
        <nav className="h-[20vh] flex items-center justify-center text-center relative z-20 lg:p-5 lg:justify-between">
            <div>
                {isOpen ? <Link href={'/'} onClick={() => handleActiveLink()}>
                    <div className="relative w-40 h-16 cursor-pointer lg:w-48">
                        <Image src={logo}
                            alt={'banner'}
                            fill
                        />
                    </div>
                </Link> :
                    <Link href={'/'}>
                        <div className="relative w-40 h-16 cursor-pointer lg:w-48">
                            <Image src={logo}
                                alt={'banner'}
                                fill
                            />
                        </div>
                    </Link>
                }
                <div className="text-xs my-2 lg:text-base">
                    <p>{currentTimeString} {`${currentTimeString ? 'NYC' : ''}`}</p>
                </div>
            </div>
            <div className='absolute right-[5%] top-[30%] text-2xl md:text-3xl lg:hidden' onClick={() => handleMenuToggle()}>
                {!isOpen ? <FiMenu /> : <AiOutlineClose />}
            </div>
            <div className='hidden lg:flex lg:gap-x-3 lg:mr-5'>
                {navbarLinks.map((links, index) => (
                    <div key={index} className='flex flex-col'>
                        <Link href={links.href} onClick={() => handleActiveLink()}>{links.name}</Link>
                    </div>
                ))}
                {session ? (
                    <div><button onClick={() => signOut()}>Sign Out</button></div>
                ) : (
                    <div className='relative'>
                        <span className='cursor-pointer' onClick={toggleDropdown}>Account</span>
                        {accountOpen && (
                            <div className='absolute border border-black w-[10rem] h-[6rem] right-[-2rem] top-9 flex flex-col justify-center gap-y-3 z-50 bg-white'>
                                <div>
                                    <Link href={'/signup'} className="cursor-pointer" onClick={toggleDropdown}>
                                        Create Account
                                    </Link>
                                </div>
                                <hr />
                                <div>
                                    <button onClick={() => signIn()} className="cursor-pointer">Sign In</button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

        </nav>
    )
}