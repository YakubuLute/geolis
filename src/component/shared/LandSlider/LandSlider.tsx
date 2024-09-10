import React from 'react';
import './slider.css';
import Slider from 'react-slick';
import Settings from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import SliderNextIcon from '../../../Assets/Images/svg/SliderPrevIcon.tsx';
import SliderPrevIcon from '../../../Assets/Images/svg/SliderNextIcon.tsx';
import { getYouTubeVideoID, isYouTubeUrl } from '../../../utils/utils.ts';

function SampleNextArrow(props) {
  const { style, onClick } = props;
  return (
    <div className={`sample_arrow next_arrow `} style={style} onClick={onClick}>
      <SliderPrevIcon />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { style, onClick } = props;
  return (
    <div className={`sample_arrow prev_arrow`} style={style} onClick={onClick}>

      <SliderNextIcon />
    </div>
  );
}

type Props = {
  photos: string[];
  videos: string[];
  altName: string;
};

export const LandSlider = ({ photos, altName, videos }: Props) => {
  const combined = [...photos, ...videos];

  const settings: Settings = {
    autoplay: true,
    autoplaySpeed: 5000,
    dots: true,
    lazyLoad: 'progressive',
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    customPaging: function () {
      return <div className="dot"></div>;
    },
    dotsClass: 'slick-dots slick-thumb',
    pauseOnFocus: true,
    pauseOnHover: true,
    pauseOnDotsHover: true,
  };

  return (
    <div className="slider_container">
      {combined?.length === 0 ? (
        <div className="land_slider_container">
          <img
            src="/assets/images/company_cover.webp"
            alt="default land "
            width={100}
            height={100}
          />
        </div>
      ) : (
        <Slider {...settings}>
          {combined?.map((url: string, index: number) => (
            <div key={index} className="event_photos">
              <img src={url} alt={altName} width={100} height={100} />
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default LandSlider;
