import { create } from "zustand";

const useAuthStore = create((set) => {
  return {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,

    setCredential: (data) => {
      localStorage.setItem("userInfo", JSON.stringify(data));
      set({ userInfo: data });
    },
    logout: () => {
      localStorage.removeItem("userInfo");
      set({ userInfo: null });
    },
  };
});

export const useAuth = () => {
  const { userInfo, setCredential, logout } = useAuthStore();

  return { userInfo, setCredential, logout };
};
