/**
 * Liquid Jekyll Spec: Objects
 */
export declare const Objects: {
    site: {
        description: string;
        properties: {
            description: string;
            name: string;
        }[];
        reference: string;
        type: string;
    };
};
/**
 * Liquid Jekyll Type: Object List
 */
export declare type ObjectList = keyof typeof Objects;
/**
 * Liquid Jekyll Spec: Filters
 */
export declare const filters: {
    relative_url: {
        description: string;
        ref: string;
    };
    absolute_url: {
        description: string;
        ref: string;
    };
    date_to_xmlschema: {
        description: string;
        /**
         * Liquid Jekyll Spec: Tags
         */
        ref: string;
    };
    date_to_rfc822: {
        description: string;
        ref: string;
    };
    date_to_string: {
        description: string;
        ref: string;
    };
};
/**
 * Liquid Jekyll Type: Filter List
 */
export declare type FilterList = keyof typeof filters;
/**
 * Liquid Jekyll Spec: Tags
 */
export declare const tags: {
    post_url: {
        type: string;
        description: string;
        singular: boolean;
        ref: string;
    };
    include: {
        type: string;
        description: string;
        singular: boolean;
        seperator: string;
        ref: string;
    };
    include_relative: {
        type: string;
        description: string;
        seperator: string;
        singular: boolean;
        ref: string;
    };
    link: {
        type: string;
        filters: boolean;
        parameters: boolean;
    };
    highlight: {
        type: string;
        description: string;
        snippet: string;
        filters: boolean;
        ref: string;
    };
};
/**
 * Liquid Jekyll Type: Filter List
 */
export declare type TagList = keyof typeof tags;
