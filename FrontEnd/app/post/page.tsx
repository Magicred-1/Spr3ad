"use client"

import FileInput from "@/components/FileInput";
import UploadButton from "@/components/UploadButton";
import { useState } from "react";
import { NewPost } from "@/components/general/NewPost";
function CreatePage() {

    const [files, setfiles] = useState<FileList>()

    return (
        <div className="flex flex-col w-full items-center justify-center">
            {/* <FileInput  setFiles={setfiles} />
        <UploadButton files={files} /> */}
            <h1 className="text-white text-2xl font-bold my-4">
                Create a new post
            </h1>
            <NewPost />
        </div>
    );
}

export default CreatePage;