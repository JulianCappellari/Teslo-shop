import { ProductoDelCarrito } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  carrito: ProductoDelCarrito[];

  getTotalItems: () => number;

  getSumaInformacion: () => {
    subTotal: number;
    impuestos: number;
    total: number;
    itemsEnElCarrito: number;
  };

  // Metodos para modificar el carrito de compra
  agregarProductoAlCarrito: (producto: ProductoDelCarrito) => void;
  actualizarCantidadDeProductos: (
    producto: ProductoDelCarrito,
    cantidad: number
  ) => void;
  eliminarProducto: (producto: ProductoDelCarrito) => void;

  limpiarCarrito: () => void;
}

// Store xon zustand
export const usarCarritoSore = create<State>()(
  persist(
    (set, get) => ({
      // el get permite tener el estado actual de zustand

      carrito: [],

      // Metodos

      getTotalItems: () => {
        const { carrito } = get();

        return carrito.reduce((total, item) => total + item.cantidad, 0);
      },

      getSumaInformacion: () => {
        const { carrito } = get();

        const subTotal = carrito.reduce(
          (subTotal, producto) =>
            producto.cantidad * producto.precio + subTotal,
          0
        );
        const impuestos = subTotal * 0.21;
        const total = subTotal + impuestos;
        const itemsEnElCarrito = carrito.reduce(
          (total, item) => total + item.cantidad,
          0
        );

        return {
          subTotal,
          impuestos,
          total,
          itemsEnElCarrito,
        };
      },

      agregarProductoAlCarrito: (producto: ProductoDelCarrito) => {
        const { carrito } = get(); // obtengo todos los productos de mi carrito de compras

        // Revisar si el producto exite con la talla especificada
        const productoEnELCarrito = carrito.some(
          (item) => item.id === producto.id && item.talle === producto.talle
        );

        if (!productoEnELCarrito) {
          // si no existe ese producto en el carrito, lo inserto
          set({ carrito: [...carrito, producto] });
          return;
        }

        // Se que el producto existe por talla, ahora debo incrementar la cantidad
        const aumentarProductoEnElCarrito = carrito.map((item) => {
          if (item.id === producto.id && item.talle === producto.talle) {
            return {
              ...item,
              cantidad: item.cantidad + producto.cantidad,
            };
          }
          return item;
        });

        set({ carrito: aumentarProductoEnElCarrito });
      },

      actualizarCantidadDeProductos: (
        producto: ProductoDelCarrito,
        cantidad: number
      ) => {
        const { carrito } = get();

        const actualizarProductosEnElCarrito = carrito.map((item) => {
          if (item.id === producto.id && item.talle === producto.talle) {
            return { ...item, cantidad: cantidad };
          }
          return item;
        });
        set({ carrito: actualizarProductosEnElCarrito });
      },
      eliminarProducto: (producto: ProductoDelCarrito) => {
        const { carrito } = get();
        const productoAEliminar = carrito.filter(
          (item) => item.id !== producto.id || item.talle !== producto.talle
        );

        set({ carrito: productoAEliminar });
      },

      limpiarCarrito: () => {
        set({ carrito: [] });
      },
    }),
    {
      name: "shopping-cart",
    }
  )
);
