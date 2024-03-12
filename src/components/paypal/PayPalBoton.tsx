'use client'

import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import {CreateOrderData, CreateOrderActions, OnApproveData, OnApproveActions } from '@paypal/paypal-js'
import React from 'react'
import { paypalPagoChequeado, setTranssaccionId } from '@/actions'

interface Props {
  ordenId: string
  amount: number //Cantidad que tengo que pagar 
}

export const PayPalBoton = ({ordenId,amount}:Props) => {
  // console.log('La orden id es ' + ordenId)

  const [{isPending}] = usePayPalScriptReducer()

  const rouendedAmount = ((Math.round(amount * 100)) / 100).toString()

  if(isPending){
    return (
      <div className='animate-pulse mb-16'>
        <div className='h-11 bg-gray-300 rounded'/>
        <div className='h-11 bg-gray-300 rounded mt-2'/>
      </div>
    )
  }


  const crearOrden = async(data: CreateOrderData, actions: CreateOrderActions): Promise<string>=> {

    try {
      
      const transaccionId = await actions.order.create({
        intent: "CAPTURE",
        purchase_units: [
          {
            invoice_id: ordenId,
            amount: {
              currency_code: 'USD', // Agrega la propiedad currency_code
              value: `${rouendedAmount}`,
            },
          },
        ],
      })
      
      // console.log({transaccionId})
      const {ok} = await  setTranssaccionId(ordenId, transaccionId)
      if(!ok){
        throw new Error('No se pudo actualizar la orden')
      }
      return transaccionId

    } catch (error) {
      console.log(error)
      return ''
    }

  }

  const ordenAprobada = async(data: OnApproveData, actions: OnApproveActions) => {
    const detalles = await actions.order?.capture();
    if(detalles && detalles.id) {
      await paypalPagoChequeado(detalles.id);
    } else {
      console.error("No se pudieron capturar los detalles de la orden.");
    }
  };

  

  return (
    <div className='relative z-0'>
      <PayPalButtons createOrder={crearOrden}  onApprove={ordenAprobada}/>
    </div>
  )
  }
//onApprove={}
 