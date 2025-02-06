import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import Nav from "@/components/store/Nav";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "Easy Therapy",
  description: "Mental health chatbot",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${inter.variable} antialiased relative`}>
      <div className="h-auto fixed lg:top-10 top-4 w-full lg:w-[42%] lg:left-[29%] z-50">
        <Nav />
      </div>
      <main>{children}</main>
    </div>
  );
}
