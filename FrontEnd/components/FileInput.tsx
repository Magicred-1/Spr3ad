"use client"
import lighthouse from '@lighthouse-web3/sdk'
import { ImagePlus } from 'lucide-react'
import { Button } from './ui/button'
import { useRef } from 'react'


const progressCallback = (progressData: any) => {
    if (!progressData) {
        return
    }
    const percentageDone = (100 - (progressData.total / progressData.uploaded)).toFixed(2)
    console.log(percentageDone)
}


function FileInput({
    setFiles,
    setIpfsHashes
}: {
    setFiles: React.Dispatch<React.SetStateAction<File[]>>,
    setIpfsHashes: React.Dispatch<React.SetStateAction<string[]>>
}) {

    const inputRef = useRef<HTMLInputElement>(null)

    const uploadFile = async (files: FileList) => {
        // Push file to lighthouse node
        // Both file and folder are supported by upload function
        // Third parameter is for multiple files, if multiple files are to be uploaded at once make it true
        // Fourth parameter is the deal parameters, default null


        const API_KEY = process.env.NEXT_PUBLIC_LIGHTHOUSE_STORAGE_KEY
        if (!API_KEY) {
            throw new Error('API Key not found')
        }

        const output = await lighthouse.upload(files, API_KEY, false, undefined, progressCallback)
        console.log('File Status:', output)

        setIpfsHashes((prev: string[]) => [...prev, output.data.Hash as string])
        setFiles((prev: File[]) => [...prev, ...Array.from(files)]);
        /*
          output:
            data: {
              Name: "filename.txt",
              Size: 88000,
              Hash: "QmWNmn2gr4ZihNPqaC5oTeePsHvFtkWNpjY3cD6Fd5am1w"
            }
          Note: Hash in response is CID.
        */

        console.log('Visit at https://gateway.lighthouse.storage/ipfs/' + output.data.Hash)
    }


    return (
        <Button
            className='rounded-3xl'
            onClick={() => {
                if (inputRef.current) {
                    inputRef.current.click()
                }
            }}
        >
            <ImagePlus />
            <input
                ref={inputRef}
                type="file" style={{ display: 'none' }} accept="image/*" onChange={(event) => {
                    const files = event.target.files;
                    if (files) {
                        uploadFile(files);
                    }
                }} />

        </Button>
    );
}

export default FileInput;