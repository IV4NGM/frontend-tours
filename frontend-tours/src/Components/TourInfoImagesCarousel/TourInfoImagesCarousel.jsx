import { PhotoProvider, PhotoView } from 'react-photo-view'
import 'react-photo-view/dist/react-photo-view.css'
import './TourInfoImage.scss'

const TourInfoImagesCarousel = ({ images, name }) => {
  return (
    <PhotoProvider>
      <div className='photos-container'>
        {images.map((image, index) => {
          return (
            <PhotoView src={image} key={`photo-view-${name}-${index}`}>
              <img src={image} alt={name} className='photo-to-view' />
            </PhotoView>
          )
        })}
      </div>

    </PhotoProvider>
  )
}

export default TourInfoImagesCarousel
