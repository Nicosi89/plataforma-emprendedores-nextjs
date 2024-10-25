import Image from 'next/image';

const Header: React.FC = () => {

    return (
        <header className="flex overflow-hidden gap-5 items-center pt-5 pr-5 pb-2.5 pl-2.5 w-full max-md:max-w-full">
            <Image loading="lazy" src="/iconos/yo.png" width={200} height={200} alt="User profile" className="object-contain self-stretch my-auto rounded-full aspect-square w-[75px]" />
        </header>
    );

};

export default Header;