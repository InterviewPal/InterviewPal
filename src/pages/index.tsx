import Head from 'next/head'
import { useEffect, useState } from 'react'
import HeroText from "@/components/HeroText";
import Button from "@/components/Button";
import { useRouter } from 'next/router'
import Navbar from "@/components/Navbar";

export default function Home() {
    const [theme, setTheme] = useState(null as 'light' | 'dark' | null);
    const router = useRouter();

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
                <div className="flex flex-col items-center justify-center py-24 xl:py-44">
                    <HeroText />
                    <div className="flex justify-center mt-12">
                        <Button content="Start Now" arrow onClick={() => router.push('/interview')}></Button>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 py-12 mx-auto text-rosePineDawn-text dark:text-rosePineMoon-text">
                    <h2 className="text-4xl font-bold text-center" id="about">Why we made the app</h2>
                    <p className="text-xl text-center">InterviewPal is an AI that helps you practice for your interviews. It will ask you questions and give you feedback on your answers.</p>
                </div>
            </main>
        </>
    )
}
