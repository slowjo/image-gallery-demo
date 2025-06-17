'use server'

export const getImages = async (rover : string, page : number) => {
    try {
        const res = await fetch(`https://mars-photos.herokuapp.com/api/v1/rovers/${rover}/latest_photos?page=${page}`, { next: { revalidate: 30 } });
        // const res = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/latest_photos?api_key=DEMO_KEY&page=${page}`, { next: { revalidate: 30 } });
        // console.log('data: ', data);
        if (!res.ok) {
            throw new Error('fetch failed');
        }
        
        const data = await res.json();

        return data?.latest_photos || [];
    } catch (error) {
        console.log(error);
        return [];
    }
}