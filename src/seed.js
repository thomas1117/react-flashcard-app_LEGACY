export default [
    {
        title: 'Basics',
        cards: [
            {
                id: 1,
                front: `## What is the difference between var, let, and const?`,
                language: 'js',
                back: `
// var declarations are globally scoped or function scoped
// var variables can be updated and re-declared within its scope;
var x = 1
// let and const are block scoped
// let variables can be updated but not re-declared
let y = 2
// const variables can neither be updated nor re-declared
const name = 'mark'
name = 'a' // would throw an ERROR
                `,
                side: 'front'
            },
            {   
                id: 2,
                front: `## How are if/else/elseif statements written out?`,
                language: 'js',
                back: `
if (anyTrueCondition) {

} else if (someOtherTrueCondition) {

} else {
    // do this thing if other conditions are not true
}
                `,
                side: 'front'
            }
        ]
    },
    {
        title: 'Functions',
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
