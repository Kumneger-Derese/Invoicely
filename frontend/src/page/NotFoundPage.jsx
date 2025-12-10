import { Link, useLocation } from 'react-router-dom'

const NotFound = () => {
    const { pathname } = useLocation()

    return (
        <div className='min-h-screen flex flex-col gap-2 items-center justify-center'>
            <h1 className='text-3xl font-bold bg-clip-text text-transparent bg-linear-210 from-neutral-400 to-neutral-600'>
                This page ({pathname}) not found.</h1>
            <Link to={'/'} className='text-blue-400 underline'>Go To Home</Link>
        </div>
    )
}

export default NotFound