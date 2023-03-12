import {useEffect, useRef, useState} from "react";

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
            const result = await fetch('/api/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authentication': 'Bearer ' + uuid || '',
                },
                body: JSON.stringify({uuid}),
            });
            const {uuid: newUuid} = await result.json();

            localStorage.setItem('interviewpal:uuid', newUuid);
            setUuid(newUuid);
            setIsAuthed(true);
        })();
    }, []);

    return {uuid, isAuthed};
}
