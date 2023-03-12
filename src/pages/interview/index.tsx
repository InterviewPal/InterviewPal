import Head from 'next/head'
import { useEffect, useState } from 'react'
import Navbar from "@/components/Navbar";

export default function Home() {
    const [theme, setTheme] = useState(null as 'light' | 'dark' | null)

    useEffect(() => {
        const theme = localStorage.getItem('theme');
        if (theme === 'light' || theme === 'dark') {
            setTheme(theme);
        } else {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (prefersDark) {
                setTheme('dark');
            } else {
                setTheme('light');
            }
        }
    }, []);

    useEffect(() => {
        if (theme === 'light') {
            document.documentElement.classList.remove('dark');
        } else if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        }
    }, [theme]);

    const handleThemeChange = () => {
        if (theme === 'light') {
            localStorage.setItem('theme', 'dark');
            setTheme('dark');
        } else if (theme === 'dark') {
            localStorage.setItem('theme', 'light');
            setTheme('light');
        }
    };

    return (
        <>
            <Head>
                <title>InterviewPal</title>
                <meta name="description" content="Interview Practice AI" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar theme={theme} onClick={handleThemeChange} />
            <main>
                {/* 2 wide flex with one element beign 1/5 wide the other being 4/5 wide */}
                <div className="flex flex-row">
                    <div className="flex flex-col w-1/5 bg-white"></div>
                    <div className="flex flex-col w-4/5 bg-red-900"></div>
                </div>
            </main>
        </>
    )
}
