import { useSelector } from 'react-redux'
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined'
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle'

const Info = ({ show = false }) => {
  const { user } = useSelector((state) => state.auth)

  if (!show) return <></>
  return (
    <>
      <h4>Mi información</h4>
      <div className='personal-info-container'>
        <p><AccountBoxOutlinedIcon sx={{ width: 30, height: 30, marginInlineEnd: 1 }} /> {user?.name}</p>
        <p><EmailOutlinedIcon sx={{ width: 30, height: 30, marginInlineEnd: 1 }} /> {user?.email}</p>
        {(user?.isManager) && <p><SupervisedUserCircleIcon sx={{ width: 30, height: 30, marginInlineEnd: 1 }} /> Manager</p>}
        {(user?.isAdmin && !user?.isManager) && <p><VerifiedUserOutlinedIcon sx={{ width: 30, height: 30, marginInlineEnd: 1 }} /> Administrador</p>}
      </div>
    </>
  )
}

export default Info
