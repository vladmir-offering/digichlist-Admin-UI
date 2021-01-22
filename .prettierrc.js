module.exports = {
    printWidth: 100,
    tabWidth: 2,
    useTabs: false,
    singleQuote: true,
    jsxSingleQuote: true,
    jsxBracketSameLine: true,
    semi: true,
    trailingComma: 'all',
    arrowParens: 'always',
    endOfLine: 'auto',
    parser: 'typescript',
    overrides: [
        {
            files: '*.{js,jsx,tsx,ts,scss,json,html}',
            options: {
                tabWidth: 4,
            },
        },
    ],
};
