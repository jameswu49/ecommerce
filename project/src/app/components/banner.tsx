import Image from "../../../node_modules/next/image"
import banner from "../images/banner2.png"

export default function Banner() {
    return (
        <section className="flex items-center h-[15rem] md:h-[30rem] lg:h-[80vh]">
            <div className="relative w-full h-[15rem] md:h-[30rem] lg:h-[80vh]">
                <Image src={banner}
                    alt={'banner'}
                    fill
                />
            </div>
        </section>
    )
}