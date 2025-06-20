// import { getDictionary } from "@/app/[lang]/dictionaries";
// import ImageGrid from "@/components/ImageGrid";
// import { notFound } from "next/navigation";
import { rovers } from "@/data/rovers";

export async function generateStaticParams() {
  return rovers.map((rover) => ({
    rover: rover,
  }))
}

export default async function DynamicRoverPage(
  {
  // params,
  searchParams,
}: {
  // params: Promise<{ lang: string, rover: string }>,
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
) {
    const sparams = await searchParams;
    // const { lang, rover } = await params;

    // if (!rovers.includes(rover)) {
    //     notFound();
    // }

    // const dict = await getDictionary(lang);

    console.log(sparams);
    
    // const res2 = await fetch(`https://api.nasa.gov/mars-photos/api/v1/manifests/${rover}?api_key=DEMO_KEY`, { next: { revalidate: 3600 } });
    // // const res2 = await fetch(`https://api.nasa.gov/mars-photos/api/v1/manifests/${rover}?api_key=DEMO_KEY`, { next: { revalidate: 3600 } });
    
    // if (!res2.ok) {
    //   return (
    //     <div>
    //         {'There was a problem loading the images'}
    //     </div>
    //   );
    // }

    // const data2 = await res2.json();
    // const sol = solParam || data2.photo_manifest.photos[data2.photo_manifest.photos.length - 1].sol;
    // const sols = data2?.photo_manifest?.photos?.map((item : { sol : number }) => item.sol) || [];

    // const res3 = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&page=1&api_key=DEMO_KEY`, { next: { revalidate: 3600 } });
    
    // if (!res3.ok) {
    //   return (
    //     <div>
    //             {'There was a problem loading the images'}
    //         </div>
    //     );
    //   }

    // const data3 = await res3.json();
    // console.log(solParam, data3, sol, dict, sols);
    // console.log(solParam, dict);
      
    return (
      <div>
        hallo wie gehts?
      </div>
        // <ImageGrid 
        //     key={sol ? sol : 0}
        //     latestPhotos={data3.photos || []}
        //     sol={sol}
        //     sols={sols} 
        //     // latestPhotos={data.latest_photos || []} 
        //     buttonLabel={dict.buttonLabel || ''} 
        //     fullPageViewButton={dict.fullPageViewButton || ''}
        //     rover={rover} 
        // />
    );
}