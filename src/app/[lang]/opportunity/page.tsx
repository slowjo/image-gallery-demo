import ImageGridPage from "@/components/ImageGridPage";

export default async function OpportunityPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
    const { lang } = await params;
    
    return (
        <ImageGridPage lang={lang} rover={'opportunity'} />
    );
}