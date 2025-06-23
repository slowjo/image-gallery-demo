'use client'

import { useRouter } from "next/navigation";

export default function Modal({ children, buttonLabel } : { children : React.ReactNode, buttonLabel : string }) {
  const router = useRouter();

  return (
    <div className="imagemodal">
        {children}
        <button onClick={() => { router.back() }} aria-label={buttonLabel} title={buttonLabel} className={`close-modal-button`}>
            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.5" d="m14 8-4 4 4 4"/>
            </svg>
        </button>
    </div>
  );
}
