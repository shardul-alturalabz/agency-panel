import { create } from 'zustand'

type URLState = {
  url: string | null
  setUrl: (msg: string) => void
}

export const useProfileUrlStore = create<URLState>((set) => ({
  url: '',
  setUrl: (msg) => set({ url: msg }),
}))
