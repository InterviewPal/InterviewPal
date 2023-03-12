import Head from 'next/head'
import { useEffect, useState } from 'react'
import Navbar from "@/components/Navbar";
import Image from 'next/image';
import { useQuestions } from "@/lib/client/hooks/useQuestions";
import { useRouter } from "next/router";
import { Loading } from "@/components/Loading";
import { useTmpAuth } from "@/lib/client/hooks/useTmpAuth";
import * as InterviewService from "@/lib/client/services/interview.service";

export default function Home() {
    const router = useRouter();
    const { interviewId } = router.query;

    const { isAuthed, userTmpUuid } = useTmpAuth({});
    const { isDone, questions, notFound } = useQuestions({ interviewId: interviewId as string });

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<null | number>(null)
    const [answer, setAnswer] = useState('')
    const [answerLength, setAnswerLength] = useState(0)

    useEffect(() => {
        console.log('isDone', isDone, questions)
        if (isDone && questions.length > 0) {
            setCurrentQuestionIndex(0);
        }
    }, [isDone]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (currentQuestionIndex === null) {
            console.error('currentQuestionIndex is null');
            return;
        }

        InterviewService.submitOneQuestion({
            tmpUserUUID: userTmpUuid!,
            interviewUUID: '',
            promptNumber: currentQuestionIndex + 1,
            question: '',
            userAnswerContent: '',
        }).then((res) => {
            // ignore the response for now
        }).catch(console.error);

        console.log(answer, answerLength, currentQuestionIndex, questions[currentQuestionIndex ?? -1]);
    }

    if (notFound) {
        return <div>Interview Not found</div>;
    }
    if (interviewId === undefined || !isAuthed || !isDone) {
        return <Loading />;
    }

    return (
        <>
            <Head>
                <title>InterviewPal</title>
                <meta name="description" content="Interview Practice AI" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar logo={false} />
            <main className="text-rosePineDawn-text dark:text-rosePine-text overflow-hidden w-full h-full relative">
                {/* Middle */}
                <div className="flex h-full flex-1 flex-col md:pl-[360px]">
                    <div className="relative h-full w-full transition-width flex flex-col overflow-hidden items-stretch flex-1">
                        {/* Text Area */}
                        <div className="flex flex-col flex-1 overflow-y-auto h-full bg-rosePineDawn-surface dark:bg-rosePine-surface">

                        </div>
                        {/* Imput Area */}
                        <div className="absolute bottom-0 left-0 w-full">
                            <form onSubmit={handleSubmit} className="stretch mx-2 flex flex-row gap-3 last:mb-2 md:last:mb-6 lg:mx-auto lg:max-w-3xl">
                                <div className="flex flex-col w-full pt-5 pb-3 md:pl-4 relative border-2 border-rosePineDawn-highlightHigh dark:border-rosePine-highlightHigh rounded-md bg-rosePineDawn-highlightLow dark:bg-rosePine-highlightLow">
                                    <textarea
                                        onInput={(event) => {
                                            const element = event.target as HTMLTextAreaElement;
                                            element.style.height = "5px";
                                            element.style.height = (element.scrollHeight + 5) + "px";
                                        }}
                                        onChange={(event) => {
                                            const element = event.target as HTMLTextAreaElement;
                                            setAnswer(element.value);
                                            setAnswerLength(element.value.length);
                                        }}
                                        className="message-text-area m-0 w-full resize-none bg-transparent p-0 pl-2 pr-8 md:pl-0 min-h-[61px] max-h-60" rows={1} placeholder="Type your answer here" tabIndex={1} maxLength={1200} />
                                    <div className="absolute top-1 right-1 flex flex-row gap-2 items-center">
                                        <div className="text-xs text-rosePineDawn-text dark:text-rosePine-text">{answerLength}/1200</div>
                                    </div>
                                    <button
                                        type="submit"
                                        className="absolute p-1 rounded-md text-gray-500 bottom-3.5 right-3.5 bg-rosePine-foam hover:bg-rosePineDawn-foam dark:bg-rosePineDawn-love hover:dark:bg-rosePine-love"
                                    >
                                        <svg
                                            className="h-4 w-4 mr-1"
                                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z" /></svg>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                {/* Left Side */}
                <div className="hidden md:fixed md:top-24 md:bottom-0 md:flex md:w-[360px] md:flex-col -mt-8 ml-4">
                    <div className="flex flex-col justify-center items-center">
                        <Image src="/suit-logo.png" alt="hero" width={280} height={280} />
                        <hr className="border-rosePineDawn-text dark:border-rosePine-text w-5/6 border-2 mt-3" />
                        <span className="text-4xl font-bold mt-4">
                            {currentQuestionIndex !== null && questions[currentQuestionIndex]
                                ? currentQuestionIndex + 1 : 0} / {questions.length}
                        </span>
                        <p className="text-sm mt-2">
                            Questions Answered
                        </p>
                    </div>
                </div>
            </main>

        </>
    )
}
