import { Link } from 'react-router-dom'
import { useAuth } from '../store/useAuthStore'

const Navbar = () => {
    const { userInfo } = useAuth()

    return (
        <div className='flex justify-between bg-neutral-700 rounded-md p-3 w-full mb-4'>
            <h1 className='text-transparent bg-linear-30 text-xl from-lime-400 via-lime-600 to-lime-400  bg-clip-text font-black'>Invoicely</h1>

            {userInfo &&
                <div className='flex gap-3 px-4 items-center text-neutral-300'>
                    <Link to={'/invoices'}>Invoices</Link>
                    <Link to={'/items'}>Items</Link>
                    <Link to={'/clients'}>Clients</Link>
                    <Link to={'/profile'}>Profile</Link>
                    <Link to={'/settings'}>Settings</Link>
                </div>
            }

            {
                !userInfo &&
                <div className='flex gap-3 px-4 items-center text-neutral-300'>
                    <Link to={'/login'}>Login</Link>
                    <Link to={'/register'}>Register</Link>
                </div>
            }

        </div>
    )
}

export default Navbar