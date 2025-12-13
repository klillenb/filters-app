import { FieldType } from "../types/field-type";

export interface FilterRowValue {
    field: FieldType;
    operator: string;
    value: string | number;
}