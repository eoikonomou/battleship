module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'prettier',
    'plugin:react/recommended',
    'airbnb'
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'react',
    'react-hooks',
    'jsx',
    'simple-import-sort'
  ],
  rules: {
    'comma-dangle': ['error', 'never'],
    'react/jsx-filename-extension': ['warn', { extensions: ['.jsx'] }],
    'import/extensions': ['error', 'never'],
    'react/function-component-definition': [2, { namedComponents: 'arrow-function' }],
    indent: ['error', 2],
    'react/jsx-indent': ['error', 2],
    'import/no-extraneous-dependencies': ['error', {
      devDependencies: true
    }],
    'simple-import-sort/imports': 'error',
    'operator-linebreak': ['error', 'after'],
    'arrow-parens': ['error', 'as-needed'],
    'class-methods-use-this': 0,
    'no-param-reassign': 0
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
