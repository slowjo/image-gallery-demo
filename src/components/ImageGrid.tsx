'use client'

import Image from "next/image";
import { useState } from "react";

export default function ImageGrid({ latestPhotos, buttonLabel } : { latestPhotos : any, buttonLabel : string }) {
    const [selectedImage, setSelectedImage] = useState('');
    const [showImage, setShowImage] = useState(false);
    const [imageError, setImageError] = useState(false);

    const selectImage = (url : string) => {
        setSelectedImage(url);
        setShowImage(true);
    }

    return(
        <section className="imagegrid-container">
            <ul className="imagegrid">
                {latestPhotos && latestPhotos.map((photo) => (
                <li key={photo.id}>
                    <button tabIndex={0} className="image-button" onClick={() => selectImage(photo.img_src)}>
                        <Image src={imageError ? 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png' : photo.img_src} alt="nasa photo" width="900" height="900" loading="lazy" onError={() => {setImageError(true)}} />
                    </button>
                </li>
            ))}
            </ul>
            <div className={`imagemodal ${showImage ? '' : 'hidden'}`}>
                {
                    selectedImage ? (
                        <Image src={selectedImage} width={2000} height={1600} alt="" className="imagemodal-image" />
                    ) : (
                        null
                    )
                }
            </div>
            <button aria-label={buttonLabel} title={buttonLabel} className={`close-modal-button ${showImage ? '' : 'hidden'}`} onClick={() => {setShowImage(false)}}>
                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.5" d="m14 8-4 4 4 4"/>
                </svg>
            </button>
        </section>
    );
}