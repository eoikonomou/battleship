module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: [
        'prettier',
        'plugin:react/recommended',
        'standard-with-typescript',
        'airbnb'
    ],
    overrides: [],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['./tsconfig.json']
    },
    plugins: [
        'react',
        'react-hooks',
        'jsx',
        '@typescript-eslint',
        'simple-import-sort'
    ],
    rules: {
        'comma-dangle': ['error', 'never'],
        'react/jsx-filename-extension': ['warn', { extensions: ['.tsx'] }],
        '@typescript-eslint/semi': ['error', 'always'],
        'import/extensions': ['error', 'never'],
        'react/function-component-definition': [2, { namedComponents: 'arrow-function' }],
        indent: ['error', 4],
        'react/jsx-indent': ['error', 4],
        '@typescript-eslint/indent': ['error', 4],
        '@typescript-eslint/space-before-function-paren': ['error', {
            anonymous: 'never',
            named: 'never',
            asyncArrow: 'always'
        }],
        'import/no-extraneous-dependencies': ['error', {
            devDependencies: true
        }],
        'sort-imports': ['error', {
            ignoreCase: false,
            ignoreDeclarationSort: false,
            ignoreMemberSort: false,
            memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
            allowSeparatedGroups: true
        }],
        'simple-import-sort/imports': 'error'
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.ts', '.jsx', '.tsx'],
                moduleDirectory: ['node_modules', 'src']
            }
        }
    }
};
