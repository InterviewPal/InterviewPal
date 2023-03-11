import Head from 'next/head'
import { useEffect, useState } from 'react'
import ThemeToggle from '@/components/ThemeToggle'
import HeroText from "@/components/HeroText";
import Button from "@/components/Button";
import Image from 'next/image'

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
            <main>
                <ThemeToggle theme={theme} onClick={handleThemeChange} />
                <h1>
                    Interview
                </h1>
            </main>
        </>
    )
}
