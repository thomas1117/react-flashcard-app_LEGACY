import React, { useState, useEffect } from 'react'
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
        <div style={{width: '100%', height: '100%'}}>
            {props.invalidState && <div style={{
                width: '20px',
                height: '20px',
                color: '#fff',
                background: 'red',
                borderRadius: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                i
            </div>}
        <AceEditor
            mode="html"
            theme="monokai"
            name="blah2"
            onChange={handleCodeChange}
            fontSize={14}
            showPrintMargin={false}
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