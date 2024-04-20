import './ImagesCarousel.scss'
import Carousel from 'react-bootstrap/Carousel'
import { useState } from 'react'
import ImageCarouselItem from './ImageCarouselItem'

const ImagesCarousel = () => {
  const images = [
    {
      src: './Carousel-SanMiguelDeAllende.jpg',
      name: 'San Miguel de Allende',
      objectPosition: 'center center'
    },
    {
      src: './Carousel-PlayaDelCarmen.jpg',
      name: 'Playa del Carmen',
      objectPosition: 'center center'
    },
    {
      src: './Carousel-Guadalajara.webp',
      name: 'Guadalajara',
      objectPosition: 'center center'
    },
    {
      src: './Carousel-Tulum.jpg',
      name: 'Tulum',
      objectPosition: 'center center'
    },
    {
      src: './Carousel-CanonSumidero.jpg',
      name: 'Chiapas',
      objectPosition: 'center center'
    },
    {
      src: 'https://fundacioncarlosslim.org/wp-content/uploads/2024/01/mariposa-monarca-3_min.jpg',
      name: 'Mariposas Monarca',
      objectPosition: 'center center'
    },
    {
      src: 'https://getwallpapers.com/wallpaper/full/5/6/4/1208594-best-cancun-wallpaper-desktop-1920x1080-for-mobile.jpg',
      name: 'Riviera Maya',
      objectPosition: 'center top'
    },
    {
      src: 'https://media.gq.com.mx/photos/61aa8c7872230ae2add7b145/master/pass/Los-Cabos-cover.jpg',
      name: 'Los Cabos',
      objectPosition: 'center center'
    },
    {
      src: 'https://www.turimexico.com/wp-content/uploads/2015/07/Huatulco.jpg',
      name: 'Huatulco',
      objectPosition: 'center top'
    }
  ]

  const [index, setIndex] = useState(0)

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex)
  }

  return (
    <Carousel className='carousel-top' activeIndex={index} onSelect={handleSelect} interval={3500}>
      {images.map((image, index) => (
        <Carousel.Item key={`carousel-item-${index}`}>
          <ImageCarouselItem key={`carousel-item-image-${index}`} image={image} />
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default ImagesCarousel
