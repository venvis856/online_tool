// @ts-nocheck
import { rust } from '@codemirror/lang-rust'
import { sql } from '@codemirror/lang-sql'
// import { eclipse } from '@uiw/codemirror-theme-eclipse'
import CodeMirror from '@uiw/react-codemirror'
import './Editor.less'
import { EditorProps } from './type.d'
import { okaidia } from '@uiw/codemirror-theme-okaidia'

export default (props: EditorProps) => {
  const { codeLanguage, code, placeholder, onChange, height="" } = props

  return (
    <div className="editor">
      <CodeMirror
        value={code}
        height={height!==""?height:'100%'}
        // theme={eclipse}
        theme={okaidia}
        placeholder={placeholder}
        extensions={codeLanguage === 'sql' ? [sql({})] : [rust()]}
        onChange={onChange}
      />
    </div>
  )
}
