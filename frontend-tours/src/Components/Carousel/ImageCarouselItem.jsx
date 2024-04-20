import './ImagesCarousel.scss'

const ImageCarouselItem = ({ image }) => {
  return (
    <div>
      <img
        className='carousel-item-img'
        src={image.src}
        alt='Imagen'
        style={{
          objectPosition: image.objectPosition
        }}
      />
      <p className='carousel-image-title'>{image.name}</p>
    </div>
  )
}

export default ImageCarouselItem
