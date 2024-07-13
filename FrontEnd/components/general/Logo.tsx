import Image from "next/image";

function Logo() {
    return ( <a href="/">
        <div className="flex items-center">
            <Image src="/logo.png" alt="logo" width="70" height="70" />
            <h1 className="text-white text-2xl">Spr3ad</h1>
    </div> 
    </a>);
}

export default Logo;