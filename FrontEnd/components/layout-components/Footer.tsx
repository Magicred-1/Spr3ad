import { Copyright } from 'lucide-react';
import Image from 'next/image';

function Footer() {
    return (
        <div className="bg-blue-950 flex justify-between items-center p-2 px-4">
            <p className='text-white flex gap-2'>
                <Copyright />
                Spr3ad - 2024
            </p>
            <p className='text-white flex gap-2'>
                Made with ❤️ during 
                <Image src="/EthGlobalLogo.png" alt="logo" width={25} height={25} />
                ETH Global Brussels
            </p>
        </div>
    );
}

export default Footer;