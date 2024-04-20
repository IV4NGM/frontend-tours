import { TypeAnimation } from 'react-type-animation'
import CountUp from 'react-countup'
import ImagesCarousel from '@/Components/Carousel/ImagesCarousel'

const Home = () => {
  return (
    <div className='page-container'>
      {/* <h1>Aventura infinita</h1> */}
      <ImagesCarousel />

      <h2>Encuentra viajes con los mejores precios</h2>
      <p>+<CountUp start={0} end={50} duration={3} /> destinos</p>
      <TypeAnimation
        preRenderFirstString
        sequence={[
          'Viaja cómodo',
          1000,
          'Viaja tranquilo',
          1000,
          'Viaja feliz',
          1000
        ]}
        speed={50}
        style={{ fontSize: '2em' }}
        repeat={Infinity}
      />
    </div>
  )
}

export default Home
