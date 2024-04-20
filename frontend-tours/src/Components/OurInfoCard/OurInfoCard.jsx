import { TypeAnimation } from 'react-type-animation'
import CountUp from 'react-countup'
import './OurInfoCard.scss'
import logo from '@/assets/logo.png'

import { MdCake } from 'react-icons/md'
import { GiCommercialAirplane } from 'react-icons/gi'
import { VscVerified } from 'react-icons/vsc'

const OurInfoCard = () => {
  return (
    <>
      <div className='our-info-card'>
        <div className='our-info-row'>
          <p className='our-info-row-number'>25</p>
          <p>años de experiencia</p>
          <MdCake style={{ width: 40, height: 40, marginLeft: 15 }} />
        </div>
        <div className='our-info-row'>
          <p className='our-info-row-plus'>+</p>
          <p className='our-info-row-number'>
            <CountUp
              start={0}
              end={50}
              duration={3}
              enableScrollSpy
            >
              {({ countUpRef }) => <span ref={countUpRef} />}
            </CountUp>
          </p>
          <p>destinos</p>
          <GiCommercialAirplane style={{ width: 40, height: 40, marginLeft: 15 }} />
        </div>
        <div className='our-info-row'>
          <p>Registrados ante SECTUR</p>
          <VscVerified style={{ width: 40, height: 40, marginLeft: 15 }} />
        </div>

      </div>

      <div className='two-content space-up-lg'>
        <div className='our-info-logo-container'>
          <img src={logo} alt='Explorers Tours Logo' className='our-info-logo' />
          <h3>Explorers Tours</h3>
        </div>
        <p className='our-info-animation-container'>
          <TypeAnimation
            preRenderFirstString
            sequence={[
              'Viaja con tranquilidad',
              1500,
              'Viaja con comodidad',
              1500,
              'Viaja con Explorers Tours',
              2500
            ]}
            speed={50}
            style={{ fontSize: '2em' }}
            repeat={Infinity}
          />
        </p>
      </div>
    </>

  )
}

export default OurInfoCard
