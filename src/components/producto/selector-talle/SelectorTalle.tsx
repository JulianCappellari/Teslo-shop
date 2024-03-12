import { Talle } from "@/interfaces"
import clsx from "clsx"


interface Props {
    talleSeleccionado?: Talle
    talleDisponible: Talle[]

    cargarTalleSeleccionado: (talle: Talle) => void
}

export const SelectorTalle = ({talleDisponible, talleSeleccionado, cargarTalleSeleccionado}:Props) => {
  return (
    <div className="my-5 ">
      <h3 className="font-bold mb-4">Talles Disponibles</h3>
      <div className="flex">
        {
            talleDisponible.map( talle => (
                <button key={talle} onClick={() => cargarTalleSeleccionado(talle)} className={

                    clsx(
                        "mx-2 hover:underline text-lg",
                        {
                            // Para cuando se selecciona una talla
                            "underline" : talle === talleSeleccionado
                        }
                    )
                }>{talle}</button>
            ))
        }
      </div>
    </div>
  )
}

 
