import { Toaster } from 'react-hot-toast'
import { Outlet } from 'react-router-dom'

const App = () => {
  return (
    <main>
      <Toaster position='top-right' />
      <Outlet />
    </main>
  )
}
export default App
