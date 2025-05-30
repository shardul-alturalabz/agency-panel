import { create } from 'zustand'

type MenuState = {
  index: number
  setIndex: (msg: number) => void
}

export const useMenuStore = create<MenuState>((set) => ({
  index: -1,
  setIndex: (msg) => set({ index: msg }),
}))
