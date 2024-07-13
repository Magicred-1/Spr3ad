"use client"

function FileInput({
    setFiles
} : {
    setFiles: (files: FileList) => void
}) {

    
    return ( <input type="file" onChange={(event) => {
        const files = event.target.files;
        if (files) {
            setFiles(files);
        }
    }} /> );
}

export default FileInput;