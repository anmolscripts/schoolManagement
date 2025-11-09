'use client';
import type { PropsWithChildren } from "react";
import { usePathname } from 'next/navigation';
import { Sidebar } from "@/components/Layouts/sidebar";
import { Header } from "@/components/Layouts/header";

export default function ConditionalLayout({ children }: PropsWithChildren) {
    const pathname = usePathname();
    const isAuthRoute = pathname.startsWith('/auth');

    if (isAuthRoute) {
        return <>{children}</>;
    }

    return (
        <>
            <Sidebar />
            <div className="w-full bg-gray-2 dark:bg-[#020d1a] relative">
                <Header />
                <main className="isolate mx-auto w-full overflow-hidden px-5 m-5">
                    
                    {children}
                </main>
            </div>
        </>
    );
}