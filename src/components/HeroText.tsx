export default function HeroText() {
    return (
        <div className="flex flex-col items-center justify-center w-5/6">
            <h1 className="flex font-display flex-row text-4xl md:text-8xl font-bold text-center text-rosePineDawn-text dark:text-rosePine-text">
                <span className="block text-transparent bg-clip-text bg-gradient-to-br from-rosePineDawn-foam to-rosePine-foam dark:from-rosePine-love dark:to-rosePine-rose">Interview</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-br from-rosePine-rose to-rosePineDawn-love dark:from-rosePine-foam dark:to-rosePine-pine">Pal.</span>
            </h1>
            <h2 className="font-display font-bold text-4xl md:text-8xl text-center max-w-7xl text-rosePineDawn-text dark:text-rosePine-text">
                <span className="block">The best way to practice interview questions</span>
            </h2>
        </div>
    )
}