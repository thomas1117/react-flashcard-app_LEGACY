// methods and objects
let person = {
    age: 4,
    first: 'Henry',
    last: 'Henryson',
    getName: function () {
        // methods are functions on objects
        return this.first + ' ' this.last
    },
    // I'm a method shorthand!
    greet() {
        return `Hi, I'm ${this.getName()}`
    }
}
person.getName() // Henry Henryson
person.greet() // Hi, I'm Henry Henryson
// some methods on Object constructor prototype
person.hasOwnProperty(prop) // true
person.hasOwnProperty('name') // false

// array methods
const nums = [1,2,3]
// map: transforms each item in array based on return
const multiply = nums.map(item => item * 2) // [2,4,6]
// filter: if condition is true keep item else dont
const filtered = nums.filter(i => i % 2 === 0) // [2]
// reduce: reduces an array to a single value
const reduced = nums.reduce((a,b) => a + b) // 6