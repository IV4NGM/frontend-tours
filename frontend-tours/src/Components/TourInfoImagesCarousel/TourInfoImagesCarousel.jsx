import React, { useRef } from 'react'
import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'
import './TourInfoImage.scss'

const TourInfoImagesCarousel = ({ images }) => {
  const imageGalleryRef = useRef(null)

  const toggleFullScreen = () => {
    imageGalleryRef.current.toggleFullScreen()
  }

  return (
    <div>
      <ImageGallery
        items={images.map(image => ({ original: image, thumbnail: image, originalAlt: `Slide ${images.indexOf(image) + 1}` }))}
        showPlayButton={false}
        ref={imageGalleryRef}
        onClick={toggleFullScreen}
        autoPlay
      />
    </div>

  )
}

export default TourInfoImagesCarousel
