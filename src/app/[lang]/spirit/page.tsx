import ImageGridPage from "@/components/ImageGridPage";

export default async function SpiritPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
    const { lang } = await params;
    
    return (
        <ImageGridPage lang={lang} rover={'spirit'} />
    );
}