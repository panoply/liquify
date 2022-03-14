export declare const sparser: {
    lexers: {};
    libs: {};
    options: {
        lexerOptions: {
            markup: {
                attributeSort: boolean;
                attributeSortList: any[];
                parseSpace: boolean;
                preserveText: boolean;
                quoteConvert: string;
                tagMerge: boolean;
                tagSort: boolean;
                preserveAttribute: boolean;
            };
            script: {
                endComma: string;
                objectSort: boolean;
                quoteConvert: string;
                variableList: string;
            };
            style: {
                noLeadZero: boolean;
                objectSort: boolean;
                quoteConvert: string;
            };
        };
        attemptCorrection: boolean;
        crlf: boolean;
        format: string;
        language: string;
        lexer: string;
        preserveComment: boolean;
        source: string;
        wrap: number;
    };
    parseError: string;
    version: {
        date: string;
        number: string;
    };
};
