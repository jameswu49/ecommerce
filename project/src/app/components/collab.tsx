import Image from "../../../node_modules/next/image"
import shoes from "../images/shoes-collab.png"
import shirt from "../images/shirt-collab.jpeg"

export default function Collabs() {
    return (
        <section className="mb-5 md:h-[70rem] lg:w-full lg:flex lg:relative lg:max-h-[60vh]">
            <div className="bg-[red] w-full h-80 px-5 text-white flex flex-col justify-center lg:w-[55%] lg:h-[70%] lg:absolute lg:z-10 lg:left-0 lg:pl-10">
                <h1 className="font-bold text-xl text-center md:text-2xl lg:text-start">OFF WHITE x SUPREME</h1>
                <p className="text-sm pt-5 lg:pr-20 lg:leading-6">
                    Experience the fusion of urban style icons with the Off-White x Supreme collaboration.
                    This groundbreaking partnership combines the distinctive aesthetics of Off-White and Supreme,
                    delivering a collection that redefines streetwear fashion. Expect bold designs, premium materials,
                    and unrivaled comfort. Elevate your streetwear game with this iconic collaboration.
                </p>
                <div className="mt-5 flex justify-center md:mt-10 lg:justify-start">
                    <button className="border-white border-[1px] px-3 font-semibold lg:px-5 lg:py-1">Learn More</button>
                </div>
            </div>
            <div className="hidden lg:flex w-1/2 h-full items-end justify-evenly">
                <div className="lg:w-24 lg:h-24">
                    <Image src={shirt} alt={'shirt'} />
                </div>
                <div className="lg:w-24 lg:h-24">
                    <Image src={shirt} alt={'shirt'} />
                </div>
                <div className="lg:w-24 lg:h-24">
                    <Image src={shirt} alt={'shirt'} />
                </div>
                <div className="lg:w-24 lg:h-24">
                    <Image src={shirt} alt={'shirt'} />
                </div>
                <div className="lg:w-24 lg:h-24">
                    <Image src={shirt} alt={'shirt'} />
                </div>
            </div>
            <div className="lg:w-1/2 lg:ml-auto">
                <div className="relative w-full h-80 mt-5 md:h-[40rem] lg:mt-0 lg:h-[60vh]">
                    <Image src={shoes} alt={'shoes'} fill />
                </div>
                <div className="w-full h-10 flex justify-evenly gap-x-2 mx-auto mt-5 lg:hidden">
                    <div>
                        <Image src={shirt} alt={'shirt'} />
                    </div>
                    <div>
                        <Image src={shirt} alt={'shirt'} />
                    </div>
                    <div>
                        <Image src={shirt} alt={'shirt'} />
                    </div>
                    <div>
                        <Image src={shirt} alt={'shirt'} />
                    </div>
                    <div>
                        <Image src={shirt} alt={'shirt'} />
                    </div>

                </div>
            </div>
        </section >
    )
}