import Image from 'next/image'
import Button from '@/components/Button'
import { useRouter } from 'next/router'

type ErrorProps = {
    text: string;
    error: string;
}

export default function Error({text, error}: ErrorProps) {
    const router = useRouter()
    return (
            <div className="flex flex-col h-full justify-center items-center">
                <h1 className="text-4xl font-bold text-rosePineDawn-text dark:text-rosePine-text"> {error} </h1>
                <Image src="/logo.png" width={300} height={300} alt="Error"/>
                <h1 className="font-display text-4xl font-bold text-center text-rosePineDawn-text dark:text-rosePine-text mb-8">
                    {text}
                </h1>
                <Button content={"Go Home"} arrow={true} onClick={() => router.push("/")} width={"w-48"}/>
        </div>
    )
}