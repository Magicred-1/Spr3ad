"use server"

import lighthouse from '@lighthouse-web3/sdk'
import { writeFile } from 'fs'


const progressCallback = (progressData : any) => {
    if (!progressData) {
      return
    }
    const percentageDone = (100 - (progressData.total / progressData.uploaded)).toFixed(2)
    console.log(percentageDone)
  }

  export const uploadFile = async(fileInput: FormData) =>{
    // Push file to lighthouse node
    // Both file and folder are supported by upload function
    // Third parameter is for multiple files, if multiple files are to be uploaded at once make it true
    // Fourth parameter is the deal parameters, default null

    const file = fileInput.get("file") as File;
    const filePath = "uploads/" + file.name;
    const fileBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(fileBuffer);
    writeFile(filePath, buffer , (err) => {
      if (err) {
        console.error(err)
        return
      }
    })


    const API_KEY = process.env.LIGHTHOUSE_STORAGE_KEY
    if (!API_KEY) {
      throw new Error('API Key not found')
    }
    
    const output = await lighthouse.upload(filePath, API_KEY , false, undefined, progressCallback)
    console.log('File Status:', output)
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


  export const uploadServerAction = async (files: FileList) => {
    console.log("🚀 ~ uploadServerAction ~ files")
    for (let i = 0; i < files.length; i++) {
      const file = files.item(i)
      if (!file) {
        continue
      }
      console.log("🚀 ~ uploadServerAction ~ file:", file.name)
    }
  }
    