import { FieldType } from "../types/field-type";

export interface Criteria {
    name: FieldType;
    condition: string;
    value: string | number;
}