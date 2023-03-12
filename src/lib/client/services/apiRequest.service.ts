export const ApiRequestService = {
    async get({url, tokenUUID, shouldAuth = false}: {url: string, shouldAuth?: boolean, tokenUUID?: string}) {
        return await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokenUUID ? tokenUUID : (shouldAuth ? localStorage.getItem('token') : '')}`,
            },
        });
    },
    async post({url, params, shouldAuth = false, tokenUUID}: {url: string, params: any, shouldAuth?: boolean, tokenUUID?: string}) {
        return await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokenUUID ? tokenUUID : (shouldAuth ? localStorage.getItem('token') : '')}`,
            },
            body: JSON.stringify(params),
        });
    },
    async put({url, params, shouldAuth = false,tokenUUID}: {url: string, params: any, shouldAuth?: boolean, tokenUUID?: string}) {
        return await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokenUUID ? tokenUUID : (shouldAuth ? localStorage.getItem('token') : '')}`,
            },
            body: JSON.stringify(params),
        });
    }
};
