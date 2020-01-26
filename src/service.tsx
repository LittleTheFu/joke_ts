const info = {
    method: 'GET',
    headers: {
        'x-rapidapi-host': 'joke3.p.rapidapi.com',
        'x-rapidapi-key': 'fc5476beb4mshc57aa5e3ed24365p114d83jsn1e6a83699ef6',
    },
};

const jokeUrl = 'https://joke3.p.rapidapi.com/v1/joke';

async function api<T>(url: string, info: object): Promise<T> {
    const response = await fetch(url, info);
    if (!response.ok) {
        console.log(response);
        throw new Error(response.statusText);
    }
    const data = await response.json();
    return data as T;
}

const rawFetch = (
    url: string,
    info: object,
    preAction: () => void,
    resolve: (arg0: string, arg1: string, arg2: number, arg3: number) => void,
    reject: (arg0: object) => void,
    guard: () => boolean,
): void => {
    if (guard()) return;
    preAction();
    api<{ id: string; content: string; upvotes: number; downvotes: number }>(url, info)
        .then(({ id, content, upvotes, downvotes }) => {
            resolve(id, content, upvotes, downvotes);
        })
        .catch(error => {
            reject(error);
        });
};

export const getRandomJoke = (
    preAction: () => void,
    resolve: (arg0: string, arg1: string, arg2: number, arg3: number) => void,
    reject: (arg0: object) => void,
    guard: () => boolean,
): void => {
    rawFetch(jokeUrl, info, preAction, resolve, reject, guard);
};

const createVoteUrl = (id: number, isUpvote: boolean): string => {
    const voteType = isUpvote ? 'upvote' : 'downvote';
    return 'https://joke3.p.rapidapi.com/v1/joke/' + id + '/' + voteType;
};

const createPostInfo = (): object => {
    return {
        method: 'POST',
        headers: {
            'x-rapidapi-host': 'joke3.p.rapidapi.com',
            'x-rapidapi-key': 'fc5476beb4mshc57aa5e3ed24365p114d83jsn1e6a83699ef6',
            'content-type': 'application/x-www-form-urlencoded',
        },
        body: {},
    };
};

export const voteJoke = (
    id: number,
    isUpvote: boolean,
    preAction: () => void,
    resolve: (arg0: string, arg1: string, arg2: number, arg3: number) => void,
    reject: (arg0: object) => void,
    guard: () => boolean,
): void => {
    const url = createVoteUrl(id, isUpvote);
    rawFetch(url, createPostInfo(), preAction, resolve, reject, guard);
};
