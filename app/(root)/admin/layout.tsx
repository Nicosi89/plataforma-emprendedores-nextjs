import React from 'react'

function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (

        <div className='relative px-9 w-full' >
            {children}
        </div>

    );
}


export default RootLayout
