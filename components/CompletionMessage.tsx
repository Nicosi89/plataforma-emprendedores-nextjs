import Image from "next/image";
import { forwardRef } from "react";

interface CompletionMessageProps {
  sectionName: string;
  mensajePrincipal: string;
  routeImagen: string;
}
//forwardRef permite que un componente hijo acceda al ref que se le pasa desde el componente padre.
// eslint-disable-next-line react/display-name
const CompletionMessage = forwardRef<HTMLDivElement, CompletionMessageProps>(({ sectionName, routeImagen, mensajePrincipal }, ref) => {
  return (
    <div ref={ref} className="flex bg-[#fcf3e3] overflow-hidden gap-9 z-0 flex-col justify-center items-center px-32 w-full text-center text-black bg-white max-md:px-5 max-md:max-w-full">
      <h1 className="text-2xl font-normal font-manrope max-md:max-w-full">
        {mensajePrincipal}
      </h1>
      <h2 className="mt-3 max-phone:mt-1 text-5xl font-lexend max-md:mt-10 max-md:text-4xl">
        {sectionName}
      </h2>
      <Image
        loading="lazy"
        src={routeImagen}
        alt="Completion illustration"
        className="object-contain mt-12 max-w-full max-md:mt-10"
        width={600}
        height={600}
      />
    </div>
  );
});

export default CompletionMessage;
