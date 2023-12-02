// @ts-ignore
import React, { FC, useState } from 'react'
import { UiBody, UiBottom, UiCenter, UiLeft, UiRight } from '../uiCommon/ui'
import { Input, Button } from 'antd'
import { QqOutlined, DoubleRightOutlined } from '@ant-design/icons'


const { TextArea } = Input

interface IndexProps {
}

const Index: FC<IndexProps> = props => {
  const {} = props

  const [value, setValue] = useState('')
  const [targetVal, setTargetVal] = useState('')

  const handleUrlCode = (code: string) => {
    if (value === '') {
      setTargetVal('')
      return
    }
    switch (code) {
      case 'en':
        let enData = value.replace(/[^\u0000-\u00FF]/g, function($0) {
          return escape($0).replace(/(%u)(\w{4})/gi, '&#x$2;')
        })
        setTargetVal(enData)
        break
      case 'de':
        let deData = unescape(value.replace(/&#x/g, '%u').replace(/;/g, ''))
        setTargetVal(deData)
        break
      default:
    }
  }

  return (
    <>
      <UiBody height={'600px'}>
        <UiLeft>
          <TextArea
            style={{ height: '100%' }}
            value={value}
            onChange={(e) => {
              setValue(e.target.value)
            }} />
        </UiLeft>
        <UiCenter>
          <DoubleRightOutlined style={{ color: '#4390F7', fontSize: '25px' }} />
        </UiCenter>
        <UiRight>
          <TextArea
            style={{ height: '100%' }}
            value={targetVal}
          />
        </UiRight>
      </UiBody>
      <UiBottom>
        <Button type='primary' shape='round' icon={<QqOutlined />} onClick={() => {
          handleUrlCode('en')
        }} style={{ marginRight: '20px' }}>
          utf8编码
        </Button>
        <Button type='primary' shape='round' icon={<QqOutlined />} onClick={() => {
          handleUrlCode('de')
        }}>
          utf8解码
        </Button>

      </UiBottom>

    </>


  )
}

export default Index
