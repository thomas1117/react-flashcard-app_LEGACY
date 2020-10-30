import React, { useState } from 'react'
import Editor from 'react-simple-code-editor'
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-javascript'
import parser from 'fast-xml-parser'
console.log(languages)
 
const config = {
    attributeNamePrefix : "",
    attrNodeName: "attr", //default is 'false'
    textNodeName : "#text",
    ignoreAttributes : false,
    ignoreNameSpace : false,
    allowBooleanAttributes : false,
    parseNodeValue : true,
    parseAttributeValue : false,
    trimValues: true,
    cdataTagName: "__cdata", //default is 'false'
    cdataPositionChar: "\\c",
    parseTrueNumberOnly: false,
    arrayMode: true, //"strict"
    // attrValueProcessor: (val, attrName) => he.decode(val, {isAttributeValue: true}),//default is a=>a
    // tagValueProcessor : (val, tagName) => he.decode(val), //default is a=>a
    stopNodes: ["parse-me-as-string"]
}

function safelyEncodeXML(m) {
    return encodeURIComponent(m)
  }
  
function decodeXML(m) {
return decodeURIComponent(m)
}

function escapeInvalidXML(text) {
    const regex = /(?<=\<back\>)[\s\S]*?(?=\<\/back\>)/g
    const parsed = String(text).replace(regex, safelyEncodeXML)
    const regex2 = /(?<=\<front\>)[\s\S]*?(?=\<\/front\>)/g
    const parsed2 = String(parsed).replace(regex2, safelyEncodeXML)
    const regex3 = /(?<=\<meta\>)[\s\S]*?(?=\<\/meta\>)/g
    const parsed3 = String(parsed).replace(regex3, safelyEncodeXML)
    return parsed3
}

export default function CodeEditor(props: any) {
    const [internalCode, setInternalCode] = useState('')
    function handleCode(code) {
        setInternalCode(code)
        try {
            const tObj = parser.getTraversalObj(escapeInvalidXML(code), config)
            const jsonObj = parser.convertToJson(tObj, config)
            const o = jsonObj.deck[0]
            const newObj = {
                id: Math.random(),
                title: o.attr.title,
                sections: o.section.map(x => {
                    return {
                        ...x,
                        id: Math.random(),
                        title: x.attr.title,
                        language: x.attr.language,
                        cards: x.card.map(i => {
                            console.log(i)
                            return {
                                id: Math.random(),
                                front: decodeXML(i.front),
                                back: decodeXML(i.back),
                                meta: decodeXML(i.meta),
                                language: i.language || 'js'
                              }
                        })
                    }
                })
            }
            props.onCodeChange(newObj)
        } catch {

        }
        
    }
    return (
        <Editor
            value={internalCode}
            onValueChange={code => handleCode(code)}
            highlight={code => highlight(code, languages.js)}
            padding={10}
            style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 12,
            }} />
    )
}