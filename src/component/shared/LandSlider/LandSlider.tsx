import React from 'react'
import './slider.css'
import Slider from 'react-slick'
import Settings from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import SliderNextIcon from '../../../Assets/Images/svg/SliderPrevIcon.tsx'
import SliderPrevIcon from '../../../Assets/Images/svg/SliderNextIcon.tsx'

function SampleNextArrow (props: {
  style?: React.CSSProperties
  onClick?: () => void
}) {
  const { style, onClick } = props
  return (
    <div className='sample_arrow next_arrow' style={style} onClick={onClick}>
      <SliderPrevIcon />
    </div>
  )
}

function SamplePrevArrow (props: {
  style?: React.CSSProperties
  onClick?: () => void
}) {
  const { style, onClick } = props
  return (
    <div className='sample_arrow prev_arrow' style={style} onClick={onClick}>
      <SliderNextIcon />
    </div>
  )
}

type Props = {
  photos: string[]
  videos: string[]
  altName: string
}

export const LandSlider = ({ photos, altName, videos }: Props) => {
  // Ensure we're working with valid arrays and remove any duplicates
  const uniquePhotos = Array.from(new Set(photos))
  const uniqueVideos = Array.from(new Set(videos))
  const combined = [...uniquePhotos, ...uniqueVideos]

  // Only show controls if there's more than one item
  const showControls = combined.length > 1

  const settings: Settings = {
    autoplay: showControls,
    autoplaySpeed: 5000,
    dots: showControls,
    lazyLoad: 'progressive',
    infinite: showControls,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: showControls ? <SampleNextArrow /> : undefined,
    prevArrow: showControls ? <SamplePrevArrow /> : undefined,
    customPaging: function () {
      return <div className='dot'></div>
    },
    dotsClass: 'slick-dots slick-thumb',
    pauseOnFocus: true,
    pauseOnHover: true,
    pauseOnDotsHover: true
  }

  // Early return for empty arrays
  if (combined.length === 0) {
    return (
      <div className='land_slider_container'>
        <img
          src='/assets/images/company_cover.webp'
          alt='default land'
          width={100}
          height={100}
        />
      </div>
    )
  }

  if (combined.length === 1) {
    return (
      <div className='slider_container'>
        <div className='event_photos'>
          <img
            src={combined[0]}
            alt={`${altName} 1`}
            width={100}
            height={100}
          />
        </div>
      </div>
    )
  }

  return (
    <div className='slider_container'>
      <Slider {...settings}>
        {combined.map((url: string, index: number) => (
          <div key={`${url}-${index}`} className='event_photos'>
            <img
              src={url}
              alt={`${altName} ${index + 1}`}
              width={100}
              height={100}
            />
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default LandSlider
