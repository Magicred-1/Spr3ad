"use server"

import lighthouse from '@lighthouse-web3/sdk'


const progressCallback = (progressData : any) => {
    if (!progressData) {
      return
    }
    const percentageDone = (100 - (progressData.total / progressData.uploaded)).toFixed(2)
    console.log(percentageDone)
  }

  export const uploadFile = async(file: File) =>{
    // Push file to lighthouse node
    // Both file and folder are supported by upload function
    // Third parameter is for multiple files, if multiple files are to be uploaded at once make it true
    // Fourth parameter is the deal parameters, default null

    const API_KEY = process.env.LIGHTHOUSE_STORAGE_KEY
    if (!API_KEY) {
      throw new Error('API Key not found')
    }
    const output = await lighthouse.upload(file, API_KEY , false, undefined, progressCallback)
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
