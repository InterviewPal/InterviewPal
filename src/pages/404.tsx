import Error from "@/components/Error";
import { useTheme } from "@/lib/client/hooks/useTheme";

export default function Custom404() {
    const { theme } = useTheme();
    return (
        <>
            <Error
                error="404 - Page Not Found"
                text="The page you are looking for does not exist."
            />
        </>
    )
}