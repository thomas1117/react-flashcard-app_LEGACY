function makeId() {
    let id = 0
    return () => id++
}
let id = makeId()

class JSCard {
    constructor(front, back) {
        this.id = id()
        this.front = normalize(front)
        this.back = normalize(back)
        this.language = 'js'
        this.side = 'front'
    }
}

function normalize(str) {
    let strArr = str.split('\n')
    let smallest = Infinity
    let filteredCollection = []
    for (let i = 0; i < strArr.length; i++) {
        if (strArr[i].length) {
            let spaceCount = strArr[i].search(/\S|$/)
            smallest = smallest > spaceCount ? spaceCount : smallest
            filteredCollection.push(strArr[i])
        }
    }
    for (let i = 0; i < filteredCollection.length; i++) {
        filteredCollection[i] = filteredCollection[i].slice(smallest)
    }
    return filteredCollection.join('\n')
}

export default [
    {
        title: 'Basics',
        cards: [
            new JSCard(
            `## What is the difference between var, let, and const?`,
            `
            // var declarations are globally scoped or function scoped
            // var variables can be updated and re-declared within its scope;
            var x = 1
            // let and const are block scoped
            // let variables can be updated but not re-declared
            let y = 2
            // const variables can neither be updated nor re-declared
            const name = 'mark'
            name = 'a' // would throw an ERROR
                // indent test
            `
            ),
            new JSCard(`## How are if/else/elseif statements written out?`,
            `
                if (anyTrueCondition) {
                    // execute this code...
                } else if (someOtherTrueCondition) {
                    // execute this code...
                } else {
                    // do this thing if other conditions are not true
                }
            `)
        ]
    },
    {
        title: 'Functions',
        cards: [
            new JSCard(
                `## Write a function add which takes two inputs and adds them together`,
                `
                    function add(a, b) {
                        return a + b
                    }
                `
            ),
            new JSCard(
                `## Write a function capitalize which takes a string and makes it uppercase`,
                `
                    function capitalize(str) {
                        return str.toUpperCase()
                    }
                `
            )
        ]
    }
]
