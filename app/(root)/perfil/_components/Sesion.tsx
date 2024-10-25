import { Button } from '@/components/ui/button'
import { SignOutButton } from '@clerk/clerk-react'
import Link from 'next/link'
import React from 'react'

function Sesion({ isCerrarSesion }: { isCerrarSesion: boolean }) {
  return (
    <div className='flex flex-col justify-center items-center'>
      {isCerrarSesion ?
        <>
          <p className='text-center'> ¿Quieres cerrar tu sesion en este navegador?</p>
          <SignOutButton >
            <Button
              className='m-auto text-xl rounded-2xl font-lexend my-5 bg-marca-pink p-7 text-white-1 font-semibold transition-all duration-500 hover:bg-black-1'>
            <Link href='/sign-in' >Cerrar sesión</Link>
            </Button>
          </SignOutButton>
        </>
        :
        <>
          <p className='text-center'> ¿Quieres iniciar sesion?</p>
          <Button
            className='m-auto text-xl rounded-2xl font-lexend my-5 bg-marca-pink p-7 text-white-1 font-semibold transition-all duration-500 hover:bg-black-1'>
            <Link href='/sign-in' >Ingresar con usuario</Link>
          </Button>
        </>
      }

    </div>
  )
}

export default Sesion
