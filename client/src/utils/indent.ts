export function normalize(str: string) {
    if (!str) {
        return
    }
    let strArr = str.split('\n')
    let smallest = Infinity
    let filteredCollection: any = []
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