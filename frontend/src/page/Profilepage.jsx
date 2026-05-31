import { useState } from "react";
import { useAuth } from "../store/useAuthStore";
import { useUpdateProfile } from "../hooks/useUserApi";
import BackButton from "../components/BackButton";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { logout, userInfo } = useAuth();

  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    username: userInfo?.username,
    email: userInfo?.email,
    password: "",
  });

  const updateProfileMutation = useUpdateProfile();
  const name = userInfo.username.split(" ");
  const profileName = name?.map((n) => n.at(0).toUpperCase());

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    updateProfileMutation.mutate(userData);
  };

  return (
    <div className="p-8 grid grid-cols-1 sm:grid-cols-2 min-h-screen">
      {/* Left Section Wrapper */}
      <div className="py-4">
        <section className="flex flex-col items-center text-center relative">
          <BackButton
            className={"absolute top-8 left-2"}
            onClick={() => navigate("/invoices")}
          />
          <div
            className="mb-1 text-5xl text-lime-500 font-semibold flex justify-center items-center 
          size-12 rounded-full border-2 border-lime-300 p-12"
          >
            {profileName}
          </div>

          <div className="flex flex-col gap-2 py-4">
            <p className="text-neutral-500">
              <span className="font-medium text-neutral-50">Name: </span>{" "}
              {userInfo.username}
            </p>
            <p className="text-neutral-500">
              <span className="font-medium text-neutral-50">Email:</span>{" "}
              {userInfo.email}
            </p>
          </div>
        </section>

        {/* Update profile form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col border gap-2 border-neutral-500 rounded-md p-4 m-4"
        >
          <h1 className="text-xl font-bold text-lime-300 mb-4">
            Update Profile
          </h1>
          {/* Username field */}
          <div className="flex flex-col gap-1">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={userData.username}
              onChange={handleChange}
              placeholder="Username here..."
              className="border outline-none focus:border-lime-300 w-full border-neutral-600 rounded-md p-2"
            />
          </div>

          {/* Email field */}
          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              placeholder="Email here..."
              className="border outline-none focus:border-lime-300 w-full border-neutral-600 rounded-md p-2"
            />
          </div>

          {/* password field */}
          <div className="flex flex-col gap-1">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              placeholder="Password here..."
              className="border outline-none focus:border-lime-300 w-full border-neutral-600 rounded-md p-2"
            />
          </div>

          {/* Action Button */}
          <div className="flex gap-x-6 items-center mt-4">
            <button
              type="submit"
              className="py-2.5 rounded-xl font-semibold w-fit px-8 bg-lime-600 hover:bg-lime-800"
            >
              {updateProfileMutation.isPending ? "Processing..." : "Update"}
            </button>

            <button
              onClick={logout}
              className="px-8 shadow-2xs shadow-red-500 py-2.5 rounded-md bg-red-600 hover:bg-red-500 text-white"
            >
              Logout
            </button>
          </div>
        </form>
      </div>

      {/* Right Section Wrapper */}
      <div className="flex flex-col gap-2 w-full items-center justify-center bg-lime-600/20 rounded-xl">
        <h1 className="text-3xl font-bold text-lime-400">Edit Profile</h1>
      </div>
    </div>
  );
};
export default ProfilePage;
