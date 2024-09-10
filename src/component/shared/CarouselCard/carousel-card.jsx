import { Image } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import classes from './CarouselCard.module.css';

export function CarouselCard({ images = [] }) {
    const validImages = Array.isArray(images) && images.length > 0;

    if (!validImages) {
        return null;
    }

    const slides = images.map((image, index) => (
        <Carousel.Slide key={image.url || image || index}>
            <div className={classes.slideWrapper}>
                <Image 
                    src={image.url || image} 
                    height={320}
                    width="100%" 
                    fit="cover"
                    alt={`Image ${index + 1}`}
                    onError={(e) => {
                        e.target.src = '/path/to/fallback/image.jpg';
                    }}
                />
            </div>
        </Carousel.Slide>
    ));

    return (
        <div className={classes.carouselWrapper}>
            <Carousel
                withIndicators
                loop
                slidesToScroll={1}
                align="start"
                slideSize="100%"
                slideGap="md"
                classNames={{
                    root: classes.carousel,
                    container: classes.carouselContainer,
                    controls: classes.carouselControls,
                    indicator: classes.carouselIndicator,
                }}
            >
                {slides}
            </Carousel>
        </div>
    );
}