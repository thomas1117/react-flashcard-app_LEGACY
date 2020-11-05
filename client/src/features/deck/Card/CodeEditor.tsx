import React, { useState, useEffect } from 'react'
import AceEditor from 'react-ace'
import 'ace-builds/src-noconflict/mode-html'
import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/mode-markdown'
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
        setInternalCode(props.incomingCode)
        props.init(props.incomingCode)
    }, [])
    function handleCodeChange(code) {
        setInternalCode(code)
        props.onCodeChange(code)
    }
    return (
        <div style={{width: '100%', height: '100%'}}>
        <AceEditor
            mode={props.language}
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
        </div>
    )
}