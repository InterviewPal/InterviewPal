import Head from 'next/head'
import { useEffect, useState } from 'react'
import Navbar from "@/components/Navbar";
import Image from 'next/image';

export default function Home() {
    const [theme, setTheme] = useState(null as 'light' | 'dark' | null)
    const [question, setQuestion] = useState(null as string | null)

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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(e.target.answer.value);
    }

    return (
        <>
            <Head>
                <title>InterviewPal</title>
                <meta name="description" content="Interview Practice AI" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar logo={false} theme={theme} onClick={handleThemeChange} />
            <main className="text-rosePineDawn-text dark:text-rosePineMoon-text">
                <div className="flex flex-row">
                    <div className="flex flex-col w-1/5 items-center">
                        <Image src="/logo.png" alt="Icon" width={500} height={500} className="w-1/2 -mb-14 z-10" />
                        <Image src="/suit.svg" alt="Suit" width={500} height={500} />
                    </div>
                    <div className="flex flex-col w-4/5 bg-rosePineDawn-highlightMed dark:bg-rosePine-highlightMed justify-end">
                        {question === null ? (
                            <div className="flex flex-col items-center py-24 xl:py-44">
                            <h1 className="text-4xl font-bold">Question</h1>
                            <p className="text-xl mt-4">{question}</p>
                        </div>
                        ) : undefined}
                        <form method="post" onSubmit={handleSubmit} className="flex flex-row">
                            <textarea name="answer" id="answer" className="bg-rosePineDawn-highlightLow dark:bg-rosePine-highlightLow resize-none w-full dark:border-white border-black border-2 p-4" placeholder="Type your answer here..."></textarea>
                            <button type="submit" className="bg-rosePineDawn-highlightLow dark:bg-rosePine-highlightLow p-4 dark:border-white border-black border-2">Submit</button>
                        </form>
                    </div>
                </div>
            </main>
        </>
    )
}
