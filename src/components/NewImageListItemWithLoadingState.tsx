'use client'

import Image from "next/image";
import { useEffect, useState } from "react";
import LoadingSquare from "@/components/LoadingSquare";
import Link from "next/link";

type Props = {
    imageSrc: string;
    fullPageViewButton: string;
    camera: string;
    earthDate: string;
    sol: number;
    rover: string;
    index: number;
}

export default function ImageListItemWithLoadingState({ 
    imageSrc, 
    fullPageViewButton, 
    camera, 
    earthDate,
    sol,
    rover,
    index, 
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

    useEffect(() => {
        setLocalizedDate(new Date(earthDate).toLocaleDateString());
    }, [earthDate]);

    return (
        <li>
            <LoadingSquare />
            <Link href={`/${rover}/${index}?sol=${sol}`} title={fullPageViewButton} aria-label={fullPageViewButton} tabIndex={0} className={`${imageLoading ? 'opacity-0' : ''} ${imageError ? 'disabled' : ''}`}>
                <Image src={imageError ? 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png' : imageSrc} alt={camera ? camera : 'nasa mars rover photo'} width="400" height="400" loading="lazy" onLoad={handleLoad} onError={handleError} unoptimized={true} />
            </Link>
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