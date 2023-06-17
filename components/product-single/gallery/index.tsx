import { createStyles, getStylesRef, rem, Image } from "@mantine/core";
import React from "react";
import { Carousel } from '@mantine/carousel';

type GalleryProductType = {
  images: string[];
};

const Gallery = ({ images }: GalleryProductType) => {
  const featImage = images[2];
  const useStyles = createStyles((theme) => ({
    carousel: {
      '&:hover': {
        [`& .${getStylesRef('carouselControls')}`]: {
          opacity: 1,
        },
      },
    },

    carouselControls: {
      ref: getStylesRef('carouselControls'),
      transition: 'opacity 150ms ease',
      opacity: 0,
    },

    carouselIndicator: {
      width: rem(4),
      height: rem(4),
      transition: 'width 250ms ease',

      '&[data-active]': {
        width: rem(16),
      },
    },
  }));

  const { classes } = useStyles();

  const slides = images.map((image) => (
    <Carousel.Slide key={image} onClick={(e) => {
      e.stopPropagation();
    }}>
      <Image src={image} height={220} onClick={(e) => {
          e.stopPropagation();
        }} />
    </Carousel.Slide>
  ));

  return (
    <section className="product-gallery">
      <div className="product-gallery__thumbs">
        {images.map((image) => (
          <div key={image} className="product-gallery__thumb">
            <img src={image} alt="" />
          </div>
        ))}
      </div>

      <div className="product-gallery__image">
      <Carousel

          withIndicators
          loop
          classNames={{
            root: classes.carousel,
            controls: classes.carouselControls,
            indicator: classes.carouselIndicator,
          }}
          style={{height:"100%"}}
        >
          {slides}
        </Carousel>
        {/* <img src={featImage} alt="" /> */}
      </div>
    </section>
  );
};

export default Gallery;
