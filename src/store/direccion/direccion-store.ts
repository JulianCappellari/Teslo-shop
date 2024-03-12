import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  direccion: {
    nombre: string;
    apellido: string;
    direccion: string;
    direccion2?: string;
    codigoPostal: string;
    ciudad: string;
    pais: string;
    telefono: string;
  };

  // Metodos
  setDireccion: (direccion: State['direccion']) => void
}

export const useDireccionStore = create<State>()(
  persist(
    (set, get) => ({
      direccion: {
        nombre: "",
        apellido: "",
        direccion: "",
        direccion2: "",
        codigoPostal: "",
        ciudad: "",
        pais: "",
        telefono: "",
      },

      setDireccion: (direccion) => {
        set({direccion})
      },
    }),
    {
      name: "direccion-store",
    }
  )
);
