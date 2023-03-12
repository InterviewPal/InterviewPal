import Link from 'next/link'
import Image from 'next/image'
import ThemeToggle from '@/components/ThemeToggle'

type NavbarProps = {
    theme: 'light' | 'dark' | null
    onClick: () => void
    logo: boolean
}
export default function Navbar({ theme, onClick, logo }: NavbarProps) {
    return (
        logo ? (
        <div className="flex flex-row items-center justify-between w-full px-4 py-4 md:px-24">
            <div className="flex flex-row items-center justify-start">
                <Link className="flex flex-row items-center justify-center -p-7 mt-4" href="/">
                    <Image src="/logo.png" alt="InterviewPal Logo" width={70} height={70} />
                </Link>
            </div>
            <div className="flex flex-row items-center justify-end mr-2">
                <Link className="flex flex-row mr-8 text-xl items-center justify-center text-rosePineDawn-text dark:text-rosePine-text font-display font-semibold" href="/#about">
                    <span className="hover:bg-rosePineDawn-text/40 dark:hover:bg-rosePine-text/40 rounded-md px-2 py-2" style={{ transition: 'all 0.2s ease-in-out' }} >
                        About
                    </span>
                </Link>
                <ThemeToggle theme={theme} onClick={onClick} />
            </div>
        </div >
        ) : (
        <div className="flex flex-row items-center justify-between w-full px-4 py-4 md:px-24">
            <Link href={'/'}>
                <div className="flex flex-row items-center justify-start text-3xl h-11 mt-2">
                    <span className="block text-transparent bg-clip-text bg-gradient-to-br from-rosePineDawn-foam to-rosePine-foam dark:from-rosePine-love dark:to-rosePine-rose">Interview</span>
                    <span className="block text-transparent bg-clip-text bg-gradient-to-br from-rosePine-rose to-rosePineDawn-love dark:from-rosePine-foam dark:to-rosePine-pine">Pal.</span>
                </div>
            </Link>
            <div className="flex flex-row items-center justify-end mr-2">
                <ThemeToggle theme={theme} onClick={onClick} />
            </div>
        </div >
        )
    )
}