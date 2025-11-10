export const fetchCache = "force-no-store";
export const revalidate = 0;

import "@/css/satoshi.css";
import "@/css/style.css";

import "flatpickr/dist/flatpickr.min.css";
import "jsvectormap/dist/jsvectormap.css";

import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import type { PropsWithChildren } from "react";
import { Providers } from "./providers";
import ConditionalLayout from "@/components/Layouts/ConditionalLayout";
import { getSession } from "@/lib/auth";

export const metadata: Metadata = {
  title: {
    template: "%s | NextAdmin - Next.js Dashboard Kit",
    default: "NextAdmin - Next.js Dashboard Kit",
  },
  description:
    "Next.js admin dashboard toolkit with 200+ templates, UI components, and integrations for fast dashboard development.",
};

export default async function RootLayout({ children }: PropsWithChildren) {
  const session = await getSession();
  console.log("Session => ", session);

  if (session?.school_id) {
    const response = await fetch(`http://localhost:3000/api/school`, {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ schoolCode: session.school_id }),
    });

    console.log("Response =>", await response.json());
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <NextTopLoader color="#5750F1" showSpinner={false} />

          <div className="flex min-h-screen">
            <ConditionalLayout>{children}</ConditionalLayout>
          </div>
        </Providers>
      </body>
    </html>
  );
}
