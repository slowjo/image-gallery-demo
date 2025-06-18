'use client'

import Image from "next/image";
import { Ref, useCallback, useRef, useState } from "react";
import ImageListItemWithLoadingState from "./ImageListItemWithLoadingState";
import { getImages } from "@/app/[lang]/[rover]/actions";

type photoDataType = {
    id: string;
    img_src: string;
    camera: {
        full_name: string;
    };
    earth_date: string;
    sol: number;
    rover: string;
}

export default function ImageGrid({ latestPhotos, buttonLabel, fullPageViewButton, rover } : { latestPhotos : photoDataType[], buttonLabel : string, fullPageViewButton : string, rover: string }) {
    const [selectedImage, setSelectedImage] = useState('');
    const [showImage, setShowImage] = useState(false);
    const [page, setPage] = useState(2);
    const [photos, setPhotos] = useState(latestPhotos);
    const [maybeNoMorePhotos, setMaybeNoMorePhotos] = useState(false);
    const [loading, setLoading] = useState(false);
    const observer = useRef<IntersectionObserver | null>(null);

    const lastImage = useCallback((node : Element) => {
        if (!node) {
            return;
        }
        if (observer.current) {
            observer.current.disconnect();
        }
        observer.current = new IntersectionObserver(
        async (entries) => {
            if (entries[0].isIntersecting) {
                console.log('intersecting');
                try {
                    setLoading(true);
                    const moreImages = await getImages(rover, page);
                    if (!moreImages || !moreImages.length) {
                        setMaybeNoMorePhotos(true);
                    } else {
                        setMaybeNoMorePhotos(false);
                    }
                    setPhotos((prev) => [
                        ...prev,
                        ...moreImages
                    ]);
                    setPage((prev) => prev + 1);
                } catch {
                    setMaybeNoMorePhotos(true);
                    console.log('fetch failed on the client');
                } finally {
                    setLoading(false);
                }
            }
        }, { threshold: 1.0 });
        if (maybeNoMorePhotos) {
            setTimeout(() => {
                if (observer.current) {
                    observer.current.observe(node);
                    console.log('observer observing again after timeout');
                }
            }, 5000)    
        } else {
            observer.current.observe(node);
            console.log('observer observing again');
        }
    }, [page, maybeNoMorePhotos, rover]);

    const selectImage = (url : string) => {
        setSelectedImage(url);
        setShowImage(true);
    }

    return(
        <section className="imagegrid-container">
            <ul className="imagegrid">
                {photos && photos.map((photo, index) => (
                <div key={photo.id} ref={
                        (index === photos.length - 1 ? lastImage : null) as Ref<HTMLDivElement>
                    }>
                    <ImageListItemWithLoadingState selectImage={selectImage} imageSrc={photo.img_src} fullPageViewButton={fullPageViewButton} camera={photo?.camera?.full_name || ''} earthDate={photo?.earth_date || ''} sol={photo.sol} />
                </div>    
            ))}
            </ul>
            {
                loading ? (
                    <div className="loading-spinner">
                        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.651 7.65a7.131 7.131 0 0 0-12.68 3.15M18.001 4v4h-4m-7.652 8.35a7.13 7.13 0 0 0 12.68-3.15M6 20v-4h4"/>
                        </svg>
                    </div>
                ) : (
                    null
                )
            }
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