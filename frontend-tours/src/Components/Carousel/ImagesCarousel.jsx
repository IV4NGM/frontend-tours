import './ImagesCarousel.scss'
import Carousel from 'react-bootstrap/Carousel'
import { useState } from 'react'
import ImageCarouselItem from './ImageCarouselItem'
import carouselData from '@/app/carouselData.json'

const ImagesCarousel = () => {
  const images = carouselData.images

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
