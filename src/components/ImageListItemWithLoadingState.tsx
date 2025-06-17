'use client'

import Image from "next/image";
import { useEffect, useState } from "react";
import LoadingSquare from "@/components/LoadingSquare";

type Props = {
    selectImage: (url: string) => void; 
    imageSrc: string;
    fullPageViewButton: string;
    camera: string;
    earthDate: string;
    sol: number;
}

export default function ImageListItemWithLoadingState({ 
    selectImage, 
    imageSrc, 
    fullPageViewButton, 
    camera, 
    earthDate,
    sol, 
} : Props) {
    const [imageLoading, setImageLoading] = useState(true);
    const [imageError, setImageError] = useState(false);
    const [localizedDate, setLocalizedDate] = useState('');

    const handleLoad = () => {
        setImageLoading(false);
    };

    const handleError = () => {
        setImageLoading(false);
        setImageError(true);
    };

    const handleClick = () => {
        selectImage(imageSrc);
    }

    useEffect(() => {
        setLocalizedDate(new Date(earthDate).toLocaleDateString());
    }, [earthDate]);

    return (
        <li>
            <LoadingSquare loading={imageLoading} />
            <button title={fullPageViewButton} aria-label={fullPageViewButton} tabIndex={0} className={`${imageLoading ? 'opacity-0' : ''} ${imageError ? 'disabled' : ''}`} onClick={handleClick} disabled={imageError}>
                <Image src={imageError ? 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png' : imageSrc} alt="nasa photo" width="400" height="400" loading="lazy" onLoad={handleLoad} onError={handleError} unoptimized={true} />
            </button>
            {
                !imageError ? (<div className="button-overlay">
                    <p>
                        Earth date: {localizedDate}<br/>
                        Camera: {camera}<br/>
                        Martian sol since landing: {sol}
                    </p>
                </div>) : null
            }
        </li>
    );
}