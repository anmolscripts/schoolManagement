import { getSession } from "@/lib/auth";
import "@/css/style.css";
import "@/css/satoshi.css";
import ConditionalLayout from "@/components/Layouts/ConditionalLayout";
import { Providers } from "./providers";
import { connectDB } from "@/lib/db";
import School from "@/models/School";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  let school = null;

  if (session) {
    await connectDB();
    // @ts-ignore
    school = await School.findOne({ school_id: session.school_id }).lean();
  }

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Providers>
          <div className="dark:bg-boxdark-2 dark:text-bodydark">
            <ConditionalLayout session={session as any} school={school as any}>
              {children}
            </ConditionalLayout>
          </div>
        </Providers>
      </body>
    </html>
  );
}
