import CursoProvider from "@/providers/CursoActualProvider";
import "./globals.css";
import ConvexClerkProvider from "@/providers/ConvexClerkProvider";
import { Metadata } from "next";
import { Manrope } from "next/font/google";
import CurrentUserProvider from "@/providers/CurrentUserProv";

const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Plataforma emprendedores",
  description: "Plataforma online comunitaria y colaborativa de capacitación en emprendimiento",
  icons: {
    icon: '/icons/logo.svg'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ConvexClerkProvider>
        <CurrentUserProvider>
          <CursoProvider >
            <body className={`${manrope.className}`}>
              {children}
            </body>
          </CursoProvider>
        </CurrentUserProvider>


      </ConvexClerkProvider>
    </html>
  );
}