import Head from 'next/head'
import {useEffect, useState} from 'react'
import Navbar from "@/components/Navbar";
import Image from 'next/image';

export default function Home() {
    const [question, setQuestion] = useState(null as string | null)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(e.target.answer.value);
    }

    return (
        <>
            <Head>
                <title>InterviewPal</title>
                <meta name="description" content="Interview Practice AI"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Navbar logo={false} />
            <main className="text-rosePineDawn-text dark:text-rosePineMoon-text">
                <div className="flex flex-row pr-11">
                    <div className="flex flex-col w-1/5 items-center">
                        <Image src="/logo.png" alt="Icon" width={500} height={500} className="w-1/2 z-10"/>
                        <Image src="/suit.svg" alt="Suit" width={0} height={0} className={'w-[500px] h-[500px]'}/>
                    </div>
                    <div
                        className="flex flex-col w-4/5 rounded-2xl bg-rosePineDawn-highlightMed dark:bg-rosePine-highlightMed justify-between">
                        {question === null ? (
                            <div className="flex flex-col flex-grow-1 items-center py-24 xl:py-44">
                                <h1 className="text-4xl font-bold">Question</h1>
                                <p className="text-xl mt-4">{question}</p>
                            </div>
                        ) : undefined}
                        <form method="post" onSubmit={handleSubmit} className="flex flex-row">
                            <textarea onInput={(event) => {
                                const element = event.target as HTMLTextAreaElement;
                                element.style.height = "5px";
                                element.style.height = (element.scrollHeight + 5) + "px";
                            }} name="answer" id="answer"
                                      className="bg-rosePineDawn-highlightLow dark:bg-rosePine-highlightLow resize-none w-full dark:border-white border-black border-2 p-4 min-h-[61px] max-h-60"
                                      placeholder="Type your answer here..."></textarea>
                            <button type="submit"
                                    className="bg-rosePineDawn-highlightLow hover:bg-rosePine-iris dark:bg-rosePine-highlightLow p-4 dark:border-white border-black border-2">Submit
                            </button>
                        </form>
                    </div>
                </div>
            </main>
        </>
    )
}
