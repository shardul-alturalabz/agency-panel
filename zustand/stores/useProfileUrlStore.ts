import { create } from 'zustand'

type URLState = {
  url: string | null
  setUrl: (msg: string) => void

  name: string | null
  setName: (name: string) => void
}

export const useProfileUrlStore = create<URLState>((set) => ({
  url: '',
  setUrl: (msg) => set({ url: msg }),

  name: '',
  setName: (name) => set({name:name})
}))
