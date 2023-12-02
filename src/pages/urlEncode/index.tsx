// @ts-ignore
import React, { FC, useState } from 'react'
import { UiBody, UiBottom, UiCenter, UiLeft, UiRight } from '../uiCommon/ui'
import { Input, Button, message } from 'antd'
import { QqOutlined,DoubleRightOutlined } from '@ant-design/icons'
import copy from 'copy-to-clipboard'
const  decodeUriComponent  =  require ( 'decode-uri-component' ) ;

const { TextArea } = Input

interface IndexProps {
}

const Index: FC<IndexProps> = props => {
  const {} = props

  const [value, setValue] = useState('')
  const [targetVal, setTargetVal] = useState('')

  const handleUrlCode = (code: string) => {
    if(value===''){
      setTargetVal('')
      return
    }
    switch (code) {
      case 'en':
        setTargetVal(encodeURIComponent(value))
        break;
      case 'de':
        setTargetVal(decodeUriComponent(value))
        // setTargetVal(decodeURIComponent(value.replaceAll('+', '%20')))
        break;
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
            <DoubleRightOutlined style={{color:'#4390F7',fontSize:'25px'}}  />
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
          }} style={{marginRight:'20px'}}>
            url编码
          </Button>
          <Button type='primary' shape='round' icon={<QqOutlined />} onClick={() => {
            handleUrlCode('de')
          }} style={{marginRight:'20px'}}>
            url解码
          </Button>
          <Button type='default'  onClick={() => {
            copy(targetVal)
            message.success('复制成功');
          }} style={{marginRight:'20px',background:'#fff',color:'#4390F7'}}>
            复制到剪切板
          </Button>
        </UiBottom>
    </>


  )
}

export default Index
