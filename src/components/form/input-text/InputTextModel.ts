export interface InputTextModel {
    name: string;
    value: string | null;
    label: string;
    rules?: string[];
    placeholder?: string;
}