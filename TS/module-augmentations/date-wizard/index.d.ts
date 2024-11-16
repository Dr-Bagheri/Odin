import 'date-wizard';

declare module 'date-wizard' {
    interface DateDetails {
        hours: number;
        minutes: number;
        seconds: number;
    }

    export function pad(value: number, length?: number): string;
    export function someFormattingFunction(date: Date, format: string): string; // Add this if it's missing
}