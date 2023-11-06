import Carousel from "./components/carousel"

export default function Home() {
    return (
        <section className="flex flex-col justify-center h-[60vh] md:justify-start lg:h-full">
            <Carousel />
        </section>
    )
}