'use client'
import { useEffect, useState } from 'react';
import Image from "../../../node_modules/next/image"
import logo from "../images/supreme.png"

export default function Navbar() {
    const [currentTimeString, setCurrentTimeString] = useState('');

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
        <nav className="h-32 flex items-center justify-center text-center lg:justify-start lg:p-5">
            <div className="">
                <div className="relative w-40 h-16 lg:w-48">
                    <Image src={logo}
                        alt={'banner'}
                        fill
                    />
                </div>
                <div className="text-xs my-2 lg:text-base">
                    <p>{currentTimeString + ' NYC'}</p>
                </div>
            </div>
        </nav>
    )
}