"use client"

import { uploadFile, uploadServerAction } from "@/server/uploadContent";
import { Button } from "./ui/button";


const filesToFormData = (files: FileList) => {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
        formData.append("file", files[i]);
    }
    return formData;
}

function UploadButton({ files }: {
    files: FileList | undefined
}) {
    const upload = async (files: FileList) => {

        const formData = filesToFormData(files);

        const response = await uploadFile(formData);
        // const response2 = await uploadServerAction(files);
        // console.log("🚀 ~ upload ~ response2:", response2)
        console.log("🚀 ~ upload ~ response:", response)
    }

    return (<Button onClick={() => {
        if (!files) {
            return;
        }
        upload(files)
    }}>Upload</Button>);
}

export default UploadButton;