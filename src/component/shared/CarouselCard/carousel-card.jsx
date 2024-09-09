import { Image, Card, } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import classes from './CarouselCard.module.css';


export function CarouselCard({ images = [] }) {
    const slides = images.map((image) => (
        <Carousel.Slide key={image}>
            <Image src={image} height={320} />
        </Carousel.Slide>
    ));

    return (
        <Carousel
            withIndicators
            loop
            classNames={{
                root: classes.carousel,
                controls: classes.carouselControls,
                indicator: classes.carouselIndicator,
            }}
        >
            {slides}
        </Carousel>
    );
}