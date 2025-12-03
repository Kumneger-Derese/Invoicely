import { useAuth } from "../store/useAuthStore"

const ProfilePage = () => {
  const { logout, userInfo } = useAuth()

  return (<div className="p-8">
    <h1>ProfilePage</h1>

    <div className="flex flex-col gap-2 py-4">
      <p> Name: {userInfo.username}</p>
      <p> Email: {userInfo.email}</p>
    </div>

    <button
      onClick={logout}
      className="px-4 shadow-2xl shadow-red-500 py-2 rounded-md bg-red-600 hover:bg-red-500 text-white">
      Logout
    </button>
  </div>)
}
export default ProfilePage
