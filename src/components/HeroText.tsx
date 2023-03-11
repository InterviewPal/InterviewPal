export default function HeroText() {
    return (
        <div className="flex flex-col items-center justify-center mt-32 mx-6 py-12">
            <h1 className="flex font-display flex-row text-4xl md:text-8xl font-bold text-center text-rosePineDawn-text dark:text-rosePineMoon-text">
                <span className="block text-transparent bg-clip-text bg-gradient-to-br from-rosePineDawn-foam to-rosePine-foam dark:from-rosePine-love dark:to-rosePine-rose">Interview</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-br from-rosePine-rose to-rosePineDawn-love dark:from-rosePine-foam dark:to-rosePine-pine">Pal.</span>
            </h1>
            <h1 className="font-display font-bold text-4xl md:text-8xl font-bold text-center max-w-7xl text-rosePineDawn-text dark:text-rosePineMoon-text">
                <span className="block">The best way to practice interview questions</span>
            </h1>
        </div>
    )
}