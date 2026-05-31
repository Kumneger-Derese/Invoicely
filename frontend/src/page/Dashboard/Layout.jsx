import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'

const Layout = () => {
  return (
    < section className='flex py-2 gap-x-2 bg-neutral-700 min-h-screen'>
      {/* sidebar */}
      <div className='w-64 bg-lime-500 rounded-lg h-[95vh] ml-2 p-4'>
        <Sidebar />
      </div>

      {/* Header */}
      <div className='flex flex-col gap-y-2 w-full mr-2 max-h-screen '>
        <div className='bg-neutral-600 text-lime-100 border border-neutral-700 rounded-lg p-4'>
          <Header />
        </div>

        {/* Outlet | children */}
        <div className='flex-1 p-4 bg-neutral-700 rounded-xl'>
          <Outlet />
        </div>
      </div>
    </section>
  )
}
export default Layout
