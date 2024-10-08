// @ts-ignore
import React, { FC, useState } from 'react'
import { UiBody, UiBottom, UiCenter, UiLeft, UiRight } from '../uiCommon/ui'
import { Input, Button, message } from 'antd'
import { QqOutlined,DoubleRightOutlined } from '@ant-design/icons'
import copy from 'copy-to-clipboard'
import md5 from 'js-md5'


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
        setTargetVal(md5(value))
        break;
      default:
    }
  }

  return (
    <>
      <div className={'content_body'}>
        <UiBody height={'60%'}>
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
            md5加密
          </Button>
          <Button type='default'  onClick={() => {
            copy(targetVal)
            message.success('复制成功');
          }} style={{marginRight:'20px',background:'#fff',color:'#4390F7'}}>
            复制到剪切板
          </Button>
        </UiBottom>
      </div>
    </>
  )
}

export default Index
