'use client'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Image from "../../../node_modules/next/image";
import hat from "../images/hat.jpg"
import money from "../images/money.jpg"
import skateboard from "../images/skateboard.jpg"
import sign from "../images/sign.jpg"

export default function HomeCarousel() {
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1,
            slidesToSlide: 1,
            infinite: true
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1,
            slidesToSlide: 1,
            infinite: true
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1,
            infinite: true
        }
    };
    return (
        <section>
            <Carousel
                swipeable={true}
                draggable={true}
                showDots={true}
                responsive={responsive}
                ssr={true}
                infinite={true}
                autoPlay={false}
                autoPlaySpeed={3000}
                keyBoardControl={true}
                customTransition="all .5"
                transitionDuration={500}
                containerClass="carousel-container"
                removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
                className="lg:h-screen"
            >
                <div><Image src={sign} alt={'Supreme Store Sign'} priority /></div>
                <div><Image src={money} alt={'Supreme Money Gun'} priority /></div>
                <div><Image src={hat} alt={'Supreme Hat'} priority /></div>
                <div><Image src={skateboard} alt={'Supreme Skateboard'} priority /></div>
            </Carousel>
        </section>
    )
}