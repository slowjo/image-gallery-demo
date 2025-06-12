import { getDictionary } from "@/app/[lang]/dictionaries";
import ImageGrid from "@/components/ImageGrid";

export default async function ImageGridPage({ lang, rover } : { lang : string, rover: string }) {
    const dict = await getDictionary(lang)
    
    const res = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/latest_photos?api_key=DEMO_KEY`);
    const data = await res.json();
    console.log('data: ', data);

    if (!res.ok) {
        return (
            <div>
                {data?.error?.message || 'There was a problem loading the images'}
            </div>
        );
    }

    return (
        <ImageGrid latestPhotos={data.latest_photos || []} buttonLabel={dict.buttonLabel || ''} />
    );
}