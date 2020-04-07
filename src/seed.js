export default [
    {
        cards: [
            {
                front: `## What is the difference between var, let, and const?`,
                language: 'md',
                back: `var declarations are globally scoped or function scoped \
                while let and const are block scoped. var variables can be updated \
                and re-declared within its scope; let variables can be updated \
                but not re-declared; const variables can neither be updated \
                nor re-declared.
                `,
                side: 'front'
            }
        ]
    },
    {
        cards: [
            {
                front: `## Write a function add which takes two inputs and adds them together`,
                language: 'js',
                back: `
                function sum(a, b) {
                    return a + b
                }
                `,
                side: 'front'
            }
        ]
    }
]
