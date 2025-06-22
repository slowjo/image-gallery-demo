'use client'

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname()
    const { photoId } = useParams<{ rover: string | undefined; photoId: string | undefined }>();

    const splitPathName = pathname.split('/');

    const lastPathSegment = splitPathName[splitPathName.length - 1];

    return (
        <>
            { !photoId ? (
                <nav>
                    <ul>
                        <li className="relative flex">
                            <Link tabIndex={0} href="/perseverance" className={`navlink ${lastPathSegment === 'perseverance' ? 'active' : ''}`} prefetch={true}>Perseverance</Link>
                            <div className={`navdivider ${lastPathSegment === 'curiosity' ? 'hidden' : ''}`}></div>
                        </li>
                        <li className="relative flex">
                            <Link tabIndex={0} href="/curiosity" className={`navlink ${lastPathSegment === 'curiosity' ? 'active' : ''}`} prefetch={true}>Curiosity</Link>
                            <div className={`navdivider${lastPathSegment === 'opportunity' ? 'hidden' : ''}`}></div>
                        </li>
                        <li className="relative flex">
                            <Link tabIndex={0} href="/opportunity" className={`navlink ${lastPathSegment === 'opportunity' ? 'active' : ''}`} prefetch={true}>Opportunity</Link>
                            <div className={`navdivider absolute right-0 top-2 bottom-2 w-[2px] bg-black ${lastPathSegment === 'spirit' ? 'hidden' : ''}`}></div>
                        </li>
                        <li className="relative flex">
                            <Link tabIndex={0} href="/spirit" className={`navlink ${lastPathSegment === 'spirit' ? 'active' : ''}`} prefetch={true}>Spirit</Link>
                        </li>
                    </ul>
                </nav>
            ) : (
                null
            ) }
        </>
    );
}