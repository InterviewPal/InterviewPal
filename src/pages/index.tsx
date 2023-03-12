import Head from 'next/head'
import HeroText from "@/components/HeroText";
import Button from "@/components/Button";
import {useRouter} from 'next/router'
import Navbar from "@/components/Navbar";
import GithubLink from '@/components/GithubLink';
import * as InterviewService from '@/lib/client/services/interview.service';
import {InterviewType} from "@/lib/shared/models/interview.models";
import {useState} from "react";

export default function Home() {
    const router = useRouter();

    const [isMutating, setIsMutating] = useState(false);

    const handleStart = async () => {
        setIsMutating(true);
        const interview = await InterviewService.createInterview({type: InterviewType.personalQuestions});
        if (!interview) {
            // TODO: Handle error and show the error to the user
            return;
        }
        router.push(`/interview/${interview.uuid}`);
    };

    return (
        <>
            <Head>
                <title>InterviewPal</title>
                <meta name="description" content="Interview Practice AI" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar logo />
            <main className="text-rosePineDawn-text dark:text-rosePineMoon-text pt-24">
                <div className="flex flex-col items-center justify-center py-24 xl:py-44">
                    <HeroText />
                    <div className="flex justify-center mt-12">
                        <Button content="Start Now" arrow onClick={handleStart} isLoading={isMutating} />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 mx-auto w-5/6">
                    <h2 className="text-4xl font-bold text-center pt-2" id="about">What is InterviewPal?</h2>
                    <p className="text-xl text-center">InterviewPal is an AI that helps you practice for your interviews. It will ask you questions and give you feedback on your answers.</p>
                </div>
                <div className="flex flex-col items-center justify-center py-12 xl:py-24">
                    <hr className="border-rosePineDawn-text dark:border-rosePineMoon-text w-5/6 border-2 mt-3" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 mx-auto w-5/6">
                    <h2 className="text-4xl font-bold text-center flex justify-center pt-6" id="about">Why we made InterviewPal</h2>
                    <div className="flex flex-col items-center justify-center pb-24">
                        <p className="text-xl text-center py-4">We are proud to introduce InterviewPal, an innovative app that leverages the power of AI to help job seekers prepare for interviews. In recent years, the job market has become increasingly competitive, with a fluctuating workforce further impacted by the COVID-19 pandemic. With so many qualified candidates vying for limited job opportunities, it can be challenging for job seekers to showcase their skills effectively and navigate interviews. That&apos;s where InterviewPal comes in.</p>
                        <p className="text-xl text-center py-4">Our app offers a range of features that enables users to practice answering common interview questions, refine their communication skills, and build their confidence. With the help of GPT 3.5, our app can analyze the user&apos;s responses and provide personalized, constructive feedback.</p>
                        <p className="text-xl text-center py-4">We believe that InterviewPal has the potential to be a game-changer for job seekers in this challenging job market. By providing a powerful tool to practice and refine their interview skills, we hope to help more people land their dream jobs and achieve success in their careers.</p>
                    </div>
                </div>
                <footer className="flex justify-center pb-12">
                    <GithubLink />
                </footer>
            </main>
        </>
    )
}
