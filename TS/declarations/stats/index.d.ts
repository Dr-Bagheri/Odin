// declarations/stats/index.d.ts

declare module 'stats' {
    // Define a type for the comparator function used in sorting
    type Comparator<T> = (a: T, b: T) => number;

    // Define a type for the value accessor function
    type ValueAccessor<T> = (item: T) => number;

    // Declare functions provided by the stats module
    export function getMaxIndex<T>(items: T[], compare: Comparator<T>): number;
    export function getMaxElement<T>(items: T[], compare: Comparator<T>): T | null;
    export function getMinIndex<T>(items: T[], compare: Comparator<T>): number;
    export function getMinElement<T>(items: T[], compare: Comparator<T>): T | null;
    export function getMedianIndex<T>(items: T[], compare: Comparator<T>): number;
    export function getMedianElement<T>(items: T[], compare: Comparator<T>): T | null;
    export function getAverageValue<T>(items: T[], accessor: ValueAccessor<T>): number;
}