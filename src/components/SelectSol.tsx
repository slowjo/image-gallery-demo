'use client'

import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

export default function SelectSol({ sols, rover, solProp } : { sols : number[], rover : string, solProp : number }) {
    const [sol, setSol] = useState<number>(solProp);
    const router = useRouter();

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSol(+e.target.value);
    }

    useEffect(() => {
        if (!sol && sol !== 0) {
            router.push(`/${rover}`);
            // router.refresh();
        } else {
            router.push(`/${rover}?sol=${sol}`);
            // router.refresh();
        }
    }, [sol, rover, router]);

    return (
        <select onChange={handleChange} value={sol}>
            {sols && sols.map((item) => (
                <option key={item}>{item}</option>
            ))}
        </select>
    );
}