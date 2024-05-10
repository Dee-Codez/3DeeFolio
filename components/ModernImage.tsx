import Image from "next/image";

function ModernImage({src, alt, width, height, cn="", txtcn="text-xl text-white "}) {
  
    return (
      <div className={`relative group`}>
          <div className={`group-hover:blur-sm ${cn}`}>
              <Image src={src} alt={alt} width={width} height={height} />
          </div>
          <p className={`absolute font-bold text-center inset-0 z-20 flex blur-0 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${txtcn}`}>{alt}</p>
      </div>
    );
  }
  
  export { ModernImage };