import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div className='container mx-auto p-4'>
      <h1> Hello, World!</h1>
      <Link to='/register' className='text-blue-500 underline'>
        Go to Register Page
      </Link>
    </div>
  )
}
export default HomePage
