import {Link} from "react-router-dom";
import TextBox from "../../components/Text.jsx";
import {useAuth} from "../../store/useAuthStore.js";
import {useRef} from "react";
import {useGSAP} from "../../utils/gsap.js"
import {heroAnimation} from "../../animation/hero.js";
import {LuArrowUpRight} from "react-icons/lu";

const Hero = () => {
    const {userInfo} = useAuth()
    const heroTextRef = useRef(null)

    useGSAP(() => {
        return heroAnimation(heroTextRef)
        }, {
            scope: heroTextRef
        })

    return (
        <div className={'h-screen flex gap-4'}>
            {/*Left Side*/}
            <div className={'flex-1/2 flex flex-col gap-8'}>
                <h1 ref={heroTextRef} className={'line-mask overflow-hidden text-6xl font-bold text-lime-200 mt-16'}>
                    Create and send <TextBox color={'lime'}>invoices</TextBox> on the <br/> fly
                    with <TextBox className={'text-lime-500'}>ease</TextBox>.
                </h1>
                <p className={'text-neutral-400'}>
                    This awesome app made possible to make and share invoices very simple and achievable.
                    Use it and regret not to using it.
                </p>

                <Link
                    to={userInfo ? 'dashboard' : '/login'}
                    className={'px-4 py-2 w-fit flex items-center gap-x-2 rounded-md bg-lime-400 hover:bg-lime-700 transition duration-300 font-semibold text-neutral-900 hover:text-neutral-50'}
                >
                    Get Started
                    <LuArrowUpRight strokeWidth={2} size={20}/>
                </Link>
            </div>

            {/*Right Side*/}
            <div className={'flex-1/2 -mt-[10%] flex flex-col relative gap-2 w-full items-center justify-center'}>
                <div className={'box rotate-0 size-32 bg-lime-200 border-8 border-lime-400 rounded-full'}/>
                <div className={'box rotate-90 size-32 bg-yellow-200 border-8 border-yellow-400 rounded-full'}/>
                <div className={'box rotate-270 size-32 absolute top-[30%] left-28 bg-rose-200 border-8 border-rose-400 rounded-full'}/>
                <div className={'box rotate-360 size-32 absolute top-[50%] left-28 bg-blue-200 border-8 border-blue-400 rounded-full'}/>

            </div>
        </div>
    );
};

export default Hero;