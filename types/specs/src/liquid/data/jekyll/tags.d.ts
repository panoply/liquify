declare const _default: {
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
export default _default;
