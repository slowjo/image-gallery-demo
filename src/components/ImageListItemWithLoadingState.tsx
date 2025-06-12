import Image from "next/image";
import { useState } from "react";
import LoadingSquare from "@/components/LoadingSquare";

type Props = {
    selectImage: (url: string) => void; 
    imageSrc: string;
}

export default function ImageListItemWithLoadingState({ selectImage, imageSrc } : Props) {
    const [imageLoading, setImageLoading] = useState(true);
    const [imageError, setImageError] = useState(false);

    const handleLoad = () => {
        setImageLoading(false);
    };

    const handleError = () => {
        setImageLoading(false);
        setImageError(true);
    };

    return (
        <li>
            <LoadingSquare loading={imageLoading} />
            <button tabIndex={0} className={`${imageLoading ? 'opacity-0' : ''}`} onClick={() => selectImage(imageSrc)}>
                <Image src={imageError ? 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png' : imageSrc} alt="nasa photo" width="900" height="900" loading="lazy" onLoad={handleLoad} onError={handleError} />
            </button>
        </li>
    );
}