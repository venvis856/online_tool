// @ts-ignore
import React, { FC, useState } from 'react'
import { UiBody, UiBottom, UiLeft } from '../uiCommon/ui'
import { Input, Button, message } from 'antd'
import { QqOutlined } from '@ant-design/icons'
import copy from 'copy-to-clipboard'
import pretty from 'pretty'

const { TextArea } = Input

interface IndexProps {
}

const Index: FC<IndexProps> = props => {
  const {} = props

  const [value, setValue] = useState('')

  const handleUrlCode = (code: string) => {
    switch (code) {
      case 'en':
        setValue(pretty(value, {ocd: true}))
        break;
      default:
    }
  }

  return (
    <>
        <UiBody height={'600px'}>
          <UiLeft width={'100%'}>
            <TextArea
              style={{ height: '100%' }}
              value={value}
              onChange={(e) => {
                setValue(e.target.value)
              }} />
          </UiLeft>
        </UiBody>
        <UiBottom>
          <Button type='primary' shape='round' icon={<QqOutlined />} onClick={() => {
            handleUrlCode('en')
          }} style={{marginRight:'20px'}}>
            格式化
          </Button>
          <Button type='default'  onClick={() => {
            copy(value)
            message.success('复制成功');
          }} style={{marginRight:'20px',background:'#fff',color:'#4390F7'}}>
            复制到剪切板
          </Button>
        </UiBottom>
    </>


  )
}

export default Index
