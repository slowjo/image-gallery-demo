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
    );
}