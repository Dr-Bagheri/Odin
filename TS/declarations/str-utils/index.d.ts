// Ensure this matches exactly with your import statements in your TypeScript files
declare module 'str-utils' {
    export function strReverse(input: string): string;
    export function strToLower(input: string): string;
    export function strToUpper(input: string): string;
    export function strRandomize(input: string): string;
    export function strInvertCase(input: string): string;
}