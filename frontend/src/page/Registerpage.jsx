import { useState } from 'react'
import { useRegisterUser } from '../hooks/useUserApi'
import { Link, useNavigate } from 'react-router-dom'

export default function RegisterPage () {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: ''
  })

  const registerMutation = useRegisterUser()
  const navigate = useNavigate()

  // Handle form submission
  const handleSubmit = e => {
    e.preventDefault()

    const body = {
      username: userData.username,
      email: userData.email,
      password: userData.password
    }

    registerMutation.mutate(body, {
      onSuccess: () => {
        navigate('/invoices')
      }
    })
  }

  const handleChange = e => {
    const { name, value } = e.target

    setUserData(prev => ({
      ...prev,
      [name]: value
    }))

    // Reset form
    setUserData({
      email: '',
      password: '',
      username: ''
    })
  }

  return (
    <section className='flex w-full gap-8 px-8 py-4 min-h-screen'>
      {/* Left Section */}
      <div className='flex flex-col gap-2 w-full items-center justify-center bg-lime-600/20 rounded-xl'>
        <h1 className='text-3xl font-bold text-lime-400'>Sign Up</h1>
      </div>

      {/* Right Section */}
      <div className='flex flex-col gap-4 w-full justify-center'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
          {/* Username */}
          <div className='flex flex-col gap-y-1'>
            <label htmlFor='username'>Username</label>
            <input
              type='text'
              name='username'
              value={userData.username}
              onChange={handleChange}
              placeholder='John Doe'
              className=' w-5/6 p-2 rounded-xl border border-neutral-600 focus:border-lime-500 outline-none '
            />
          </div>

          {/* Username */}
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

          {/* Username */}
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
            Sign up
          </button>

          <div className='flex gap-x-2'>
            <p>Already have Account</p>
            <Link
              to={'/login'}
              className='text-blue-400 underline font-semibold'
            >
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </section>
  )
}
