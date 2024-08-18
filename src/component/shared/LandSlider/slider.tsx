import React from 'react';
import './event-slider.scss';
import Slider from 'react-slick';
import  Settings from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import SliderNextIcon from '../../../Assets/Images/svg/SliderPrevIcon';
import SliderPrevIcon from '../../../Assets/Images/svg/SliderNextIcon';
import { getYouTubeVideoID, isYouTubeUrl } from '../../../utils/utils';

function SampleNextArrow(props) {
  const { style, onClick } = props;
  return (
    <div className={`sample_arrow next_arrow `} style={style} onClick={onClick}>
      <SliderNextIcon />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { style, onClick } = props;
  return (
    <div className={`sample_arrow prev_arrow`} style={style} onClick={onClick}>
      <SliderPrevIcon />
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
        <div className="event_photos_skeletom">
          <img
            src="/assets/images/company_cover.webp"
            alt="skeleton photo img"
            width={100}
            height={100}
          />
        </div>
      ) : (
        <Slider {...settings}>
          {combined?.map((url: string, index: number) => (
            <div key={index} className="event_photos">
              {isYouTubeUrl(url) ? (
                <iframe
                  className=""
                  width="560"
                  height="315"
                  src={`https://www.youtube.com/embed/${getYouTubeVideoID(
                    url
                  )}?controls=1`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <img src={url} alt={altName} width={100} height={100} />
              )}
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default LandSlider;
