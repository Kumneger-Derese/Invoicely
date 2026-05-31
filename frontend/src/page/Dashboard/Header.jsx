import {LuCirclePlus} from "react-icons/lu"
import {Link} from "react-router-dom";
import {useAuth} from "../../store/useAuthStore.js";
import {HiUser} from "react-icons/hi2";

const Header = () => {
  const {userInfo} = useAuth()

  return <div className="flex justify-between">
    <h1 className={'flex items-center gap-x-1'}>
      <HiUser className={'text-lime-200'} size={20}/>
    <span className={'text-neutral-400'}>{userInfo.username}</span>
    </h1>

    <Link to={'/create-invoice'}>
      <LuCirclePlus strokeWidth={2.1} size={24} />
    </Link>
  </div>
}
export default Header
