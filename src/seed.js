function makeId() {
    let id = 0
    return () => id++
}
let id = makeId()

class JSCard {
    constructor(front, back) {
        this.id = id()
        this.front = front
        this.back = back
        this.language = 'js'
        this.side = 'front'
    }
}

function normalize(str) {
    // let strArr = str.split('\n');
    // strArr = strArr.filter(x => x.length !== 0)
    // const smallestSpace = strArr.reduce((a, b) => {
    //     console.log(a.search(/^\s*/), b)
    //     return a
    // }, '')
    // console.log('s =>', smallestSpace)
    // const trim = strArr.join('\n')
    // console.log(strArr)
    return str
}

export default [
    {
        title: 'Basics',
        cards: [
            new JSCard(
`## What is the difference between var, let, and const?`,
normalize(`
// var declarations are globally scoped or function scoped
// var variables can be updated and re-declared within its scope;
var x = 1
// let and const are block scoped
// let variables can be updated but not re-declared
let y = 2
// const variables can neither be updated nor re-declared
const name = 'mark'
name = 'a' // would throw an ERROR
    // indent test`)
),
            new JSCard(`## How are if/else/elseif statements written out?`,
                `
if (anyTrueCondition) {

} else if (someOtherTrueCondition) {

} else {
    // do this thing if other conditions are not true
}
                `)
        ]
    },
    {
        title: 'Functions',
        cards: [
            {
                front: `## Write a function add which takes two inputs and adds them together`,
                language: 'js',
                back: `
                function add(a, b) {
                    return a + b
                }
                `,
                side: 'front'
            },
            {
                front: `## Write a function capitalize which takes a string and makes it uppercase`,
                language: 'js',
                back: `
                function capitalize(str) {
                    return str.toUpperCase()
                }
                `,
                side: 'front'
            }
        ]
    }
]
