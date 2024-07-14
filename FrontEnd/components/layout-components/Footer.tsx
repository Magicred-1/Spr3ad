import { uploadFile } from '@/server/uploadContent';
import { Copyright } from 'lucide-react';
import Image from 'next/image';

function Footer() {
    return (
        <div className="bg-blue-950 flex justify-between items-center p-2 px-4 text-xs mt-4">
            <div className='text-white flex items-center gap-2'>
                <Copyright size={10} />
                <p className='text-center'>Spr3ad <br/> 2024</p>        
            </div>
            <div className='text-white flex items-center gap-2'>
                <p className='text-center'>Made with ❤️ <br/> during</p>
                <Image src="/EthGlobalLogo.png" alt="logo" width={25} height={25} className='w-7 h-7' />
                <p className='text-center'>ETH Global <br/> Brussels</p>
            </div>
        </div>
    );
}

export default Footer;