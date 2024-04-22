import { FaWhatsapp } from 'react-icons/fa6'
import './WhatsAppButton.scss'

const WhatsAppButton = ({ text = '¡Contáctanos!' }) => {
  return (
    <button className='btn-contact-us'><FaWhatsapp /> {text}</button>
  )
}

export default WhatsAppButton
