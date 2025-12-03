import {
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from 'react-router-dom'
import App from '../App.jsx'
import Layout from '../page/Dashboard/Layout.jsx'
import ProfilePage from '../page/ProfilePage.jsx'
import InvoiceList from '../invoice/InvoiceList.jsx'
import HomePage from '../page/HomePage.jsx'
import RegisterPage from '../page/RegisterPage.jsx'
import RecentPage from '../page/Dashboard/RecentPage.jsx'
import FeedPage from '../page/Dashboard/FeedPage.jsx'
import LoginPage from '../page/LoginPage.jsx'
import ProtectedRoute from '../components/ProtectedRoute.jsx'
import CreateInvoice from '../invoice/CreateInvoice.jsx'
import ClientList from '../client/ClientList.jsx'
import CreateClient from '../client/CreateClient.jsx'
import EditInvoice from '../invoice/EditInvoice.jsx'
import EditClient from '../client/EditClient.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='' index={true} element={<HomePage />} />
      <Route path='register' element={<RegisterPage />} />
      <Route path='login' element={<LoginPage />} />

      <Route path='' element={<ProtectedRoute />}>
        <Route path='profile' element={<ProfilePage />} />

        <Route path='clients' element={<ClientList />} />
        <Route path='create-client' element={<CreateClient />} />
        <Route path='edit-client/:clientId' element={<EditClient />} />

        <Route path='invoices' element={<InvoiceList />} />
        <Route path='create-invoice' element={<CreateInvoice />} />
        <Route path='edit-invoice' element={<EditInvoice />} />

        <Route path='/dashboard' element={<Layout />}>
          <Route path='' index element={<FeedPage />} />
          <Route path='recent' index element={<RecentPage />} />
        </Route>
      </Route>

    </Route>
  )
)

export default router
