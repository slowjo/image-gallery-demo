'use client'

import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

export default function SelectSol({ sols, rover, solProp = 0, lang } : { sols : number[], rover : string, solProp : number, lang : string }) {
    const [sol, setSol] = useState(solProp);
    const router = useRouter();

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSol(+e.target.value);
    }

    useEffect(() => {
        if (!sol && sol !== 0) {
            router.push(`${lang}/${rover}`);
        } else {
            router.push(`${lang}/${rover}?sol=${sol}`);
        }
    }, [sol, rover, router, lang]);

    return (
        <select onChange={handleChange} value={sol}>
            {sols && sols.map((item) => (
                <option key={item}>{item}</option>
            ))}
        </select>
    );
}