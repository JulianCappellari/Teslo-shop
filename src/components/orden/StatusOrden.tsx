import clsx from "clsx";
import { IoCardOutline } from "react-icons/io5";

interface Props {
    estaPagada: boolean
}

export const StatusOrden = ({estaPagada}:Props) => {
  return (
    <div>
      <div
        className={clsx(
          "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
          {
            "bg-red-500": !estaPagada,
            "bg-green-500": estaPagada,
          }
        )}
      >
        <IoCardOutline size={30} />
        <span className="mx-2">
          {estaPagada ? "Pagada" : "No pagada"}
        </span>
      </div>
    </div>
  );
};

 
