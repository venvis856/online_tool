// @ts-ignore
import React, { FC, useState } from 'react'
import { UiBody, UiBottom, UiCenter, UiLeft, UiRight } from '../uiCommon/ui'
import { Input, Button, message } from 'antd'
import { QqOutlined, DoubleRightOutlined } from '@ant-design/icons'
import copy from 'copy-to-clipboard'
import { format } from 'sql-formatter';
import CodeMirror from '@uiw/react-codemirror';
import { sql } from '@codemirror/lang-sql';
import { okaidia } from '@uiw/codemirror-theme-okaidia';


const { TextArea } = Input

interface IndexProps {
}

const Index: FC<IndexProps> = props => {
  const {} = props

  const [value, setValue] = useState('')


  const handleUrlCode = (code: string) => {
    if (value === '') return
    switch (code) {
      case 'en':
        let data=format(value, { language: 'mysql' })
        console.log(data, '====data')
        setValue(data)
        break
      default:
    }
  }

  const onChangeCode = React.useCallback((value, viewUpdate) => {
    console.log('value:', value);
    setValue(value)
  }, []);

  return (
    <>
        <UiBody height={'600px'}>
          <UiLeft width={'100%'}>
            {/*<TextArea*/}
            {/*  style={{ height: '100%' }}*/}
            {/*  value={value}*/}
            {/*  onChange={(e) => {*/}
            {/*    setValue(e.target.value)*/}
            {/*  }}*/}
            {/*/>*/}
            <CodeMirror
              value={value}
              height="600px"
              extensions={[sql({})]}
              onChange={onChangeCode}
              theme={okaidia}
            />
          </UiLeft>
        </UiBody>
        <UiBottom>
          <Button type='primary' shape='round' icon={<QqOutlined />} onClick={() => {
            handleUrlCode('en')
          }} style={{ marginRight: '20px' }}>
            格式化
          </Button>
          <Button type='default' onClick={() => {
            copy(value)
            message.success('复制成功')
          }} style={{ marginRight: '20px', background: '#fff', color: '#4390F7' }}>
            复制到剪切板
          </Button>
        </UiBottom>
    </>
  )

}

export default Index
