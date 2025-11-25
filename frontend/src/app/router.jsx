import {
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from 'react-router-dom'
import App from '../App.jsx'
import Registerpage from '../page/Registerpage.jsx'
import Homepage from '../page/Homepage.jsx'
import Loginpage from '../page/Loginpage.jsx'
import Layout from '../page/Dashboard/Layout.jsx'
import Feedpage from '../page/Dashboard/Feedpage.jsx'
import Profilepage from '../page/Profilepage.jsx'
import Recentpage from '../page/Dashboard/Recentpage.jsx'
import InvoiceList from '../invoice/InvoiceList.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='' index={true} element={<Homepage />} />
      <Route path='register' element={<Registerpage />} />
      <Route path='login' element={<Loginpage />} />
      <Route path='profile' element={<Profilepage />} />

      <Route path='invoices' element={<InvoiceList />} />

      <Route path='/dashboard' element={<Layout />}>
        <Route path='' index element={<Feedpage />} />
        <Route path='recent' index element={<Recentpage />} />
      </Route>
    </Route>
  )
)

export default router
