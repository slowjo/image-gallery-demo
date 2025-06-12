import { getDictionary } from "@/app/[lang]/dictionaries";
import ImageGrid from "@/components/ImageGrid";
import { notFound } from "next/navigation";
import { rovers } from "@/data/rovers";

export async function generateStaticParams() {
  return rovers.map((rover) => ({
    rover: rover,
  }))
}

export default async function DynamicRoverPage({
  params,
}: {
  params: Promise<{ lang: string, rover: string }>
}) {
    const { lang, rover } = await params;

    if (!rovers.includes(rover)) {
        notFound();
    }

    const dict = await getDictionary(lang);

    const res = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/latest_photos?api_key=DEMO_KEY`, { next: { revalidate: 30 } });
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