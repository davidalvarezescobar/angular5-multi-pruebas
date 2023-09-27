export interface Filter {
    id: number | string;
    title: string;
    active?: boolean;
}

export interface ActiveFilter {
    id: number | string;
    group: string;
}
