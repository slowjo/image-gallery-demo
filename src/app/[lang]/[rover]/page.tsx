import { getDictionary } from "@/app/[lang]/dictionaries";
import ImageGrid from "@/components/ImageGrid";
import { notFound } from "next/navigation";
import { rovers } from "@/data/rovers";

export default async function DynamicRoverPage(
  {
  params,
  searchParams,
}: {
  params: Promise<{ lang: string, rover: string }>,
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
) {
    const { lang, rover } = await params;
    const { sol : solParam } = await searchParams;

    if (!rovers.includes(rover)) {
        notFound();
    }

    const dict = await getDictionary(lang);
    
    const res = await fetch(`https://mars-photos.herokuapp.com/api/v1/manifests/${rover}?api_key=DEMO_KEY`, { next: { revalidate: 3600 } });
    // const res = await fetch(`https://api.nasa.gov/mars-photos/api/v1/manifests/${rover}?api_key=DEMO_KEY`, { next: { revalidate: 3600 } });
    
    if (!res.ok) {
      console.log(res);

      return (
        <div>
            {'There was a problem loading the images'}
        </div>
      );
    }

    const data = await res.json();
    const sol = solParam || data.photo_manifest.photos[data.photo_manifest.photos.length - 1].sol;
    const sols = data?.photo_manifest?.photos?.map((item : { sol : number }) => item.sol) || [];

    const res2 = await fetch(`https://mars-photos.herokuapp.com/api/v1/rovers/${rover}/photos?sol=${sol}&page=1&api_key=DEMO_KEY`, { next: { revalidate: 3600 } });
    // const res2 = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&page=1&api_key=DEMO_KEY`, { next: { revalidate: 3600 } });
    
    if (!res2.ok) {
      console.log(res2);

      return (
        <div>
            {'There was a problem loading the images'}
        </div>
        );
      }

    const data2 = await res2.json();
      
    return (
        <ImageGrid
            key={sol ? sol : 0}
            latestPhotos={data2.photos || []}
            sol={sol}
            sols={sols} 
            buttonLabel={dict.buttonLabel || ''} 
            fullPageViewButton={dict.fullPageViewButton || ''}
            rover={rover} 
        />
    );
}