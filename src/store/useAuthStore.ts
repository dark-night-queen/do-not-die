import { create } from "zustand";

interface AuthState {
  showLoader: {
    login: boolean;
    signup: boolean;
    "forget-password"?: boolean;
  };
  setShowLoader: (type: "login" | "signup" | "forget-password", value: boolean) => void;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  showLoader: {
    login: false,
    signup: false,
    "forget-password": false,
  },
  setShowLoader: (type, value) => {
    set((state) => ({
      showLoader: {
        ...state.showLoader,
        [type]: value,
      },
    }));
  },
  isAuthenticated: false,
  login: () => set({ isAuthenticated: true }),
  logout: () => set({ isAuthenticated: false }),
  checkAuth: () => {
    const token = null; // e.g. AsyncStorage.getItem("token")
    set({ isAuthenticated: !!token });
  },
}));
