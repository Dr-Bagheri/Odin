interface User {
    name: string;
    age: number;
    occupation: string;
}

interface Admin {
    name: string;
    age: number;
    role: string;
}

// Define Person as a union of User and Admin
export type Person = User | Admin;

// Update the persons array to type Person[]
export const persons: Person[] = [
    {
        name: 'Max Mustermann',
        age: 25,
        occupation: 'Chimney sweep'
    },
    {
        name: 'Jane Doe',
        age: 32,
        role: 'Administrator'
    },
    {
        name: 'Kate Müller',
        age: 23,
        occupation: 'Astronaut'
    },
    {
        name: 'Bruce Willis',
        age: 64,
        role: 'World saver'
    }
];

// Update logPerson to handle both User and Admin
export function logPerson(person: Person) {
    // Check if the person is an Admin or a User by checking for the 'occupation' property
    if ('occupation' in person) {
        console.log(` - ${person.name}, ${person.age}, ${person.occupation}`);
    } else {
        console.log(` - ${person.name}, ${person.age}, ${person.role}`);
    }
}

console.log('Persons:');
persons.forEach(logPerson);