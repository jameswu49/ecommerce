import Image from "../../../../node_modules/next/image"
import banner from "../../images/banner.png"

export default function Banner() {
    return (
        <section className="flex items-center h-auto">
            <div className="w-full h-auto">
                <Image src={banner}
                    alt={'banner'}
                    priority={true}
                />
            </div>
        </section>
    )
}