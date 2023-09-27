import Image from "../../../node_modules/next/image"
import shoe from "../images/shoes1.jpeg"

export default function Shoes() {
    return (
        <section className="flex flex-col justify-center items-center lg:flex-row lg:w-full lg:mb-5 lg:h-[40rem]">
            <div className="lg:w-1/2">
                <h1 className="font-bold text-xl mb-5 text-center md:text-2xl lg:text-4xl">Nike Air Force x Supreme</h1>
                <div className="relative w-full h-64 md:w-[40rem] md:h-[40rem] lg:w-[30rem] lg:h-[30rem] lg:mx-auto">
                    <Image src={shoe}
                        alt={'shoes'}
                        fill
                        objectFit=""
                    />
                </div>
            </div>
            <div className="py-5 text-center lg:w-1/2 lg:text-start lg:pr-5">
                <h2 className="text-[red] font-bold text-lg pb-2 md:text-2xl lg:text-3xl">Supreme<span className="text-xl md:text-3xl lg:text-4xl">&reg;</span> / Nike<span className="text-xl md:text-3xl lg:text-4xl">&reg;</span></h2>
                <p>Supreme and Nike join forces to bring you the ultimate streetwear statement: the Supreme x Nike Air Force 1 collaboration.
                    These sneakers combine Supreme&apos;s unique style with the timeless appeal of Nike&apos;s Air Force 1,
                    resulting in a collection that&apos;s set to redefine urban fashion. Expect bold designs, premium materials, and unbeatable comfort.
                    Elevate your streetwear game with this iconic collaboration.
                </p>
                <p className="pt-5 text-[#C3C3C3]">
                    Available in-store NY, LA, London, Paris, and online October 2nd.
                    <br />
                    Available in Japan October 4th.
                </p>
                <div className="mt-5">
                    <button className="border-[red] border-2 px-3 text-[red] font-semibold lg:px-5 lg:py-1">Learn More</button>
                </div>
            </div>
        </section>
    )
}