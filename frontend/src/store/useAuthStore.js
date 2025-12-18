import { create } from 'zustand';

export const useAuthStore = create((set, get) => ({
    authUser: { name: "john_doe", id: "12345", age: 30 },
    isLoading: false,

    login: () => {
        console.log("Logging in...");
    }
}));