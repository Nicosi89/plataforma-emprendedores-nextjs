import React from 'react'
import FormularioBienvenida from './_componentes/FormularioBienvenida'
import Image from 'next/image'



function Bienvenida() {
    return (
        <div className=' flex max-md:flex-col w-full h-screen justify-between '>
            <div className='flex flex-col flex-1 justify-center items-center gap-3 mx-10'>
                <div className='flex flex-col justify-center gap-2 mt-6'>
                    <h1 className='uppercase font-[800] text-xl text-marca-pink text-center'>Queremos conocerte</h1>
                    <p className='text-center'>Cuéntanos quien eres y cual es tu negocio, esta información nos será muy valiosa para ofrecerte mejores experiencias y servicios más a tu medida.</p>
                </div>
                <FormularioBienvenida />
            </div>
            <div className='bg-marca-pink flex-1 flex items-center my-5'>
                <Image 
                src='/dazzle-line-online-language-learning 1.png'
                alt='bienvienida'
                width={600}
                height={600}
                
                />
            </div>
            
        </div>
    )
}

export default Bienvenida