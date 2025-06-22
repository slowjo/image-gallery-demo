'use client'

// import Image from "next/image";
import { Ref, useCallback, useRef, useState } from "react";
import NewImageListItemWithLoadingState from "@/components/NewImageListItemWithLoadingState";
import { getImages } from "@/app/actions";
import SelectSol from "@/components/SelectSol";
// import Link from "next/link";

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

export default function ImageGrid(
    { latestPhotos, buttonLabel, fullPageViewButton, rover, sol, sols } : { latestPhotos : photoDataType[], buttonLabel : string, fullPageViewButton : string, rover : string, sol : number, sols : number[] }
) {
    // const [selectedImage, setSelectedImage] = useState('');
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
                    console.log(rover, page, sol);
                    const moreImages = await getImages(rover, page, sol);
                    console.log('moreImages', moreImages);
                    if (!moreImages || !moreImages.length) {
                        setMaybeNoMorePhotos(true);
                    } else {
                        setMaybeNoMorePhotos(false);
                        setPage((prev) => prev + 1);
                    }
                    setPhotos((prev) => [
                        ...prev,
                        ...moreImages
                    ]);
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
    }, [page, maybeNoMorePhotos, rover, sol]);

    // const selectImage = (url : string) => {
    //     setSelectedImage(url);
    //     setShowImage(true);
    // }

    // console.log(sols, rover, sol);

    return(
        <section className="imagegrid-container">
            <SelectSol sols={sols} rover={rover} solProp={sol} />
            <ul className="imagegrid">
                {photos && photos.map((photo, index) => (
                // {photos && photos.map((photo, index) => (
                <div key={photo.id} 
                // ref={
                //         (index === photos.length - 1 ? lastImage : null) as Ref<HTMLDivElement>
                //     }
                    >
                    <NewImageListItemWithLoadingState imageSrc={photo.img_src} fullPageViewButton={fullPageViewButton} camera={photo?.camera?.full_name || ''} earthDate={photo?.earth_date || ''} sol={photo.sol} rover={rover} index={index} />
                </div>    
            ))}
            </ul>

            <div className={`loading-spinner ${!loading ? 'opacity-0' : ''}`} ref={lastImage as Ref<HTMLDivElement>}>
                <svg aria-hidden="true" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
            </div>

            {/* <div className={`imagemodal ${showImage ? '' : 'hidden'}`}>
                {
                    selectedImage ? (
                        <Image src={selectedImage} width={2000} height={1600} alt="" className="imagemodal-image" />
                    ) : (
                        null
                    )
                }
            </div> */}

            <button aria-label={buttonLabel} title={buttonLabel} className={`close-modal-button ${showImage ? '' : 'hidden'}`} onClick={() => {setShowImage(false)}}>
                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.5" d="m14 8-4 4 4 4"/>
                </svg>
            </button>
        </section>
    );
}