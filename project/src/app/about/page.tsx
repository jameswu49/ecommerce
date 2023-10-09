import Image from "../../../node_modules/next/image"
import kermit from "../images/kermit.png"

export default function About() {
    return (
        <section className="px-5 md:px-10 lg:h-[80vh]">
            <div className="lg:flex lg:h-full">
                <div className="w-full h-auto md:flex md:justify-center lg:w-1/2 lg:h-[90%] lg:items-end 2xl:h-[90%]">
                    <Image src={kermit} alt={'Kermit wearing a shirt'} />
                </div>
                <div className="flex flex-col h-[40rem] md:h-[30rem] lg:h-3/4 lg:w-3/4 2xl:h-[90%]">
                    <div className="flex flex-col gap-y-4 h-full my-5 md:justify-center lg:my-0 lg:gap-y-8 lg:w-3/4 lg:text-base">
                        <p>
                            In April 1994, Supreme opened its doors on Lafayette Street in downtown Manhattan and became the home of New York City skate culture.
                            At its core was a group of neighborhood kids, New York skaters, and local artists who became the store&apos;s staff, crew, and customers.
                        </p>
                        <p>
                            Supreme grew to embody downtown culture, and play an integral part in its constant regeneration.
                            Skaters, punks, hip-hop heads — the young counter culture at large — all gravitated toward Supreme.
                        </p>
                        <p>
                            While it developed into a downtown institution, Supreme established itself as a brand known for its quality, style, and authenticity.
                        </p>
                        <p>
                            Over 25 years, Supreme has expanded from its New York City origins into a global community;
                            working with generations of artists, photographers, designers, musicians, filmmakers, and writers who defied conventions
                            and contributed to its unique identity and attitude.
                        </p>
                    </div>
                </div>
            </div>
        </section >
    )
}