import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';
//import { io } from "socket.io-client";


export const useAuthStore = create((set, get) => ({
    authUser: null,
    isCheckingAuth: true,
    isSigningUp: false,
    isLoggingIn: false,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get('/auth/check');
            set({ authUser: res.data });
        } catch (error) {
            console.error("Error checking auth:", error);
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post('/auth/signup', data);
            set({ authUser: res.data });

            toast.success("Signup successful!");

        } catch (error) {
            toast.error(error.response.data.message || "Signup failed.");
        } finally {
            set({ isSigningUp: false });
        }
    },

        login: async (data) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post('/auth/login', data);
            set({ authUser: res.data });

            toast.success("Login successful!");

        } catch (error) {
            toast.error(error.response.data.message || "Login failed.");
        } finally {
            set({ isSigningUp: false });
        }
    },

    logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
      get().disconnectSocket();
    } catch (error) {
      toast.error("Error logging out");
      console.log("Logout error:", error);
    }
  },
}));