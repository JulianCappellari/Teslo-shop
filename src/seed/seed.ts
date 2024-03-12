import bycriptjs from 'bcryptjs'

interface SeedProduct {
    descripcion: string;
    imagenes: string[];
    enStock: number;
    precio: number;
    talles: ValidarTalles[];
    slug: string;
    etiquetas: string[];
    titulo: string;
    type: ValidTypes;
    genero: 'hombre'|'mujeres'|'kid'|'unisex'
}

interface SeedUsuario {
    email: string
    password: string
    nombre: string
    rol: 'admin' | 'usuario'
}

type ValidarTalles = 'XS'|'S'|'M'|'L'|'XL'|'XXL'|'XXXL';
type ValidTypes = 'remeras'|'pantalones'|'buzo'|'sombrero';

interface SeedData {
    usuarios: SeedUsuario[],
    categorias: string[],
    productos: SeedProduct[],
}




export const initialData: SeedData = {
    usuarios: [
        {
            email: 'prueba@google.com',
            nombre: 'Julian cappellari',
            password: bycriptjs.hashSync('123456',10) ,
            rol: 'admin'
        },
        {
            email: 'testing@google.com',
            nombre: 'Ignacio',
            password: bycriptjs.hashSync('123456',10) ,
            rol: 'usuario'
        }
    ],
    categorias: [
        'Remeras','Pantalones','Buzo','Sombrero'
    ],
    productos: [
        {
            descripcion: "Introducing the Tesla Chill Collection. The hombre’s Chill Crew Neck Sweatshirt has a premium, heavyweight exterior and soft fleece interior for comfort in any season. The sweatshirt features a subtle thermoplastic polyurethane T logo on the chest and a Tesla wordmark below the back collar. Made from 60% cotton and 40% recycled polyester.",
            imagenes: [
                '1740176-00-A_0_2000.jpg',
                '1740176-00-A_1.jpg',
            ],
            enStock: 7,
            precio: 75,
            talles: ['XS','S','M','L','XL','XXL'],
            slug: "hombres_chill_crew_neck_sweatshirt",
            type: 'remeras',
            etiquetas: ['sweatshirt'],
            titulo: "hombre’s Chill Crew Neck Sweatshirt",
            genero: 'hombre'
        },
        {
            descripcion: "The hombre's Quilted Shirt Jacket features a uniquely fit, quilted design for warmth and mobility in cold weather seasons. With an overall street-smart aesthetic, the jacket features subtle silicone injected Tesla logos below the back collar and on the right sleeve, as well as custom matte metal zipper pulls. Made from 87% nylon and 13% polyurethane.",
            imagenes: [
                '1740507-00-A_0_2000.jpg',
                '1740507-00-A_1.jpg',
            ],
            enStock: 5,
            precio: 200,
            talles: ['XS','S','M','XL','XXL'],
            slug: "hombre_quilted_shirt_jacket",
            type: 'remeras',
            etiquetas: ['jacket'],
            titulo: "hombre's Quilted Shirt Jacket",
            genero: 'hombre'
        },
        
        {
            descripcion: "Introducing the Tesla Raven Collection. The hombre's Raven Lightweight Zip Up Bomber has a premium, modern silhouette made from a sustainable bamboo cotton blend for versatility in any season. The hoodie features subtle thermoplastic polyurethane Tesla logos on the left chest and below the back collar, a concealed chest pocket with custom matte zipper pulls and a french terry interior. Made from 70% bamboo and 30% cotton.",
            imagenes: [
                '1740250-00-A_0_2000.jpg',
                '1740250-00-A_1.jpg'
            ],
            enStock: 10,
            precio: 130,
            talles: ['S','M','L','XL','XXL'],
            slug: "hombre_raven_lightweight_zip_up_bomber_jacket",
            type: 'remeras',
            etiquetas: ['shirt'],
            titulo: "hombre's Raven Lightweight Zip Up Bomber Jacket",
            genero: 'hombre'
        },

        {
            descripcion: "Introducing the Tesla Turbine Collection. Designed for style, comfort and everyday lifestyle, the hombre's Turbine Long Sleeve Tee features a subtle, water-based T logo on the left chest and our Tesla wordmark below the back collar. The lightweight material is double-dyed, creating a soft, casual style for ideal wear in any season. Made from 50% cotton and 50% polyester.",
            imagenes: [
                '1740280-00-A_0_2000.jpg',
                '1740280-00-A_1.jpg',
            ],
            enStock: 50,
            precio: 45,
            talles: ['XS','S','M','L'],
            slug: "hombre_turbine_long_sleeve_tee",
            type: 'remeras',
            etiquetas: ['shirt'],
            titulo: "hombre's Turbine Long Sleeve Tee",
            genero: 'hombre'
        },
        {
            descripcion: "Introducing the Tesla Turbine Collection. Designed for style, comfort and everyday lifestyle, the hombre's Turbine Short Sleeve Tee features a subtle, water-based Tesla wordmark across the chest and our T logo below the back collar. The lightweight material is double-dyed, creating a soft, casual style for ideal wear in any season. Made from 50% cotton and 50% polyester.",
            imagenes: [
                '1741416-00-A_0_2000.jpg',
                '1741416-00-A_1.jpg',
            ],
            enStock: 50,
            precio: 40,
            talles: ['M','L','XL','XXL'],
            slug: "hombre_turbine_short_sleeve_tee",
            type: 'remeras',
            etiquetas: ['shirt'],
            titulo: "hombre's Turbine Short Sleeve Tee",
            genero: 'hombre'
        },
        {
            descripcion: "Designed for comfort, the Cybertruck Owl Tee is made from 100% cotton and features our signature Cybertruck icon on the back.",
            imagenes: [
                '7654393-00-A_2_2000.jpg',
                '7654393-00-A_3.jpg',
            ],
            enStock: 0,
            precio: 35,
            talles: ['M','L','XL','XXL'],
            slug: "hombre_cybertruck_owl_tee",
            type: 'remeras',
            etiquetas: ['shirt'],
            titulo: "hombre's Cybertruck Owl Tee",
            genero: 'hombre'
        },
        {
            descripcion: "Inspired by our fully integrated home solar and storage system, the Tesla Solar Roof Tee advocates for clean, sustainable energy wherever you go. Designed for fit, comfort and style, the tee features an aerial view of our seamless Solar Roof design on the front with our signature T logo above 'Solar Roof' on the back. Made from 100% Peruvian cotton.",
            imagenes: [
                '1703767-00-A_0_2000.jpg',
                '1703767-00-A_1.jpg',
            ],
            enStock: 15,
            precio: 35,
            talles: ['S','M','L','XL'],
            slug: "hombre_solar_roof_tee",
            type: 'remeras',
            etiquetas: ['shirt'],
            titulo: "hombre's Solar Roof Tee",
            genero: 'hombre'
        },
        {
            descripcion: "Inspired by the world’s most unlimited resource, the Let the Sun Shine Tee highlights our fully integrated home solar and storage system. Designed for fit, comfort and style, the tee features a sunset graphic along with our Tesla wordmark on the front and our signature T logo printed above 'Solar Roof' on the back. Made from 100% Peruvian cotton.",
            imagenes: [
                '1700280-00-A_0_2000.jpg',
                '1700280-00-A_1.jpg',
            ],
            enStock: 17,
            precio: 35,
            talles: ['XS','S','XL','XXL'],
            slug: "hombre_let_the_sun_shine_tee",
            type: 'remeras',
            etiquetas: ['shirt'],
            titulo: "hombre's Let the Sun Shine Tee",
            genero: 'hombre'
        },
        {
            descripcion: "Designed for fit, comfort and style, the hombre's 3D Large Wordmark Tee is made from 100% Peruvian cotton with a 3D silicone-printed Tesla wordmark printed across the chest.",
            imagenes: [
                '8764734-00-A_0_2000.jpg',
                '8764734-00-A_1.jpg',
            ],
            enStock: 12,
            precio: 35,
            talles: ['XS','S','M'],
            slug: "hombre_3d_large_wordmark_tee",
            type: 'remeras',
            etiquetas: ['shirt'],
            titulo: "hombre's 3D Large Wordmark Tee",
            genero: 'hombre'
        },
        {
            descripcion: "Designed for fit, comfort and style, the Tesla T Logo Tee is made from 100% Peruvian cotton and features a silicone-printed T Logo on the left chest.",
            imagenes: [
                '7652426-00-A_0_2000.jpg',
                '7652426-00-A_1.jpg',
            ],
            enStock: 5,
            precio: 35,
            talles: ['XS','S'],
            slug: "hombre_3d_t_logo_tee",
            type: 'remeras',
            etiquetas: ['shirt'],
            titulo: "hombre's 3D T Logo Tee",
            genero: 'hombre'
        },
        {
            descripcion: "Designed for comfort and style in any , the Tesla Small Wordmark Tee is made from 100% Peruvian cotton and features a 3D silicone-printed wordmark on the left chest.",
            imagenes: [
                '8528839-00-A_0_2000.jpg',
                '8528839-00-A_2.jpg',
            ],
            enStock: 2,
            precio: 35,
            talles: ['XS','S','M'],
            slug: "hombre_3d_small_wordmark_tee",
            type: 'remeras',
            etiquetas: ['shirt'],
            titulo: "hombre’s 3D Small Wordmark Tee",
            genero: 'hombre'
        },
        {
            descripcion: "Designed to celebrate Tesla's incredible performance mode, the Plaid Mode Tee features great fit, comfort and style. Made from 100% cotton, it's the next best thing to riding shotgun at the Nürburgring.",
            imagenes: [
                '1549268-00-A_0_2000.jpg',
                '1549268-00-A_2.jpg',
            ],
            enStock: 82,
            precio: 35,
            talles: ['XS','S','M','L','XL','XXL'],
            slug: "hombre_plaid_mode_tee",
            type: 'remeras',
            etiquetas: ['shirt'],
            titulo: "hombre's Plaid Mode Tee",
            genero: 'hombre'
        },
        {
            descripcion: "Inspired by our popular home battery, the Tesla Powerwall Tee is made from 100% cotton and features the phrase 'Pure Energy' under our signature logo in the back. Designed for fit, comfort and style, the exclusive tee promotes sustainable energy in any environhombret.",
            imagenes: [
                '9877034-00-A_0_2000.jpg',
                '9877034-00-A_2.jpg',
            ],
            enStock: 24,
            precio: 35,
            talles: ['XL','XXL'],
            slug: "hombre_powerwall_tee",
            type: 'remeras',
            etiquetas: ['shirt'],
            titulo: "hombre's Powerwall Tee",
            genero: 'hombre'
        },
        {
            descripcion: "Inspired by Tesla Battery Day and featuring the unveiled tabless battery cell, Battery Day Tee celebrates the future of energy storage and cell manufacturing. Designed for fit, comfort and style, Battery Day Tee is made from 100% cotton with a stylized cell printed across the chest. Made in Peru.",
            imagenes: [
                '1633802-00-A_0_2000.jpg',
                '1633802-00-A_2.jpg',
            ],
            enStock: 5,
            precio: 30,
            talles: ['XS','S','XXL'],
            slug: "hombre_battery_day_tee",
            type: 'remeras',
            etiquetas: ['shirt'],
            titulo: "hombre's Battery Day Tee",
            genero: 'hombre'
        },
        {
            descripcion: "Designed for exceptional comfort and inspired by the Cybertruck unveil event, the Cybertruck Bulletproof Tee is made from 100% cotton and features our signature Cybertruck icon on the back.",
            imagenes: [
                '7654399-00-A_0_2000.jpg',
                '7654399-00-A_1.jpg',
            ],
            enStock: 150,
            precio: 30,
            talles: ['M','L'],
            slug: "hombre_cybertruck_bulletproof_tee",
            type: 'remeras',
            etiquetas: ['shirt'],
            titulo: "hombre’s Cybertruck Bulletproof Tee",
            genero: 'hombre'
        },
        {
            descripcion: "Inspired by the Model Y order confirmation graphic, the limited edition Haha Yes Tee is designed for comfort and style. Made from 100% Peruvian cotton and featuring the Tesla wordmark across the chest, the exclusive tee will commemorate your order for years to come.",
            imagenes: [
                '7652410-00-A_0.jpg',
                '7652410-00-A_1_2000.jpg',
            ],
            enStock: 10,
            precio: 35,
            talles: ['XS','S','M','L','XL','XXL'],
            slug: "hombre_haha_yes_tee",
            type: 'remeras',
            etiquetas: ['shirt'],
            titulo: "hombre's Haha Yes Tee",
            genero: 'hombre'
        },
        {
            descripcion: "Designed for fit, comfort and style, the limited edition S3XY Tee is made from 100% cotton with a 3D silicone-printed “S3XY” logo across the chest. Made in Peru. Available in black.",
            imagenes: [
                '8764600-00-A_0_2000.jpg',
                '8764600-00-A_2.jpg',
            ],
            enStock: 34,
            precio: 35,
            talles: ['XS','S','M','L'],
            slug: "hombre_s3xy_tee",
            type: 'remeras',
            etiquetas: ['shirt'],
            titulo: "hombre's S3XY Tee",
            genero: 'hombre'
        },
        {
            descripcion: "Designed for fit, comfort and style, the hombre's 3D Wordmark Long Sleeve Tee is made from 100% cotton and features an understated wordmark logo on the left chest.",
            imagenes: [
                '8764813-00-A_0_2000.jpg',
                '8764813-00-A_1.jpg',
            ],
            enStock: 15,
            precio: 40,
            talles: ['XL','XXL'],
            slug: "hombre_3d_wordmark_long_sleeve_tee",
            type: 'remeras',
            etiquetas: ['shirt'],
            titulo: "hombre's 3D Wordmark Long Sleeve Tee",
            genero: 'hombre'
        },
        {
            descripcion: "Designed for fit, comfort and style, the hombre's 3D T Logo Long Sleeve Tee is made from 100% cotton and features an understated T logo on the left chest.",
            imagenes: [
                '8529198-00-A_0_2000.jpg',
                '8529198-00-A_1.jpg',
            ],
            enStock: 12,
            precio: 40,
            talles: ['XS','XXL'],
            slug: "hombre_3d_t_logo_long_sleeve_tee",
            type: 'remeras',
            etiquetas: ['shirt'],
            titulo: "hombre's 3D T Logo Long Sleeve Tee",
            genero: 'hombre'
        },
        {
            descripcion: "Introducing the Tesla Raven Collection. The hombre's Raven Lightweight Hoodie has a premium, relaxed silhouette made from a sustainable bamboo cotton blend. The hoodie features subtle thermoplastic polyurethane Tesla logos across the chest and on the sleeve with a french terry interior for versatility in any season. Made from 70% bamboo and 30% cotton.",
            imagenes: [
                '1740245-00-A_0_2000.jpg',
                '1740245-00-A_1.jpg',
            ],
            enStock: 10,
            precio: 115,
            talles: ['XS','S','M','L','XL','XXL'],
            slug: "hombre_raven_lightweight_hoodie",
            type: 'buzo',
            etiquetas: ['hoodie'],
            titulo: "hombre's Raven Lightweight Hoodie",
            genero: 'hombre'
        },
        {
            descripcion: "Introducing the Tesla Chill Collection. The Chill Pullover Hoodie has a premium, heavyweight exterior and soft fleece interior for comfort in any season. The unisex hoodie features subtle thermoplastic polyurethane Tesla logos across the chest and on the sleeve, a double layer single seam hood and pockets with custom matte zipper pulls. Made from 60% cotton and 40% recycled polyester.",
            imagenes: [
                '1740051-00-A_0_2000.jpg',
                '1740051-00-A_1.jpg',
            ],
            enStock: 10,
            precio: 130,
            talles: ['XS','S','M','L','XL','XXL'],
            slug: "chill_pullover_hoodie",
            type: 'buzo',
            etiquetas: ['hoodie'],
            titulo: "Chill Pullover Hoodie",
            genero: 'unisex'
        },
        {
            descripcion: "Introducing the Tesla Chill Collection. The hombre's Chill Full Zip Hoodie has a premium, heavyweight exterior and soft fleece interior for comfort in any season. The hoodie features subtle thermoplastic polyurethane Tesla logos on the left chest and sleeve, a double layer single seam hood and pockets with custom matte zipper pulls. Made from 60% cotton and 40% recycled polyester.",
            imagenes: [
                '1741111-00-A_0_2000.jpg',
                '1741111-00-A_1.jpg',
            ],
            enStock: 100,
            precio: 85,
            talles: ['XS','L','XL','XXL'],
            slug: "hombre_chill_full_zip_hoodie",
            type: 'remeras',
            etiquetas: ['shirt'],
            titulo: "hombre's Chill Full Zip Hoodie",
            genero: 'hombre'
        },
        {
            descripcion: "Introducing the Tesla Chill Collection. The hombre’s Chill Quarter Zip Pullover has a premium, heavyweight exterior and soft fleece interior for comfort in any season. The pullover features subtle thermoplastic polyurethane Tesla logos on the left chest and below the back collar, as well as a custom matte zipper pull. Made from 60% cotton and 40% recycled polyester.",
            imagenes: [
                '1740140-00-A_0_2000.jpg',
                '1740140-00-A_1.jpg',
            ],
            enStock: 7,
            precio: 85,
            talles: ['XS','S','M'],
            slug: "hombre_chill_quarter_zip_pullover_-_gray",
            type: 'remeras',
            etiquetas: ['shirt'],
            titulo: "hombre's Chill Quarter Zip Pullover - Gray",
            genero: 'hombre'
        },
        {
            descripcion: "Introducing the Tesla Chill Collection. The hombre’s Chill Quarter Zip Pullover has a premium, heavyweight exterior and soft fleece interior for comfort in any season. The pullover features subtle thermoplastic polyurethane Tesla logos on the left chest and below the back collar, as well as a custom matte zipper pull. Made from 60% cotton and 40% recycled polyester.",
            imagenes: [
                '1740145-00-A_2_2000.jpg',
                '1740145-00-A_1.jpg',
            ],
            enStock: 15,
            precio: 85,
            talles: ['XS','S','M','L'],
            slug: "hombre_chill_quarter_zip_pullover_-_white",
            type: 'remeras',
            etiquetas: ['shirt'],
            titulo: "hombre's Chill Quarter Zip Pullover - White",
            genero: 'hombre'
        },
        {
            descripcion: "The Unisex 3D Large Wordmark Pullover Hoodie features soft fleece and an adjustable, jersey-lined hood for comfort and coverage. Designed in a unisex style, the pullover hoodie includes a tone-on-tone 3D silicone-printed wordmark across the chest.",
            imagenes: [
                '8529107-00-A_0_2000.jpg',
                '8529107-00-A_1.jpg',
            ],
            enStock: 15,
            precio: 70,
            talles: ['XS','S','XL','XXL'],
            slug: "3d_large_wordmark_pullover_hoodie",
            type: 'buzo',
            etiquetas: ['hoodie'],
            titulo: "3D Large Wordmark Pullover Hoodie",
            genero: 'unisex'
        },
        {
            descripcion: "As with the iconic Tesla logo, the Cybertruck Graffiti Hoodie is a classic in the making. Unisex style featuring soft fleece and an adjustable, jersey-lined hood for comfortable coverage.",
            imagenes: [
                '7654420-00-A_0_2000.jpg',
                '7654420-00-A_1_2000.jpg',
            ],
            enStock: 13,
            precio: 60,
            talles: ['XS','S','M','L','XL','XXL'],
            slug: "cybertruck_graffiti_hoodie",
            type: 'buzo',
            etiquetas: ['hoodie'],
            titulo: "Cybertruck Graffiti Hoodie",
            genero: 'unisex'
        },
        {
            descripcion: "The Relaxed T Logo Hat is a classic silhouette combined with modern details, featuring a 3D T logo and a custom metal buckle closure. The ultrasoft design is flexible and abrasion resistant, while the inner sweatband includes quilted padding for extra comfort and moisture wicking. The visor is fully made from recycled plastic bottles. 100% Cotton.",
            imagenes: [
                '1657932-00-A_0_2000.jpg',
                '1657932-00-A_1.jpg',
            ],
            enStock: 11,
            precio: 30,
            talles: ['XS','S','M','L','XL','XXL'],
            slug: "relaxed_t_logo_hat",
            type: 'sombrero',
            etiquetas: ['sombrero'],
            titulo: "Relaxed T Logo Hat",
            genero: 'unisex'
        },
        {
            descripcion: "The Relaxed T Logo Hat is a classic silhouette combined with modern details, featuring a 3D T logo and a custom metal buckle closure. The ultrasoft design is flexible and abrasion resistant, while the inner sweatband includes quilted padding for extra comfort and moisture wicking. The visor is fully made from recycled plastic bottles. 100% Cotton.",
            imagenes: [
                '1740417-00-A_0_2000.jpg',
                '1740417-00-A_1.jpg',
            ],
            enStock: 13,
            precio: 35,
            talles: ['XS','S','M','L','XL','XXL'],
            slug: "thermal_cuffed_beanie",
            type: 'sombrero',
            etiquetas: ['sombrero'],
            titulo: "Thermal Cuffed Beanie",
            genero: 'unisex'
        },
        {
            descripcion: "The mujeres's Cropped Puffer Jacket features a uniquely cropped silhouette for the perfect, modern style while on the go during the cozy season ahead. The puffer features subtle silicone injected Tesla logos below the back collar and on the right sleeve, custom matte metal zipper pulls and a soft, fleece lined collar. Made from 87% nylon and 13% polyurethane.",
            imagenes: [
                '1740535-00-A_0_2000.jpg',
                '1740535-00-A_1.jpg',
            ],
            enStock: 85,
            precio: 225,
            talles: ['XS','S','M'],
            slug: "mujeres_cropped_puffer_jacket",
            type: 'buzo',
            etiquetas: ['hoodie'],
            titulo: "mujeres's Cropped Puffer Jacket",
            genero: 'mujeres'
        },
        {
            descripcion: "Introducing the Tesla Chill Collection. The mujeres's Chill Half Zip Cropped Hoodie has a premium, soft fleece exterior and cropped silhouette for comfort in everyday lifestyle. The hoodie features an elastic hem that gathers at the waist, subtle thermoplastic polyurethane Tesla logos along the hood and on the sleeve, a double layer single seam hood and a custom ring zipper pull. Made from 60% cotton and 40% recycled polyester.",
            imagenes: [
                '1740226-00-A_0_2000.jpg',
                '1740226-00-A_1.jpg',
            ],
            enStock: 10,
            precio: 130,
            talles: ['XS','S','M','XXL'],
            slug: "mujeres_chill_half_zip_cropped_hoodie",
            type: 'buzo',
            etiquetas: ['hoodie'],
            titulo: "mujeres's Chill Half Zip Cropped Hoodie",
            genero: 'mujeres'
        },
        {
            descripcion: "Introducing the Tesla Raven Collection. The mujeres's Raven Slouchy Crew Sweatshirt has a premium, relaxed silhouette made from a sustainable bamboo cotton blend. The slouchy crew features a subtle thermoplastic polyurethane Tesla wordmark on the left sleeve and a french terry interior for a cozy look and feel in every season. Pair it with your Raven Joggers or favorite on the go fit. Made from 70% bamboo and 30% cotton.",
            imagenes: [
                '1740260-00-A_0_2000.jpg',
                '1740260-00-A_1.jpg',
            ],
            enStock: 9,
            precio: 110,
            talles: ['XS','S','M','L','XL','XXL'],
            slug: "mujeres_raven_slouchy_crew_sweatshirt",
            type: 'buzo',
            etiquetas: ['hoodie'],
            titulo: "mujeres's Raven Slouchy Crew Sweatshirt",
            genero: 'mujeres'
        },
        {
            descripcion: "Introducing the Tesla Turbine Collection. Designed for style, comfort and everyday lifestyle, the mujeres's Turbine Cropped Long Sleeve Tee features a subtle, water-based Tesla wordmark across the chest and our T logo below the back collar. The lightweight material is double-dyed, creating a soft, casual style with a cropped silhouette. Made from 50% cotton and 50%",
            imagenes: [
                '1740290-00-A_0_2000.jpg',
                '1740290-00-A_1.jpg',
            ],
            enStock: 10,
            precio: 45,
            talles: ['XS','S','M','L','XL','XXL'],
            slug: "mujeres_turbine_cropped_long_sleeve_tee",
            type: 'remeras',
            etiquetas: ['shirt'],
            titulo: "mujeres's Turbine Cropped Long Sleeve Tee",
            genero: 'mujeres'
        },
        {
            descripcion: "ntroducing the Tesla Turbine Collection. Designed for style, comfort and everyday lifestyle, the mujeres's Turbine Cropped Short Sleeve Tee features a subtle, water-based Tesla wordmark across the chest and our T logo below the back collar. The lightweight material is double-dyed, creating a soft, casual style with a cropped silhouette. Made from 50% cotton and 50% polyester.",
            imagenes: [
                '1741441-00-A_0_2000.jpg',
                '1741441-00-A_1.jpg',
            ],
            enStock: 0,
            precio: 40,
            talles: ['XS','S'],
            slug: "mujeres_turbine_cropped_short_sleeve_tee",
            type: 'remeras',
            etiquetas: ['shirt'],
            titulo: "mujeres's Turbine Cropped Short Sleeve Tee",
            genero: 'mujeres'
        },
        {
            descripcion: "Designed for style and comfort, the ultrasoft mujeres's T Logo Short Sleeve Scoop Neck Tee features a tonal 3D silicone-printed T logo on the left chest. Made of 50% Peruvian cotton and 50% Peruvian viscose.",
            imagenes: [
                '8765090-00-A_0_2000.jpg',
                '8765090-00-A_1.jpg',
            ],
            enStock: 30,
            precio: 35,
            talles: ['XS','S','M','L','XL','XXL'],
            slug: "mujeres_t_logo_short_sleeve_scoop_neck_tee",
            type: 'remeras',
            etiquetas: ['shirt'],
            titulo: "mujeres's T Logo Short Sleeve Scoop Neck Tee",
            genero: 'mujeres'
        },
        {
            descripcion: "Designed for style and comfort, the ultrasoft mujeres's T Logo Long Sleeve Scoop Neck Tee features a tonal 3D silicone-printed T logo on the left chest. Made of 50% Peruvian cotton and 50% Peruvian viscose.",
            imagenes: [
                '8765100-00-A_0_2000.jpg',
                '8765100-00-A_1.jpg',
            ],
            enStock: 16,
            precio: 40,
            talles: ['XS','S','L','XL','XXL'],
            slug: "mujeres_t_logo_long_sleeve_scoop_neck_tee",
            type: 'remeras',
            etiquetas: ['shirt'],
            titulo: "mujeres's T Logo Long Sleeve Scoop Neck Tee",
            genero: 'mujeres'
        },
        {
            descripcion: "Designed for style and comfort, the mujeres's Small Wordmark Short Sleeve V-Neck Tee features a tonal 3D silicone-printed wordmark on the left chest. Made of 100% Peruvian cotton.",
            imagenes: [
                '8765120-00-A_0_2000.jpg',
                '8765120-00-A_1.jpg',
            ],
            enStock: 18,
            precio: 35,
            talles: ['XS','S','M','L','XL','XXL'],
            slug: "mujeres_small_wordmark_short_sleeve_v-neck_tee",
            type: 'remeras',
            etiquetas: ['shirt'],
            titulo: "mujeres's Small Wordmark Short Sleeve V-Neck Tee",
            genero: 'mujeres'
        },
        {
            descripcion: "Designed for style and comfort, the mujeres's Large Wordmark Short Sleeve Crew Neck Tee features a tonal 3D silicone-printed wordmark across the chest. Made of 100% Peruvian pima cotton.",
            imagenes: [
                '8765115-00-A_0_2000.jpg',
                '8765115-00-A_1.jpg',
            ],
            enStock: 5,
            precio: 35,
            talles: ['XL','XXL'],
            slug: "mujeres_large_wordmark_short_sleeve_crew_neck_tee",
            type: 'remeras',
            etiquetas: ['shirt'],
            titulo: "mujeres's Large Wordmark Short Sleeve Crew Neck Tee",
            genero: 'mujeres'
        },
        {
            descripcion: "Designed to celebrate Tesla's incredible performance mode, the Plaid Mode Tee features great fit, comfort and style. Made from 100% cotton, it's the next best thing to riding shotgun at the Nürburgring.",
            imagenes: [
                '1549275-00-A_0_2000.jpg',
                '1549275-00-A_1.jpg',
            ],
            enStock: 16,
            precio: 35,
            talles: ['S','M'],
            slug: "mujeres_plaid_mode_tee",
            type: 'remeras',
            etiquetas: ['shirt'],
            titulo: "mujeres's Plaid Mode Tee",
            genero: 'mujeres'
        },
        {
            descripcion: "Inspired by our popular home battery, the Tesla Powerwall Tee is made from 100% cotton and features the phrase 'Pure Energy' under our signature logo in the back. Designed for fit, comfort and style, the exclusive tee promotes sustainable energy in any",
            imagenes: [
                '9877040-00-A_0_2000.jpg',
                '9877040-00-A_1.jpg',
            ],
            enStock: 10,
            precio: 130,
            talles: ['XS','S','M','L','XL','XXL'],
            slug: "mujeres_powerwall_tee",
            type: 'remeras',
            etiquetas: ['shirt'],
            titulo: "mujeres’s Powerwall Tee",
            genero: 'mujeres'
        },
        {
            descripcion: "Fully customized and uniquely styled, the mujeres's Corp Jacket features a silicone-printed 'T' logo on the left chest and prominent Tesla wordmark across the back.",
            imagenes: [
                '5645680-00-A_0_2000.jpg',
                '5645680-00-A_3.jpg',
            ],
            enStock: 3,
            precio: 90,
            talles: ['M','L','XL','XXL'],
            slug: "mujeres_corp_jacket",
            type: 'remeras',
            etiquetas: ['shirt'],
            titulo: "mujeres's Corp Jacket",
            genero: 'mujeres'
        },
        {
            descripcion: "Introducing the Tesla Raven Collection. The mujeres's Raven Joggers have a premium, relaxed silhouette made from a sustainable bamboo cotton blend. The joggers feature a subtle thermoplastic polyurethane Tesla wordmark and T logo and a french terry interior for a cozy look and feel in every season. Pair them with your Raven Slouchy Crew Sweatshirt, Raven Lightweight Zip Up Jacket or other favorite on the go fit. Made from 70% bamboo and 30% cotton.",
            imagenes: [
                '1740270-00-A_0_2000.jpg',
                '1740270-00-A_1.jpg',
            ],
            enStock: 162,
            precio: 100,
            talles: ['XS','S','M','L','XL','XXL'],
            slug: "mujeres_raven_joggers",
            type: 'remeras',
            etiquetas: ['shirt'],
            titulo: "mujeres's Raven Joggers",
            genero: 'mujeres'
        },
        {
            descripcion: "Designed for fit, comfort and style, the Kids Cybertruck Graffiti Long Sleeve Tee features a water-based Cybertruck graffiti wordmark across the chest, a Tesla wordmark down the left arm and our signature T logo on the back collar. Made from 50% cotton and 50% polyester.",
            imagenes: [
                '1742694-00-A_1_2000.jpg',
                '1742694-00-A_3.jpg',
            ],
            enStock: 10,
            precio: 30,
            talles: ['XS','S','M'],
            slug: "kids_cybertruck_long_sleeve_tee",
            type: 'remeras',
            etiquetas: ['shirt'],
            titulo: "Kids Cybertruck Long Sleeve Tee",
            genero: 'kid'
        },
        {
            descripcion: "The Kids Scribble T Logo Tee is made from 100% Peruvian cotton and features a Tesla T sketched logo for every young artist to wear.",
            imagenes: [
                '8529312-00-A_0_2000.jpg',
                '8529312-00-A_1.jpg',
            ],
            enStock: 0,
            precio: 25,
            talles: ['XS','S','M'],
            slug: "kids_scribble_t_logo_tee",
            type: 'remeras',
            etiquetas: ['shirt'],
            titulo: "Kids Scribble T Logo Tee",
            genero: 'kid'
        },
        {
            descripcion: "The Kids Cybertruck Tee features the iconic Cybertruck graffiti wordmark and is made from 100% Peruvian cotton for maximum comfort.",
            imagenes: [
                '8529342-00-A_0_2000.jpg',
                '8529342-00-A_1.jpg',
            ],
            enStock: 10,
            precio: 25,
            talles: ['XS','S','M'],
            slug: "kids_cybertruck_tee",
            type: 'remeras',
            etiquetas: ['shirt'],
            titulo: "Kids Cybertruck Tee",
            genero: 'kid'
        },
        {
            descripcion: "The refreshed Kids Racing Stripe Tee is made from 100% Peruvian cotton, featuring a newly enhanced racing stripe with a brushed Tesla wordmark that's perfect for any speed racer.",
            imagenes: [
                '8529354-00-A_0_2000.jpg',
                '8529354-00-A_1.jpg',
            ],
            enStock: 10,
            precio: 30,
            talles: ['XS','S','M'],
            slug: "kids_racing_stripe_tee",
            type: 'remeras',
            etiquetas: ['shirt'],
            titulo: "Kids Racing Stripe Tee",
            genero: 'kid'
        },
        {
            descripcion: "Designed for fit, comfort and style, the Tesla T Logo Tee is made from 100% Peruvian cotton and features a silicone-printed T Logo on the left chest.",
            imagenes: [
                '7652465-00-A_0_2000.jpg',
                '7652465-00-A_1.jpg',
            ],
            enStock: 10,
            precio: 30,
            talles: ['XS','S','M'],
            slug: "kids_3d_t_logo_tee",
            type: 'remeras',
            etiquetas: ['shirt'],
            titulo: "Kids 3D T Logo Tee",
            genero: 'kid'
        },
        {
            descripcion: "The checkered tee is made from long grain, GMO free Peruvian cotton. Peru is the only country in the world where cotton is picked by hand on a large scale. The 4,500-year-old tradition prevents damage to the fiber during the picking process and removes the need to use chemicals to open the cotton plants before harvest. This environhombretally friendly process results in cotton that is soft, strong, and lustrous – and the tee will get even softer with every wash.",
            imagenes: [
                '100042307_0_2000.jpg',
                '100042307_alt_2000.jpg',
            ],
            enStock: 10,
            precio: 30,
            talles: ['XS','S','M'],
            slug: "kids_checkered_tee",
            type: 'remeras',
            etiquetas: ['shirt'],
            titulo: "Kids Checkered Tee",
            genero: 'kid'
        },
        {
            descripcion: "For the future space traveler with discerning taste, a soft, cotton onesie with snap closure bottom. Clear labeling provided in case of contact with a new spacefaring civilization. 100% Cotton. Made in Peru",
            imagenes: [
                '1473809-00-A_1_2000.jpg',
                '1473809-00-A_alt.jpg',
            ],
            enStock: 16,
            precio: 25,
            talles: ['XS','S'],
            slug: "made_on_earth_by_humans_onesie",
            type: 'remeras',
            etiquetas: ['shirt'],
            titulo: "Made on Earth by Humans Onesie",
            genero: 'kid'
        },
        {
            descripcion: "The Kids Scribble T Logo Onesie is made from 100% Peruvian cotton and features a Tesla T sketched logo for every little artist to wear.",
            imagenes: [
                '8529387-00-A_0_2000.jpg',
                '8529387-00-A_1.jpg',
            ],
            enStock: 0,
            precio: 30,
            talles: ['XS','S'],
            slug: "scribble_t_logo_onesie",
            type: 'remeras',
            etiquetas: ['shirt'],
            titulo: "Scribble T Logo Onesie",
            genero: 'kid'
        },
        {
            descripcion: "Show your commithombret to sustainable energy with this cheeky onesie for your young one. Note: Does not prevent emissions. 100% Cotton. Made in Peru.",
            imagenes: [
                '1473834-00-A_2_2000.jpg',
                '1473829-00-A_2_2000.jpg',
            ],
            enStock: 10,
            precio: 30,
            talles: ['XS','S'],
            slug: "zero_emissions_(almost)_onesie",
            type: 'remeras',
            etiquetas: ['shirt'],
            titulo: "Zero Emissions (Almost) Onesie",
            genero: 'kid'
        },
        {
            descripcion: "Wear your Kids Cyberquad Bomber Jacket during your adventures on Cyberquad for Kids. The bomber jacket features a graffiti-style illustration of our Cyberquad silhouette and wordmark. With three zippered pockets and our signature T logo and Tesla wordmark printed along the sleeves, Kids Cyberquad Bomber Jacket is perfect for wherever the trail takes you. Made from 60% cotton and 40% polyester.",
            imagenes: [
                '1742702-00-A_0_2000.jpg',
                '1742702-00-A_1.jpg',
            ],
            enStock: 10,
            precio: 65,
            talles: ['XS','S','M'],
            slug: "kids_cyberquad_bomber_jacket",
            type: 'remeras',
            etiquetas: ['shirt'],
            titulo: "Kids Cyberquad Bomber Jacket",
            genero: 'kid'
        },
        {
            descripcion: "Cruise the playground in style with the Kids Corp Jacket. Modeled after the original Tesla Corp Jacket, the Kids Corp Jacket features the same understated style and high-quality materials but at a pint-sized scale.",
            imagenes: [
                '1506211-00-A_0_2000.jpg',
                '1506211-00-A_1_2000.jpg',
            ],
            enStock: 10,
            precio: 30,
            talles: ['XS','S','M'],
            slug: "kids_corp_jacket",
            type: 'remeras',
            etiquetas: ['shirt'],
            titulo: "Kids Corp Jacket",
            genero: 'kid'
        },
    ]
}