'use client'

import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

export default function SelectSol({ sols, rover, solProp = 0 } : { sols : number[], rover : string, solProp : number }) {
    const [sol, setSol] = useState(solProp);
    const router = useRouter();

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSol(+e.target.value);
    }

    useEffect(() => {
        if (!sol && sol !== 0) {
            router.push(`/${rover}`);
        } else {
            router.push(`/${rover}?sol=${sol}`);
        }
    }, [sol, rover, router]);

    return (
        <div className="select-sol-container">
            <div>
                <label htmlFor="select-sol">Select a sol</label>
                <select name="select-sol" onChange={handleChange} value={sol} className="select-sol">
                    {sols && sols.map((item) => (
                        <option key={item}>{item}</option>
                    ))}
                </select>
            </div>
        </div>
    );
}