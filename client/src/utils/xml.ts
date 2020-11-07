import parser from 'fast-xml-parser'
import UUID from './id'
import { normalize } from './indent'

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

export function base64ToXML(base64: string | ArrayBuffer) {    
    function base64ToText(str: string) {
        try {
            return decodeURIComponent(atob(str).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''))
        }
        catch (e) {
            throw new Error('base 64 decoding failed on XML')
        }
    }
  
    function parseBase64(base64) {
        var pattern = /^data:([a-z0-9\.\-\+\_\/]+)(?:;([a-z0-9\=\-\_\+]+))*,(.*)$/im;
        var match = base64.match(pattern)
        if (match == null) {
            return {
                data: base64,
                b64: true
            }
        }
  
        return {
            mime: match[1],
            b64: match[2].includes('base64'),
            data: match[3]
        }
    }
  
    const parsed = parseBase64(base64)
    const {b64, data} = parsed
    return b64 ? base64ToText(data) : data
  }

  export function readXMLFile(file: Blob) {
    return new Promise((resolve, reject) => {
        // Check if the file is an image.
        if (file.type && !file.type.includes('xml')) {
            reject('File is not xml.')
        }
        
        const reader = new FileReader();
        reader.addEventListener('load', (event) => {
                const res = event?.target?.result
                if (res) {
                    const xml = base64ToXML(res)
                    resolve(xml)
                }
        });
        reader.readAsDataURL(file);
    })
  }

export function xmlToJSON(code) {
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
    const tObj = parser.getTraversalObj(escapeInvalidXML(code), config)
    const jsonObj = parser.convertToJson(tObj, config)
    try {
        const o = jsonObj.deck[0]
        const newObj = {
            id: UUID(),
            title: o.attr.title,
            sections: o.section.map(x => {
                return {
                    ...x,
                    id: UUID(),
                    title: x.attr.title,
                    language: x.attr.language,
                    cards: x.card.map(i => {
                        // replace is here due to new line characters...
                        return {
                            id: UUID(),
                            front: normalize(decodeXML(i.front)),
                            back: normalize(decodeXML(i.back)),
                            meta: normalize(decodeXML(i.meta)),
                            language: i.attr && i.attr.language || x.attr.language || 'js'
                        }
                    })
                }
            })
        }
        return newObj
    } catch (err) {
        throw new Error('Unable to parse')
    }
}

export function JSONToXML() {
    
}