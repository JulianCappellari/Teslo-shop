import { create } from 'zustand'

interface State {
    menuLateralAbierto: boolean

    openMenuLateral: () => void
    closeMenuLateral: () => void
} 

export const useUIStore = create<State>()((set) => ({
  menuLateralAbierto: false,
  openMenuLateral: () => set({ menuLateralAbierto: true}),
  closeMenuLateral: () => set({ menuLateralAbierto: false})
}))