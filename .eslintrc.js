module.exports =  {
    parser:  '@typescript-eslint/parser',  // Specifies the ESLint parser
    extends:  [
      'plugin:react/recommended',  // Uses the recommended rules from @eslint-plugin-react
      'plugin:@typescript-eslint/recommended',  // Uses the recommended rules from @typescript-eslint/eslint-plugin
      "prettier/@typescript-eslint", // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
      "plugin:prettier/recommended" // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    ],
    parserOptions:  {
      ecmaVersion:  2018,  // Allows for the parsing of modern ECMAScript features
      sourceType:  'module',  // Allows for the use of imports
      ecmaFeatures:  {
        jsx:  true,  // Allows for the parsing of JSX
      },
    },
    rules:  {
      // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
      // e.g. '@typescript-eslint/explicit-function-return-type': 'off',
      "react/prop-types": "off"
    },
    settings:  {
      react:  {
        version:  'detect',  // Tells eslint-plugin-react to automatically detect the version of React to use
      },
    },
  };
  
// module.exports = {
//     parser: '@typescript-eslint/parser',
//     plugins: ['@typescript-eslint'],
//     rules: {
//         // 禁止使用 var
//         'no-var': "error",
//         // 优先使用 interface 而不是 type
//         '@typescript-eslint/consistent-type-definitions': [
//             "error",
//             "interface"
//         ]
//     },
//     "parserOptions": {
//         "ecmaVersion": 6,//也就是ES6语法支持的意思
//         "sourceType": "module",
//         "ecmaFeatures": {
//             "modules": true
//         },
//       },
// }