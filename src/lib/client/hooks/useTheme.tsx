import {useEffect, useState} from "react";

export function useTheme() {
    const [theme, setTheme] = useState(null as 'light' | 'dark' | null)

    useEffect(() => {
        const theme = localStorage.getItem('theme');
        if (theme === 'light' || theme === 'dark') {
            setTheme(theme);
        } else {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (prefersDark) {
                setTheme('dark');
            } else {
                setTheme('light');
            }
        }
    }, []);

    useEffect(() => {
        if (theme === 'light') {
            document.documentElement.classList.remove('dark');
        } else if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        }
    }, [theme]);

    const handleThemeChange = () => {
        if (theme === 'light') {
            localStorage.setItem('theme', 'dark');
            setTheme('dark');
        } else if (theme === 'dark') {
            localStorage.setItem('theme', 'light');
            setTheme('light');
        }
    };

    return {theme, handleThemeChange};
}
