import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

const HomePage = () => {
  return (
    <div className='p-4'>
      <Navbar />

      <Link to='/register' className=''>
        Welcome to invoicely
      </Link>
    </div>
  )
}
export default HomePage
