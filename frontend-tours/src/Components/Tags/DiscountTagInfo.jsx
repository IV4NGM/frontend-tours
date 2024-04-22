import './DiscountTagInfo.scss'
import tag from '@/assets/tag.png'

const DiscountTagInfo = ({ data }) => {
  let fontSize
  if (data === 'Especial') {
    fontSize = 12
  }

  return (
    <div className='info-tag-container'>
      <img src={tag} alt='Promo' />
      <span style={{ fontSize }}>{data}</span>
    </div>
  )
}

export default DiscountTagInfo
