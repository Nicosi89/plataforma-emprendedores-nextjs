'use client';
import { useCurrentUserProvider } from '@/providers/CurrentUserProv'
import { sidebarItemsAdmin } from '@/utils/constants';
import React, { useState } from 'react'
import FormCrearCurso from './_components/FormCrearCurso';
import FormCrearSeccion from './_components/FormCrearSeccion';
import FormCrearLeccion from './_components/FormCrearLeccion';
import Editor from './_components/lexical-form';
import FormularioCrearContenido from './_components/FormCreateContent';


function AdminPage() {

    const [optionSelected, setOptionSelected] = useState('')

    const { currentUser } = useCurrentUserProvider();


    console.log('currentUser role en AdminPage', currentUser?.role)


    !currentUser && (
        <p>Cargando usuario...</p>
    )
    if (currentUser?.role !== "admin") {
        return (
            <div className='relative w-full flex justify-center items-center min-h-screen'>
                <p> No tienes permisos para ingresar al admin</p>
            </div>
        )
    }
    const renderTabContent = (tab: string) => {
        switch (tab) {
            case 'nuevo-curso':
                return <FormCrearCurso />;
            case 'nueva-seccion':
                return <FormCrearSeccion />;
            case 'nuevo-contenidol':
                return <FormularioCrearContenido />;
            case 'nueva-leccion':
                return <FormCrearLeccion />;
            default:
                return <div>Selecciona una pestaña</div>;
        }
    };

    const onClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        setOptionSelected(event.currentTarget.value)
    }

    return (
        <section className="mt-10 w-full flex px-6">
            <div className='w-full'>
                <h1 className="text-20 font-bold font-lexend">Admin</h1>
                <div className='flex max-md:flex-col gap-9 justify-start'>
                    <div className='flex flex-col'>
                        {sidebarItemsAdmin.map((item, index) => {
                            const isSelected = item.route === optionSelected
                            return (
                                <button
                                    key={index}
                                    onClick={onClickHandler}
                                    value={item.route}
                                    className={`overflow-hidden gap-3.5 text-start self-stretch px-4 py-2.5 w-full whitespace-nowrap rounded-lg ${isSelected ? 'bg-pink-600 text-white-1' : ''
                                        }`}
                                >
                                    {item.label}
                                </button>
                            )

                        })}
                    </div>
                    <div className='flex self-center'>
                        {renderTabContent(optionSelected)}
                    </div>
                </div>
                
            </div>
        </section>

    )
}

export default AdminPage
