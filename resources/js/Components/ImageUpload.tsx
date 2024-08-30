import React, { useState, useRef, ChangeEvent } from 'react';

interface ImageUploadProps {
    onImageUpload: (file: File) => void;
    source?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload, source }) => {
    const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(null);
    const imageRef = useRef<HTMLInputElement | null>(null);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        if (!file) {
            return;
        }
        onImageUpload(file);
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setImagePreview(fileReader.result);
        };
        fileReader.readAsDataURL(file);
    };

    return (
        <div
            className="w-full h-52 border-2 rounded-lg border-dashed border-gray-300 flex justify-center items-center"
            onClick={() => imageRef.current?.click()}
        >
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="image-upload"
                ref={imageRef}
            />
            {imagePreview && (
                <img
                    className="w-full h-full object-contain"
                    src={imagePreview as string}
                    alt="Image Preview"
                />
            )}
            {!source && !imagePreview && (
                <h3 className="text-gray-400 text-xl font-bold">انتخاب عکس</h3>
            )}
            {source && !imagePreview && (
                <img
                    className="w-full h-full object-contain"
                    src={`/${source}`}
                    alt="Uploaded Image"
                />
            )}
        </div>
    );
};

export default ImageUpload;
