// Importamos los datos de semilla desde el archivo "seed"
import { initialData } from "./seed";

// Importamos la instancia de Prisma desde la carpeta "lib"
import prisma from "../lib/prisma";
import { paises } from './seed-paises';

// Función principal asincrónica que maneja el proceso de semilla
async function main() {
  // Borramos todas las entradas existentes en las tablas relacionadas, pero hayq ue tener ojo con el orden porque puede generar problemas
  await prisma.direccionDeLaOrden.deleteMany()
  await prisma.itemsDeLaOrden.deleteMany()
  await prisma.orden.deleteMany()

  await prisma.direccionUsuario.deleteMany()
  await prisma.usuario.deleteMany()
  await prisma.pais.deleteMany()

  await prisma.imagenProducto.deleteMany(); // Elimina todas las imágenes de productos
  await prisma.producto.deleteMany(); // Elimina todos los productos
  await prisma.categoria.deleteMany(); // Elimina todas las categorías

  // Extraemos las categorías y productos del objeto initialData
  const { categorias, productos,usuarios } = initialData;

  await prisma.usuario.createMany({
    data: usuarios
  })
  
  await prisma.pais.createMany({
    data: paises
  })
  
  // Insertamos las categorías en la base de datos
  const categoriasData = categorias.map((categoria) => ({
    nombre: categoria,
  }));

  await prisma.categoria.createMany({
    data: categoriasData,
  });


  // Buscamos las categorías de la base de datos y las mapeamos a un objeto para facilitar la búsqueda
  const categoriasDB = await prisma.categoria.findMany();
  const categoriasMap = categoriasDB.reduce((map, categoria) => {
    map[categoria.nombre.toLowerCase()] = categoria.id;
    return map;
  }, {} as Record<string, string>);

  // Insertamos los productos en la base de datos
  productos.forEach(async (producto) => {
    const { type, imagenes, ...rest } = producto;

    const productoDB = await prisma.producto.create({
      data: {
        categoriaId: categoriasMap[type], // Asociamos el ID de la categoría al producto
        ...rest, // Insertamos el resto de los datos del producto
      },
    });

    // Insertamos las imágenes asociadas con el producto
    const imagenesData = imagenes.map((imagen) => ({
      url: imagen,
      productoId: productoDB.id, // Asociamos el ID del producto a cada imagen
    }));
    await prisma.imagenProducto.createMany({
      data: imagenesData,
    });
  });

  console.log("Seed ejecutado correctamente");
}

// Ejecutamos la función principal
(() => {
  main();
})();


// Instruccion: npm i -D ts-node
// Creo el script en package.json
// "seed" : " ts-node src/seed/seed-databse.ts"

// Para crear un nuevo tsconfig
// me muevo a la carpeta seed y luego npx tsc --init

// npm run seed para hacer la semilla
