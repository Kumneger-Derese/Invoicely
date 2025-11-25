import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='flex flex-col gap-4 text-neutral-900'>
      <h1 className='text-2xl font-bold'>Invoicely</h1>

      <ul className='flex flex-col gap-2'>
        <Link to={'/dashboard'}>Feed</Link>
        <Link to={'/dashboard/recent'}>Recent</Link>
      </ul>
    </div>
  )
}
export default Sidebar
