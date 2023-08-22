import { useEffect, useMemo, useState } from 'react'
import { useDropzone } from 'react-dropzone'

interface FileWithPreview extends File {
    preview?: string
}

import { usePickerStore } from '../store'

export default function Picker() {
    const [files, setFiles] = useState<FileWithPreview[]>([])
    const [errors, setErrors] = useState<string>('')

    const { pickerState, setPickerState } = usePickerStore((store) => store)

    const { getRootProps, getInputProps, isDragAccept, isDragReject, isDragActive } =
        useDropzone({
            multiple: false,
            accept: {
                'image/*': [],
            },
            maxFiles: 1,
            onDrop: (acceptedFiles, fileRejections) => {
                setPickerState(true)
                setFiles(
                    acceptedFiles.map((file) =>
                        Object.assign(file, {
                            preview: URL.createObjectURL(file),
                        }),
                    ),
                )

                if (!fileRejections.length) setErrors('')

                fileRejections.forEach((file) => {
                    file.errors.forEach((err) => {
                        if (err.code === 'file-too-large') {
                            setErrors(
                                `Error: File is too large to upload. Max size is 1MB.`,
                            )
                        }

                        if (err.code === 'file-invalid-type') {
                            setErrors(`Error: ${err.message}`)
                        }
                    })
                })
            },
            maxSize: 1000000, //1MB
        })

    const thumbs =
        files.length > 0 &&
        files.map((file) => (
            <img
                key={file?.name}
                src={file?.preview}
                alt="preview of the uploaded"
                // Revoke data uri after image is loaded
                onLoad={() => {
                    URL.revokeObjectURL(file?.preview || '')
                }}
            />
        ))

    const styles = useMemo(
        () => ({
            ...(isDragAccept ? { borderColor: '#00e676' } : {}),
            ...(isDragReject ? { borderColor: '#ff1744' } : {}),
        }),
        [isDragAccept, isDragReject],
    )

    useEffect(() => {
        const file = files[0]
        if (!errors) setErrors('')
        if (file) {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onloadend = () => {
                // console.debug(reader.result)
                localStorage.setItem('verificationShot', reader.result as string)
            }
        }

        return () => {
            files.forEach((file) => URL.revokeObjectURL(file?.preview || ''))
        }
    }, [files])

    return (
        <section className="drz-container">
            <div className="dropzone" {...getRootProps({ style: styles })}>
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p className="text-black ff-serif">Drop the image here...</p>
                ) : (
                    <p className="text-black ff-serif">
                        Drag &apos;n&apos; drop the image here, or <br /> click to select
                        an image
                    </p>
                )}
            </div>
            <p
                className="text-red ff-serif"
                style={{
                    display: errors ? 'block' : 'none',
                }}
            >
                {errors}
            </p>
            <div className="images">{thumbs}</div>
        </section>
    )
}
