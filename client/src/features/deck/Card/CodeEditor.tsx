import React, { useState, useEffect } from 'react'
import AceEditor from 'react-ace'
import 'ace-builds/src-noconflict/mode-html'
import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/mode-markdown'
import 'ace-builds/src-noconflict/theme-monokai'

export default function CodeEditor(props: any) {
    const [internalCode, setInternalCode] = useState('')
    const { incomingCode, onCodeChange, init } = props
    useEffect(() => {
        setInternalCode(incomingCode)
    }, [incomingCode, setInternalCode])
    useEffect(() => {
        setInternalCode(incomingCode)
        init(incomingCode)
    }, [setInternalCode, init, incomingCode])
    function handleCodeChange(code) {
        setInternalCode(code)
        onCodeChange(code)
    }
    return (
        <div style={{width: '100%', height: '100%'}}>
        <AceEditor
            mode={props.language}
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