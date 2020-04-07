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
            new JSCard(`## if/else/else if statements`,
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
            new JSCard(`## arithmetic operators`,
            `
                /*
                    (+, -, /, *, %, ++, ...)
                */
                // modulus % (division remainder)
                let y = 5
                let x = y % 2 // 1 is the remainer so x is now 1

                x++ // 3 (same as saying x = x + 1)
                y-- // 4 (same as saying y = y - 1)
            `,
            'arithmetic operators'
            ),
            new JSCard(`## assignment operators`,
            `
                /*
                    (=, +=, -=, ...)
                */
                let y = 5
                y = y + 1 (y is now 6)
                let x = 10
                x += 5 (x is now 15)
            `,
            'assignment operators'
            ),
            new JSCard(`## comparison operators`,
            `
                /*
                    (==, ===)

                    == // equal to
                    === // 	equal value and equal type
                    != // not equal to
                */
                let x = 5
                x === "5" // false
                x == 5 // true
                let num = 10
                let moreThan = num > 5 // true
                x !== 1 // true
                
            `,
            'comparison operators'
            ),
            new JSCard(`## logical operators`,
            `
                /*
                    && (and)
                    || (or)
                    !  (not)

                    Logical operators are used to determine the logic between variables or values.
                    You can combine these just fine and use as many as you want
                */
                let x = 5
                let y = 10

                (x > 5 && y == 10) // false
                (x == 5 && y === 10) // true
                (x == 5 || y === false) // true
                (!false) // true
            `,
            'logical operators'
            ),
            new JSCard(
                `## falsey values`,
                `
                    /*
                        null, undefined, '', false, 0
                        are all the "falsey" values
                        everything else is true
                    */
                   let x = ''
                   x == true // false
                   x == false // true
                   let y = null
                   y === null // true
                   y == false // true
                   !y // true
                   !0 // true
                `,
                `falsey values`
            ),
            new JSCard(`## string operators`,
            `
                /*
                    The + operator, and the += operator can also be used to concatenate (add) strings.
                */
                let text = 'hello'
                text = text + ' world' // (text is now 'hello world')
                let bar = 'hello'
                bar += ' there!' // (bar is now 'hello there!')
            `,
            'string operators'
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
            new JSCard(`## for loops continued`,
            `
                // you can do all the stuff above with for loops...
                let str = ''
                let arr = []
                for(let i = 0; i < 10; i++) {
                    str += 'x'
                    arr.push(i)
                }

                // str is now 'xxxxxxxxxx'
                // arr is now [0,1,2,3,4,5,6,7,8,9]
            `,
            'for loops continued'
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
                `## what is a statement?`,
                `
                /* 
                    A statement can set a variable equal to a value. 
                    A statement can also be a function call, i.e. document. ... 
                    Statements define what the script will do and how it will be done. */
                    var x = 5
                    foo()
                `,
                `statements`
            ),
            new JSCard(
                `## what are primitive values?`,
                `
                /* 
                    In JavaScript there are 6 primitive types: 
                    undefined
                    null
                    boolean
                    string
                    symbol
                    and number . Everything else is an object.
                */
                let str = 'hello'
                let bln = true // or false
                `,
                `primitive values`
            ),
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
            new JSCard(
                `## arrays`,
                `
                    // The Array object is used to store multiple values in a single variable:
                    // Array indexes are zero-based: The first element in the array is 0, the second is 1, and so on.
                    let arr = [1,2,3]
                `,
                `arrays`
            ),
            new JSCard(
                `## objects`,
                `
                    // objects are key value pairs (key being a number or string)
                    // you can access the key with dot notation => .
                    // also you can use brakcets with a string inside
                    let obj = {
                        key: 'value',
                        list: [1,2,3],
                        name: 'John'
                    }
                    let keyStr = 'name'
                    o.key // 'value'
                    o['list'] // [1,2,3]
                    o[keyStr] // 'John'
                `,
                `objects`
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
