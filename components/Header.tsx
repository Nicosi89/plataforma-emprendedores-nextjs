import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCurrentUserProvider } from '@/providers/CurrentUserProv';


const Header = ({ isLeccion, isPerfil }: { isLeccion: boolean, isPerfil: boolean }) => {


    const { currentUser } = useCurrentUserProvider()

    const renderImagen = () => {
        if (isPerfil) {
            return <></>
        } else {
            if (currentUser) {
                return <Link href='/perfil'><Image loading="lazy" width={55} height={55} src={currentUser?.imageUrl!} className="object-cover self-stretch my-auto rounded-full aspect-square w-[70px] h-auto" alt="User profile" /></Link>
            } else {
                return <Link href='/perfil'><Image loading="lazy" width={55} height={55} src='/iconos/user-thumbnail.svg' className="object-cover self-stretch my-auto rounded-full aspect-square w-[70px] h-auto" alt="User profile" /></Link>
            }
        }
    }

    return (
        <header className={`flex overflow-hidden ${isLeccion ? 'justify-end' : 'justify-between'} pt-5 pr-5 pb-2.5 pl-2.5 w-full max-md:hidden max-md:max-w-full max-phone:hidden`}>
            {!isLeccion &&
                <Link href='/'>
                    <Image
                        src="/dazzle-line-rocket.png"
                        width={40}
                        height={40}
                        alt="menu icon"
                    />
                </Link>
            }
            {renderImagen()}
        </header>

    );

};


export default Header;