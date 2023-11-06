'use client'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Image from "../../../node_modules/next/image";
import banner from "../images/banner.png"
import money from "../images/money.jpg"
import skateboard from "../images/skateboard.jpg"
import person from "../images/person.jpg"

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
                ssr={true} // means to render carousel on server-side.
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={3000}
                keyBoardControl={true}
                customTransition="all .5"
                transitionDuration={500}
                containerClass="carousel-container"
                removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
                // deviceType={this.props.deviceType}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
            >
                <div><Image src={banner} alt={''} /></div>
                <div><Image src={money} alt={''} /></div>
                <div><Image src={skateboard} alt={''} /></div>
                <div><Image src={person} alt={''} /></div>
            </Carousel>
        </section>
    )
}