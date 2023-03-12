import Error from '@/components/Error'
import { useTheme } from "@/lib/client/hooks/useTheme";

export default function Custom500() {
    const { theme } = useTheme();
    return (
        <>
            <Error
            error="500 - Internal Server Error"
            text="An internal server error occurred."
            />
        </>
    )
}