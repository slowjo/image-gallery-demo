import { getDictionary } from "@/app/[lang]/dictionaries";
import { notFound } from "next/navigation";
import { rovers } from "@/data/rovers";
import Image from "next/image";
import Modal from "@/app/[lang]/[rover]/@modal/(..)[rover]/[photoId]/modal";


export default async function PhotoPage(
  {
  params,
  searchParams,
}: {
  params: Promise<{ lang: string, rover: string, photoId : number }>,
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
) {
    const { lang, rover, photoId } = await params;
    const { sol } = await searchParams;

    if (!rovers.includes(rover)) {
        notFound();
    }

    const dict = await getDictionary(lang);
    
    // const res2 = await fetch(`https://api.nasa.gov/mars-photos/api/v1/manifests/${rover}?api_key=DEMO_KEY`, { next: { revalidate: 3600 } });
    
    // if (!res2.ok) {
    //   return (
    //     <div>
    //         {'There was a problem loading the images'}
    //     </div>
    //   );
    // }

    // const data2 = await res2.json();
    // const sols = data2?.photo_manifest?.photos?.map((item : { sol : number }) => item.sol) || [];

    const page = Math.floor(photoId / 25) + 1;

    const res = await fetch(`https://mars-photos.herokuapp.com/api/v1/rovers/${rover}/photos?sol=${sol}&page=${page}&api_key=DEMO_KEY`, { next: { revalidate: 3600 } });
    // const res = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&page=${page}&api_key=DEMO_KEY`, { next: { revalidate: 3600 } });
    
    if (!res.ok) {
      return (
        <div>
            {'There was a problem loading the images'}
        </div>
        );
      }

    const data3 = await res.json();
      
    return (
          <Modal buttonLabel={dict?.buttonLabel || ''}>
              <Image src={data3?.photos[+photoId % 25]?.img_src} alt={''} width={2000} height={1000} />
          </Modal>
            // <div className="imagemodal">
            //     <Image src={data3?.photos[+photoId % 25]?.img_src} alt={''} width={2000} height={1000} />
            //     <button onClick={() => {  }} aria-label='' title='' className={`close-modal-button`}>
            //     {/* <Link href={`/${rover}?sol=${sol}`} aria-label='' title='' className={`close-modal-button`}> */}
            //     {/* <button aria-label={buttonLabel} title={buttonLabel} className={`close-modal-button ${showImage ? '' : 'hidden'}`} onClick={() => {setShowImage(false)}}> */}
            //         <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            //             <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.5" d="m14 8-4 4 4 4"/>
            //         </svg>
            //     </button>
            //     {/* </Link> */}
            // </div>
    );
}