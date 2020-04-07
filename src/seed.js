function makeId() {
    let id = 0
    return () => id++
}
let id = makeId()

class Card {
    constructor(front, back, meta) {
        this.id = id()
        this.front = normalize(front)
        this.back = normalize(back)
        this.side = 'front'
        this.meta = meta
    }
}

class Deck {
    constructor(title, cards) {
        this.title = title
        this.cards = cards;
    }
}

class JSCard extends Card {
    constructor(front, back, meta) {
        super(front, back, meta)
        this.language = 'js'
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
    new Deck(
        'Syntax',
        [
            new JSCard(`## variable declaration`,
            `
                var x = 1
                let y = 'a'
                const b = [1,2,3]
            `,
            'variable declaration'
            ),
            new JSCard(`## if/else/elseif statements`,
            `
                if (anyTrueCondition) {
                    // execute this code...
                } else if (someOtherTrueCondition) {
                    // execute this code...
                } else {
                    // do this thing if other conditions are not true
                }
            `,
            'If/else/else if'
            ),
            new JSCard(`## for loop`,
            `
                /*
                    for loops consist of 3 parts
                    1. variable initialization: let i = 0
                    2. a comparison: i < 10 (once false the for loop stops)
                    3. a change in value: i++ (same as saying i = i + 1)
                */
                for(let i = 0; i < 10; i++) {
                    // i gives me 0 through 9
                }
            `,
            'for loops'
            ),
            new JSCard(`## function`,
            `
                /*
                    for loops consist of 3 parts
                    1. variable initialization: let i = 0
                    2. a comparison: i < 10 (once false the for loop stops)
                    3. a change in value: i++ (same as saying i = i + 1)
                */
                function functionName(param1, param2) {
                    // param1 is the first value passed in (1)
                    // param2 is the second value passed in ([1,2,3])
                }

                functionName(1, [1,2,3]) 
            `,
            'functions'
            ),
        ]
    ),
    new Deck(
        'Basics',
        [
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
            `,
            'var let & const'
            ),
            
        ]
    ),
    new Deck(
        'Functions',
        [
            new JSCard(
                `## Write a function add which takes two inputs and adds them together`,
                `
                    function add(a, b) {
                        return a + b
                    }
                `,
                'add()'
            ),
            new JSCard(
                `## Write a function capitalize which takes a string and makes it uppercase`,
                `
                    function capitalize(str) {
                        return str.toUpperCase()
                    }
                `,
                'capitalize()'
            )
        ]
    ),
]
