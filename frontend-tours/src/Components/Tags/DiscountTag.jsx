import tag from '@/assets/tag.png'
import './DiscountTag.scss'

const DiscountTag = ({ data }) => {
  return (
    <div className='tag-container'>
      <img src={tag} alt='Promo' />
      <span>{data}</span>
    </div>
  )
}

export default DiscountTag
