export enum Types {
  "associate" = 1,
  "control",
  "comment",
  "embedded",
  "include",
  "iteration",
  "object",
  "variable",
  "raw",
}

export interface Attributes {
  name: string;
  description: string;
}

export interface Params {
  name: string | string[];
  description: string;
  type: string;
  accepts?: [
    {
      name: string;
      description: string;
      seperator: "space" | "comma" | "pipe";
      snippet: string;
      requires: string[];
    }
  ];
}

export interface Tags {
  type: Types;
  description: string;
  reference: string;
  singular: boolean;
  parents?: string[];
  language?: "css" | "scss" | "javascript" | "yaml" | "json";
  parameters?: Params[];
  attributes?: Attributes[];
}

export interface Filters {
  type: "filter";
  description: string;
  reference: string;
  snippet: string;
  within: string[];
  parameters: Params[] | false;
}
