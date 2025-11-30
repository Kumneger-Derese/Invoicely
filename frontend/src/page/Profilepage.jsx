import { useAuth } from "../store/useAuthStore"

const ProfilePage = () => {
  const { logout } = useAuth()

  return (<div className="p-8">
    <h1>ProfilePage</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint eos sed maxime neque, expedita suscipit consectetur provident labore. Itaque veritatis adipisci facere magni facilis! Eius aperiam tempora quisquam repudiandae eos.</p>

    <button onClick={logout} className="px-4 py-2 rounded-md bg-red-600 text-white">Logout</button>
  </div>)
}
export default ProfilePage
