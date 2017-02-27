module.exports = exports = {
    env: {
        "browser" : true,
        "node" : true,
        "es6" : true
    },
    parser: "babel-eslint",
    parserOptions: {
        "sourceType": "module",
        ecmaFeatures: {
            "arrowFunctions": true,
            "binaryLiterals": true,
            "blockBindings": true,
            "classes": true,
            "defaultParams": true,
            "destructuring": true,
            "forOf": true,
            "generators": true,
            "modules": true,
            "objectLiteralComputedProperties": true,
            "objectLiteralDuplicateProperties": true,
            "objectLiteralShorthandMethods": true,
            "objectLiteralShorthandProperties": true,
            "octalLiterals": true,
            "regexUFlag": true,
            "regexYFlag": true,
            "spread": true,
            "experimentalObjectRestSpread": true,
            "superInFunctions": true,
            "templateStrings": true,
            "unicodeCodePointEscapes": true,
            "globalReturn": true,
            "ecmaVersion": 6,
            "jsx": true
        }
    },

    plugins: [
        'react'
    ],
    rules : {
        "no-undef" : 2
    }
}