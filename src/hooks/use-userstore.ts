import {create} from 'zustand';

interface UserStore {
  isGuest: boolean;
  user: any;
  setIsGuest: (isGuest: boolean) => void;
  setUser: (user: any) => void;
}

const useUserStore = create<UserStore>((set) => ({
  isGuest: false,
  user: null,
  setIsGuest: (isGuest:boolean) => set({ isGuest }),
  setUser: (user:any) => set({ user }),
}));

export default useUserStore;