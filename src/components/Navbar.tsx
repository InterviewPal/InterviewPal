import Link from 'next/link'
import Image from 'next/image'
import ThemeToggle from '@/components/ThemeToggle'
import { useTheme } from "@/lib/client/hooks/useTheme";

type NavbarProps = {
    logo: boolean
}
export default function Navbar({ logo }: NavbarProps) {
    const { theme, handleThemeChange } = useTheme();

    return (

        logo ? (
            <div className="flex flex-row items-center justify-between w-full px-4 h-24 md:px-24 absolute top-0 left-0 z-50">
                <div className="flex flex-row items-center justify-start">
                    <Link className="flex flex-row items-center justify-center -p-8" href="/">
                        <Image src="/logo.png" alt="InterviewPal Logo" width={70} height={70} />
                    </Link>
                </div>
                <div className="flex flex-row items-center justify-end mr-2">
                    <Link className="flex flex-row mr-8 text-xl items-center justify-center text-rosePineDawn-text dark:text-rosePine-text font-display font-semibold" href="/#about">
                        <span className="hover:bg-rosePineDawn-text/40 dark:hover:bg-rosePine-text/40 rounded-md px-2 py-2" style={{ transition: 'all 0.2s ease-in-out' }} >
                            About
                        </span>
                    </Link>
                    <ThemeToggle theme={theme} onClick={handleThemeChange} />
                </div>
            </div >
        ) : (
            <div className="flex flex-row items-center justify-between w-full px-4 h-24 md:px-24 absolute top-0 left-0 z-50">
                <Link href={'/'}>
                    <div className="flex flex-row items-center justify-start text-3xl">
                        <span className="block text-transparent bg-clip-text bg-gradient-to-br from-rosePineDawn-foam to-rosePine-foam dark:from-rosePine-love dark:to-rosePine-rose">Interview</span>
                        <span className="block text-transparent bg-clip-text bg-gradient-to-br from-rosePine-rose to-rosePineDawn-love dark:from-rosePine-foam dark:to-rosePine-pine">Pal.</span>
                    </div>
                </Link>
                <div className="flex flex-row items-center justify-end mr-2">
                <Link className="flex flex-row mr-8 text-xl items-center justify-center text-rosePineDawn-text dark:text-rosePine-text font-display font-semibold" href="/">
                        <span className="hover:bg-rosePineDawn-text/40 dark:hover:bg-rosePine-text/40 rounded-md px-2 py-2" style={{ transition: 'all 0.2s ease-in-out' }} >
                            Return to Home
                        </span>
                    </Link>
                    <ThemeToggle theme={theme} onClick={handleThemeChange} />
                </div>
            </div >
        )
    )
}
