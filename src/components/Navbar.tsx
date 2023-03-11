import Link from 'next/link'
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
                    <svg className="w-8 h-8 fill-current text-rosePineDawn-foam dark:text-rosePine-foam" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256 256-114.6 256-256S397.4 0 256 0zm0 480c-119.3 0-216-96.7-216-216S136.7 40 256 40s216 96.7 216 216-96.7 216-216 216z" /><path d="M256 128c-17.7 0-32 14.3-32 32v192c0 17.7 14.3 32 32 32s32-14.3 32-32V160c0-17.7-14.3-32-32-32z" /></svg>
                </Link>
            </div>
            <div className="flex flex-row items-center justify-end ">
                <Link className="flex flex-row mr-8 text-xl items-center justify-center text-rosePineDawn-text dark:text-rosePine-text font-display font-semibold" href="/#about">
                    About
                </Link>
                <ThemeToggle theme={theme} onClick={onClick} />
            </div>
        </div>
    )
}