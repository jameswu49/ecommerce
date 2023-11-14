import Banner from "./components/banner"
import Shoes from "./components/shoes"
import Collabs from "./components/collab"

export default function Home() {
    return (
        <section className="p-5">
            <Banner />
            <hr className="border-[red] my-5 w-full" />
            <Shoes />
            <Collabs />
        </section>
    )
}