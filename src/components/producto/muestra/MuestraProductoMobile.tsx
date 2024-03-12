'use client';

import Image from 'next/image';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Navigation, Pagination } from 'swiper/modules';


import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import './muestra.css';



interface Props {
  imagenes: string[];
  titulo: string;
  className?: string;
}



export const MuestraProductoMobile = ( { imagenes, titulo, className }: Props ) => {


  return (
    <div className={ className }>

      <Swiper
        style={{
          width: '100vw',
          height: '500px'
        }}
        pagination
        autoplay={{
          delay: 2500
        }}
        modules={ [ FreeMode, Autoplay, Pagination ] }
        className="mySwiper2"
      >

        {
          imagenes.map( imagen => (
            <SwiperSlide key={ imagen }>
              <Image
                width={ 600 }
                height={ 500 }
                src={ `/products/${ imagen }` }
                alt={ titulo }
                className="object-fill"
              />
            </SwiperSlide>

          ) )
        }
      </Swiper>



    </div>
  );
};