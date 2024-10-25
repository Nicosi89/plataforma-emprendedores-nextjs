//import MobileNav from "@/components/MobileNav";
//import { Toaster } from "@/components/ui/toaster"

//página de bienvenida (landing page). Cuando no se está logueado ej: https://businessmadesimple.com/

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="relative flex min-h-screen">
            <main className="flex w-full h-full">
                {children}
            </main>
        </div>
    );
}
