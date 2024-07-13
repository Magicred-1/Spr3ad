"use client"

import FileInput from "@/components/FileInput";
import UploadButton from "@/components/UploadButton";
import { useState } from "react";

function CreatePage() {

    const [files, setfiles] = useState<FileList>()

    return ( <div>
        <FileInput  setFiles={setfiles} />
        <UploadButton files={files} />


    </div> );
}

export default CreatePage;