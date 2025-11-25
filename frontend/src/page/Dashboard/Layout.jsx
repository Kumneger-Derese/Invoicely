import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'

const Layout = () => {
  return (
    <section className='flex '>
      <div className='w-56 bg-lime-500 rounded-xl h-screen mx-4 p-4'>
        <Sidebar />
      </div>
      <div className='flex flex-col gap-y-8 w-full max-h-screen '>
        <div className='h-12 bg-lime-600 rounded-xl p-4'>
          <Header />
        </div>

        <div className='flex-1 bg-neutral-700 rounded-xl p-4'>
          <Outlet />
        </div>
      </div>
    </section>
  )
}
export default Layout
