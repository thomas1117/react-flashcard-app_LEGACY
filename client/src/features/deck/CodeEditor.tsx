import React, { useState, useEffect } from 'react'
// import Editor from 'react-simple-code-editor'
// import { highlight, languages } from 'prismjs/components/prism-core'
// import 'prismjs/components/prism-clike'
// import 'prismjs/components/prism-javascript'
import parser from 'fast-xml-parser'
import AceEditor from 'react-ace'

import 'ace-builds/src-noconflict/mode-html'
import 'ace-builds/src-noconflict/theme-monokai'
 

const start = `<deck title="js">
    <section title="variables" language="markdown">
        <card>
            <front>
            ## card start
            </front>
            <back>
            # yo!
            </back>
            <meta>this is an example</meta>
        </card>
    </section>
</deck>
`

export default function CodeEditor(props: any) {
    const [internalCode, setInternalCode] = useState('')
    useEffect(() => {
        setInternalCode(props.incomingCode)
    }, [props.incomingCode])
    useEffect(() => {
        setInternalCode(start)
        props.init(start)
    }, [])
    function handleCodeChange(code) {
        setInternalCode(code)
        props.onCodeChange(code)
    }
    return (
        <AceEditor
            mode="html"
            theme="monokai"
            name="blah2"
            onChange={handleCodeChange}
            fontSize={14}
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            value={internalCode}
            setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: false,
                enableSnippets: false,
                showLineNumbers: true,
                tabSize: 2,
            }}
            style={{width: '100%', height: '100%'}}
        />
        // <Editor
        //     value={internalCode}
        //     onValueChange={code => handleCode(code)}
        //     highlight={code => highlight(code, languages.js)}
        //     padding={10}
        //     style={{
        //         fontFamily: '"Fira code", "Fira Mono", monospace',
        //         fontSize: 12,
        //         height: '100%',
        //         width: '100%',
        //     }} />
    )
}