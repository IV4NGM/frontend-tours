import '@/Styles/About.scss'
import WhatsAppButton from '@/Components/WhatsAppButton/WhatsAppButton'

const About = () => {
  return (
    <div className='page-container'>
      <h2 className='bold-text space-down'>Sobre nosotros</h2>
      <div className='about-us-container'>
        <p>Somos una empresa dedicada al turismo con más de 25 años de experiencia.</p>
        <p>Contamos con registro ante SECTUR.</p>
        <p>Ofrecemos servicios de tours grupales y personalizados.</p>
      </div>
      <h3>¡Agenda una cita con nosotros o contáctanos!</h3>
      <WhatsAppButton text='Enviar mensaje' />
    </div>
  )
}

export default About
