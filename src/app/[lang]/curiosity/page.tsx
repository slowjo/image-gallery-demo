import ImageGridPage from "@/components/ImageGridPage";

export default async function CuriosityPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
    const { lang } = await params;
    
    return (
        <ImageGridPage lang={lang} rover={'curiosity'} />
    );
}