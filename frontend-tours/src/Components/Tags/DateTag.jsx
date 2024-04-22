import './DateTag.scss'
import formatTourDate from '@/Utils/formatTourDate'

const DateTag = ({ date, duration }) => {
  const formattedDate = formatTourDate(date, duration)

  return (
    <div className='date-tag-container'>
      <p>{formattedDate}</p>
    </div>
  )
}

export default DateTag
