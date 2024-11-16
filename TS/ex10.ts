interface User {
    type: 'user';
    name: string;
    age: number;
    occupation: string;
}

interface Admin {
    type: 'admin';
    name: string;
    age: number;
    role: string;
}

type Person = User | Admin;

const admins: Admin[] = [
    { type: 'admin', name: 'Jane Doe', age: 32, role: 'Administrator' },
    { type: 'admin', name: 'Bruce Willis', age: 64, role: 'World saver' }
];

const users: User[] = [
    { type: 'user', name: 'Max Mustermann', age: 25, occupation: 'Chimney sweep' },
    { type: 'user', name: 'Kate Müller', age: 23, occupation: 'Astronaut' }
];

export type ApiResponse<T> = {
    status: 'success';
    data: T;
} | {
    status: 'error';
    error: string;
};

export function promisify<T>(fn: (callback: (response: ApiResponse<T>) => void) => void): () => Promise<T> {
    return () => new Promise<T>((resolve, reject) => {
        fn((response: ApiResponse<T>) => {
            if (response.status === 'success') {
                resolve(response.data);
            } else {
                reject(new Error(response.error));
            }
        });
    });
}

function promisifyAll(obj: any): any {
    const result: any = {};
    for (const key in obj) {
        if (typeof obj[key] === 'function') {
            result[key] = promisify(obj[key]);
        }
    }
    return result;
}

const oldApi = {
    requestAdmins(callback: (response: ApiResponse<Admin[]>) => void) {
        callback({
            status: 'success',
            data: admins
        });
    },
    requestUsers(callback: (response: ApiResponse<User[]>) => void) {
        callback({
            status: 'success',
            data: users
        });
    },
    requestCurrentServerTime(callback: (response: ApiResponse<number>) => void) {
        callback({
            status: 'success',
            data: Date.now()
        });
    },
    requestCoffeeMachineQueueLength(callback: (response: ApiResponse<number>) => void) {
        callback({
            status: 'error',
            error: 'Numeric value has exceeded Number.MAX_SAFE_INTEGER.'
        });
    }
};

const api = promisifyAll(oldApi);

function logPerson(person: Person) {
    console.log(` - ${person.name}, ${person.age}, ${person.type === 'admin' ? person.role : person.occupation}`);
}

async function startTheApp() {
    try {
        console.log('Admins:');
        (await api.requestAdmins()).forEach(logPerson);
        console.log('Users:');
        (await api.requestUsers()).forEach(logPerson);
        console.log('Server time:', new Date(await api.requestCurrentServerTime()).toLocaleString());
        console.log('Coffee machine queue length:', await api.requestCoffeeMachineQueueLength());
    } catch (e) {
        console.error(`Error: "${e.message}", but it's fine, sometimes errors are inevitable.`);
    }
}

startTheApp().then(() => {
    console.log('Success!');
});