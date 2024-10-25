import Image from "next/image";

function TarjetaIdeaMov() {
  return (
    <div
      className="flex overflow-hidden flex-col justify-between bg-white rounded-3xl border-2 border-black border-solid max-w-[889px] shadow-[10px_10px_4px_rgba(0,0,0,1)]"
    >
      <div className="flex overflow-hidden flex-col w-full font-semibold text-white min-h-[54px] max-md:max-w-full">
        <div className="flex flex-wrap gap-10 justify-between items-center px-5 w-full bg-pink-600 min-h-[54px] max-md:max-w-full">
          <div  className="self-stretch my-auto text-3xl">
            QUE BUENA IDEA
          </div>
          <div
            className="flex gap-1.5 items-start self-stretch my-auto text-xl whitespace-nowrap"
          >
            <div  className="w-[110px]">
              Compartir
            </div>
            <Image
                    src="/dazzle-line-man-with-light-bulb-generating-ideas-1.png"
                    className="contain shrink flex relative w-8"
                    alt="compartir"
                    width={800}
                    height={50}
                />
            
          </div>
        </div>
      </div>
      <div className="flex flex-1 gap-2.5 justify-center pl-5 text-2xl text-black size-full max-md:max-w-full">
        <div
          className="flex overflow-hidden flex-1 shrink gap-2.5 py-4 min-w-[240px] size-full max-md:max-w-full"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco
        </div>
      </div>
    </div>
  );
}

export default TarjetaIdeaMov
