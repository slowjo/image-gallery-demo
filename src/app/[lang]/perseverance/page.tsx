import ImageGridPage from "@/components/ImageGridPage";

export default async function PerseverancePage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
    const { lang } = await params;
    
    return (
        <ImageGridPage lang={lang} rover={'perseverance'} />
    );
}