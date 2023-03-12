import Head from 'next/head'
import { useEffect, useState } from 'react'
import Navbar from "@/components/Navbar";
import Image from 'next/image';
import { useQuestions } from "@/lib/client/hooks/useQuestions";
import { useRouter } from "next/router";
import { Loading } from "@/components/Loading";
import { useTmpAuth } from "@/lib/client/hooks/useTmpAuth";

export default function Home() {
    const router = useRouter();
    const { interviewId } = router.query;

    const { isAuthed, uuid } = useTmpAuth({});
    const { isDone, questions, notFound } = useQuestions({ interviewId: interviewId as string });

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<null | number>(null)
    const [answer, setAnswer] = useState('')

    useEffect(() => {
        if (questions.length > 0) {
            setCurrentQuestionIndex(0);
        }
    }, [isDone]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log();
    }

    // if (notFound) {
    //     return <div>Interview Not found</div>;
    // }
    // if (interviewId === undefined || !isAuthed || !isDone) {
    //     return <Loading />;
    // }

    return (
        <>
            <Head>
                <title>InterviewPal</title>
                <meta name="description" content="Interview Practice AI" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar logo={false} />
            <main className="text-rosePineDawn-text dark:text-rosePineMoon-text overflow-hidden w-full h-full relative">
                {/* Middle */}
                <div className="flex h-full flex-1 flex-col md:pl-[280px]">
                    <div className="relative h-full w-full transition-width flex flex-col overflow-hidden items-stretch flex-1">
                        {/* Text Area */}
                        {/* Imput Area */}
                        <div className="absolute bottom-0 left-0 w-full">
                            <form onSubmit={handleSubmit} className="flex flex-col">
                                <textarea
                                    name="answer"
                                    className="w-full h-24 p-4 bg-rosePineDawn-bg dark:bg-rosePineMoon-bg"
                                    placeholder="Type your answer here..."
                                />
                                <button
                                    type="submit"
                                    className="w-full h-12 bg-rosePineDawn-bg dark:bg-rosePineMoon-bg rounded-b-lg"
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                {/* Left Side */}
                <div className="hidden bg-gray-500 md:fixed md:top-24 md:bottom-0 md:flex md:w-[280px] md:flex-col">
                    <Image src="/suit-logo.png" alt="hero" width={280} height={280} />
                </div>
            </main>

        </>
    )
}
