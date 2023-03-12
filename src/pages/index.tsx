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
            <main className="text-rosePineDawn-text dark:text-rosePineMoon-text">
                <div className="flex flex-col items-center justify-center py-24 xl:py-44">
                    <HeroText />
                    <div className="flex justify-center mt-12">
                        <Button content="Start Now" arrow onClick={() => router.push('/interview')}></Button>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 mx-auto w-5/6">
                    <h2 className="text-4xl font-bold text-center" id="about">What is InterviewPal?</h2>
                    <p className="text-xl text-center">InterviewPal is an AI that helps you practice for your interviews. It will ask you questions and give you feedback on your answers.</p>
                </div>
                <div className="flex flex-col items-center justify-center py-12 xl:py-24">
                    <hr className="border-rosePineDawn-text dark:border-rosePineMoon-text w-5/6 border-2" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 mx-auto w-5/6">
                    <h2 className="text-4xl font-bold text-center flex justify-center" id="about">Why we made InterviewPal.</h2>
                    <div className="flex flex-col items-center justify-center">
                        <p className="text-xl text-center py-4">As a development team, we are proud to introduce InterviewPal, an innovative app that leverages the power of AI to help job seekers prepare for interviews. In recent years, the job market has become increasingly competitive, with a fluctuating workforce that has been further impacted by the COVID-19 pandemic. With so many qualified candidates vying for limited job opportunities, it can be challenging for job seekers to stand out from the crowd and showcase their skills effectively.</p>
                        <p className="text-xl text-center py-4">That's where InterviewPal comes in. Our app offers a range of features that enable users to practice answering common interview questions, refine their communication skills, and build their confidence. With the help of GPT 3.5, our app can analyze the user's responses and provide personalized feedback on their strengths and areas for improvement.</p>
                        <p className="text-xl text-center py-4">We believe that InterviewPal has the potential to be a game-changer for job seekers in this challenging job market. By providing a powerful tool to practice and refine their interview skills, we hope to help more people land their dream jobs and achieve success in their careers.</p>
                    </div>
                </div>
            </main>
        </>
    )
}
