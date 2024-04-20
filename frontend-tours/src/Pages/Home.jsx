import ImagesCarousel from '@/Components/Carousel/ImagesCarousel'
import OurInfoCard from '@/Components/OurInfoCard/OurInfoCard'
import '@/Styles/Home.scss'

const Home = () => {
  return (
    <div className='page-container'>
      <h2>¡Descubre nuestros destinos más famosos!</h2>
      <ImagesCarousel />
      <h2 className='space-up-lg'>Planea tu siguiente aventura con los mejores precios</h2>
      <OurInfoCard />
      <h2 className='space-up-lg'>Consulta nuestros tours</h2>
    </div>
  )
}

export default Home
