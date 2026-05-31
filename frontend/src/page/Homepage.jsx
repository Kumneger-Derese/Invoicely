import Navbar from '../components/Navbar'
import Hero from "./Landing/Hero.jsx";

const HomePage = () => {
    return (
        <div className='p-4'>
            <Navbar/>

            {/*List of Landing page section*/}
            <main className={'px-2'}>
                <Hero/>
            </main>
        </div>
    )
}
export default HomePage
