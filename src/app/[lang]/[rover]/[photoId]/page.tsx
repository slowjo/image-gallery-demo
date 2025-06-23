import { getDictionary } from "@/app/[lang]/dictionaries";
import { notFound } from "next/navigation";
import { rovers } from "@/data/rovers";
import Image from "next/image";
import Link from "next/link";

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

    const data = await res.json();
      
    return (
        <div className="imagepage">
            <Image src={data?.photos[+photoId % 25]?.img_src} alt={''} width={2000} height={1000} />
            <Link href={`/${rover}?sol=${sol}`} aria-label={dict.buttonLabel} title={dict.buttonLabel} className={`close-modal-button`}>
                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.5" d="m14 8-4 4 4 4"/>
                </svg>
            </Link>
        </div>
    );
}