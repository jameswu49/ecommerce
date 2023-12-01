'use client'
import { useState } from "react"
import Image from "next/image"
import data from "../../data/storeLocations"
import { useTransition, animated } from '@react-spring/web';

// Stores for mobile 
export function MobileStores() {
    return (
        <div className="mb-5 md:hidden">
            {data.map((locations, index) => (
                <div key={index} className='mb-5'>
                    <div>
                        <Image src={locations.src} alt={'store'} />
                    </div>
                    <div className="text-xs flex flex-col gap-y-3 mt-3">
                        <h1>{locations.name}</h1>
                        <p>
                            {locations.address1}
                            <br />
                            {locations.address2}
                            <br />
                            {locations.phone}
                        </p>
                        <p>
                            {locations.open1}
                            <br />
                            {locations.open2}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    )
}

// Stores for laptop and above screens 
export function DesktopStores() {
    const [id, setId] = useState(0)

    const handleTabs = (newId: number) => {
        setId(newId)
    }
    const transitions = useTransition(id, {
        from: { opacity: 0, },
        enter: { opacity: 1, },
        config: { duration: 700 },
    });


    return (
        <div className="hidden md:flex md:flex-col md:justify-center md:h-[70vh] lg:h-[100vh] mb-5">
            <div className="w-full relative">
                {transitions((style, id: number) => (
                    <animated.div style={style}>
                        <Image src={data[id].src} alt={'store'} priority className="w-full h-[35rem] lg:h-[80vh]" />
                    </animated.div>))}
                <div className="absolute bg-black opacity-70 w-[40%] h-full top-0 text-white">
                    <div className="ml-20 h-full flex flex-col gap-y-8 leading-8 justify-center">
                        <div>
                            <h1 className="text-[2vh] font-bold lg:text-2xl lg:my-2">{data[id].name}</h1>
                            <p>
                                {data[id].address1}
                                <br />
                                {data[id].address2}
                            </p>
                        </div>
                        {data[id].phone}
                        <p>
                            {data[id].open1}
                            <br />
                            {data[id].open2}
                        </p>
                        <div className="">
                            <a href={data[id].maps} target="_blank" rel="noopener noreferrer" className="border border-white py-1 px-4">View Map</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex w-full justify-evenly h-20 items-center text-sm">
                {data.map((locations, index) => (
                    <div key={index} className={`cursor-pointer ${id === index ? 'text-[red]' : 'text-black'}`} onClick={() => handleTabs(index)}>
                        {locations.name}
                    </div>
                ))}
            </div>
        </div >
    )
}