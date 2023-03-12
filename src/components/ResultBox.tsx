import {ChatgptAnswer} from "@/lib/shared/models/chatgptAnswer.model";

interface Props {
    result: ChatgptAnswer;
}

export function ResultBox({ result }: Props) {
    return (
        <div className={`flex flex-col rounded-2xl mx-2 mb-6 md:mx-14 border-rosePine-love border-2 p-5`}>
            <div className={`flex w-1/12 border border-[3px] ml-3 rounded-full border-rosePineDawn-gold dark:border-rosePine-gold`}></div>
            <div className={`flex flex-col md:flex-row flex-1 p-2`}>
                <div className={`flex flex-col flex-1 w-full md:w-6/12 break-all p-3`}>
                    <h3 className={'text-2xl text-rosePineDawn-foam dark:text-rosePine-foam'}>Pros:</h3>
                    <span>
                        {result.pros}
                    </span>
                </div>
                <div className={`flex flex-col flex-1 w-full md:w-6/12 break-all p-3`}>
                    <h3 className={'text-2xl text-rosePineDawn-love dark:text-rosePine-love'}>Cons:</h3>
                    <div>
                        {
                            result.cons.map((con, index) => (
                                <span key={index} className={`block`}>- {con}</span>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className={`flex flex-col md:flex-row p-5`}>
                <div className={`flex flex-col`}>
                    <h3 className={'text-2xl text-rosePineDawn-foam dark:text-rosePine-foam'}>Overall:</h3>
                    <div className={`flex w-full md:w-10/12`}>
                        {result.overall}
                    </div>
                </div>
                <div className={`flex justify-center items-center w-full m-3 md:w-2/12`}>
                    <div className="flex justify-center items-center w-32 h-32 md:w-20 md:h-20 shrink-0 grow-0 rounded-full bg-rosePineDawn-foam dark:bg-rosePine-foam text-green-700 border border-8 border-rosePineDawn-pine dark:border-rosePine-pine">
                        <span className={`text-rosePineDawn-pine dark:text-rosePine-pine`}>{result.grade}%</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
