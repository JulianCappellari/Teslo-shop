export interface Producto {
    id: string;
    descripcion: string;
    imagenes: string[];
    enStock: number;
    precio: number;
    talles: Talle[];
    slug: string;
    etiquetas: string[];
    titulo: string;
    //todo: type: Type;
    genero: Categoria
}

// Es los datos que necesito en el carrito
export interface ProductoDelCarrito {
    id: string
    slug: string
    titulo: string
    precio: number
    cantidad: number
    talle: Talle
    imagen: string
}

export interface ImagenProducto {
    id: number;
    url: string;
    productoId: string;
}

type Categoria = 'hombre'|'mujeres'|'kid'|'unisex'
export type Talle = 'XS'|'S'|'M'|'L'|'XL'|'XXL'|'XXXL';
export type Type = 'shirts'|'pants'|'hoodies'|'hats';
