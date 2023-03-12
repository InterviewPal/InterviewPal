import {useEffect, useRef, useState} from "react";
import {ApiRequestService} from "@/lib/client/services/apiRequest.service";

interface HookProps {

}

// use local storage to store the uuid token.
// if the token is not valid, it will be refreshed (new user).
export function useTmpAuth({}: HookProps) {
    const [isAuthed, setIsAuthed] = useState(false);
    const [uuid, setUuid] = useState<string | null>(null);

    useEffect(() => {
        if (isAuthed) {
            return;
        }
        (async () => {
            const uuid = localStorage.getItem('interviewpal:uuid');
            const result = await ApiRequestService.post({
                url: '/api/auth',
                params: { uuid },
                shouldAuth: true,
            });
            const {uuid: newUuid} = await result.json();

            localStorage.setItem('interviewpal:uuid', newUuid);
            setUuid(newUuid);
            setIsAuthed(true);
        })();
    }, []);

    return {uuid, isAuthed};
}
