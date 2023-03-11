import Link from 'next/link'
import Image from 'next/image'
import ThemeToggle from '@/components/ThemeToggle'

type NavbarProps = {
    theme: 'light' | 'dark' | null
    onClick: () => void
}
export default function Navbar({ theme, onClick }: NavbarProps) {
    return (
        <div className="flex flex-row items-center justify-between w-full px-4 py-6 md:px-24">
            <div className="flex flex-row items-center justify-start">
                <Link className="flex flex-row items-center justify-center" href="/">
                    <Image src="/logo.png" alt="InterviewPal Logo" width={70} height={70} />
                </Link>
            </div>
            <div className="flex flex-row items-center justify-end mr-2">
                <Link className="flex flex-row mr-8 text-xl items-center justify-center text-rosePineDawn-text dark:text-rosePine-text font-display font-semibold" href="/about">
                    <span className="hover:bg-rosePineDawn-text/40 dark:hover:bg-rosePine-text/40 rounded-md px-2" style={{ transition: 'all 0.2s ease-in-out' }} >
                        About
                    </span>
                </Link>
                <ThemeToggle theme={theme} onClick={onClick} />
            </div>
        </div >
    )
}