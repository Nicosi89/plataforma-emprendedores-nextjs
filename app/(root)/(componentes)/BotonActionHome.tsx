import { Button } from '../../../components/ui/button'
import Image from 'next/image';
import { IoPlayOutline } from "react-icons/io5";

function BotonActionHome({onClickHandler, label, isConUsuario}: BotonActionHomeProps) {

    return (
        <div className='pt-3'>
            <Button
                className={`flex gap-2 text-[22px] rounded-2xl font-lexend m-7 py-6 px-5   
                    ${isConUsuario ? 'border-white-1 border-2 text-marca-pink bg-white-1' : 'bg-marca-pink text-white-1'}  
                    font-semibold transition-all duration-500 hover:bg-marca-pink hover:text-white-1 cursor-pointer
                    shadow-[4px_5px_1px_rgba(0,0,0,1)]`}
                onClick={onClickHandler}>
                <p>{label}</p>
                <IoPlayOutline 
                    size={32}
                    fill='green'

                />
                

            </Button>
        </div>
    )
}

export default BotonActionHome
