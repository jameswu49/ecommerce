'use client'
import { useState } from "react"
import Image from "../../../node_modules/next/image"
import collabData from "../data/collabData"

export default function Collabs() {
    const [id, setId] = useState(0)

    const handleClick = (newId: number) => {
        setId(newId)
    }

    return (
        <section className="mb-5 md:h-[70rem] lg:w-full lg:flex lg:relative lg:max-h-[60vh]">
            <div className="bg-[red] w-full py-5 px-5 text-white flex flex-col justify-center lg:w-[55%] lg:h-[70%] lg:absolute lg:z-10 lg:left-0 lg:pl-10 2xl:max-h-[90%]">
                <h1 className="font-bold text-xl text-center md:pt-16 md:text-2xl lg:text-3xl lg:text-start">{collabData[id].title} x SUPREME</h1>
                <p className="text-sm pt-5 lg:pr-20 lg:leading-6">{collabData[id].description}</p>
                <div className="mt-5 flex justify-center md:pb-10 lg:justify-start">
                    <button className="border-white border-[1px] px-3 font-semibold lg:px-5 lg:py-1">Learn More</button>
                </div>
            </div>
            <div className="hidden lg:flex w-1/2 h-full items-end justify-evenly 2xl:h-[90%]">
                {collabData.map((data, index) => (
                    <div key={index} className="w-[15%] h-[20%] max-h-32 flex justify-evenly cursor-pointer">
                        <Image src={collabData[index].src} alt={collabData[index].alt} onClick={() => handleClick(index)} className='object-fill h-full' />
                    </div>
                ))}
            </div>
            <div className="lg:w-1/2 lg:ml-auto">
                <div className="mt-5 flex items-center w-full h-64 md:h-[35rem] justify-center lg:h-full lg:mt-0 2xl:max-h-[90%]">
                    <Image src={collabData[id].src} alt={'shoes'} className='object-fill h-full md:w-full' />
                </div>
                <div className="w-full h-auto flex justify-evenly mx-auto mt-5 lg:hidden">
                    {collabData.map((data, index) => (
                        <div key={index} className="w-full cursor-pointer overflow-hidden relative md:h-32">
                            <Image src={collabData[index].src} alt={collabData[index].alt} onClick={() => handleClick(index)} className='object-fill h-full' />
                        </div>
                    ))}
                </div>
            </div>
        </section >
    )
}