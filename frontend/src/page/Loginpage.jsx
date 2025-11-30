import { useState, useEffect } from 'react'
import { useLoginUser } from '../hooks/useUserApi'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from "../store/useAuthStore.js";

export default function LoginPage() {
  const [userData, setUserData] = useState({
    email: '',
    password: ''
  })

  const { userInfo } = useAuth()

  const loginMutation = useLoginUser()
  const navigate = useNavigate()

  // Check user navigation
  useEffect(() => {
    if (userInfo) {
      navigate('/invoices')
    } else {
      navigate('/login')
    }

  }, [userInfo, navigate])


  // Handle form submission
  const handleSubmit = e => {
    e.preventDefault()

    const body = {
      email: userData.email,
      password: userData.password
    }

    loginMutation.mutate(body, {
      onSuccess: () => {
        navigate('/invoices')
      }
    })

    // Reset form
    setUserData({
      email: '',
      password: ''
    })
  }

  const handleChange = e => {
    const { name, value } = e.target

    setUserData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <section className='flex w-full gap-8 px-8 py-4 min-h-screen'>
      {/* Left Section */}
      <div className='flex flex-col gap-4 w-full justify-center'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
          {/* Email */}
          <div className='flex flex-col gap-y-1'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              required
              id='email'
              name='email'
              value={userData.email}
              onChange={handleChange}
              placeholder='johndoe@gmail.com'
              className=' w-5/6 p-2 rounded-xl border border-neutral-600 focus:border-lime-500 outline-none '
            />
          </div>

          {/* Password */}
          <div className='flex flex-col gap-y-1'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              name='password'
              value={userData.password}
              onChange={handleChange}
              placeholder='*******'
              className=' w-5/6 p-2 rounded-xl border border-neutral-600 focus:border-lime-500 outline-none '
            />
          </div>

          <button className='py-2.5 rounded-xl font-semibold w-fit px-8 mt-4 bg-lime-600 hover:bg-lime-800'>
            Sign in
          </button>

          <div className='flex gap-x-2 text-sm font-semibold'>
            <p>Don't have Account</p>
            <Link
              to={'/register'}
              className='text-blue-400 font-semibold'
            >
              Sign up
            </Link>
          </div>
        </form>
      </div>

      {/* Right Section */}
      <div className='flex flex-col gap-2 w-full items-center justify-center bg-lime-600/20 rounded-xl'>
        <h1 className='text-3xl font-bold text-lime-400'>Sign In</h1>
      </div>
    </section>
  )
}
