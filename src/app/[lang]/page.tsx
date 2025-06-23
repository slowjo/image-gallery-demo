import { getDictionary } from "@/app/[lang]/dictionaries";
import Image from "next/image";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params;

  const dict = await getDictionary(lang)

  return (
    <main className='startpage-container'>
      <section className="startpage-content">
        <h1>
          <span className="kicker">{dict.titleLargePart}</span><br/>
          <span className="large-header">{dict.titleSmallPart}</span>
        </h1>
        <Image src="https://mars.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/04568/opgs/edr/fcam/FLB_803024383EDR_F1161944FHAZ00200M_.JPG" alt="a photo taken by the mars rover Perseverance" width={1400} height={700} />
      </section>
    </main>
  );
}
