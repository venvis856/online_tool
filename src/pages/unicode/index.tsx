// @ts-ignore
import React, { FC, useState } from 'react'
import { UiBody, UiBottom, UiCenter, UiLeft, UiRight } from '../uiCommon/ui'
import { Input, Button, message } from 'antd'
import { QqOutlined,DoubleRightOutlined } from '@ant-design/icons'
import copy from 'copy-to-clipboard'


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
      case 'asciiToUnicode':
        setTargetVal(reconvert(value))
        break;
      case 'UnicodeToAscii':
        setTargetVal(unicode1(value))
        break;
      case 'UnicodeToCh':
        setTargetVal(reconvert(value))
        break;
      case 'chnToUnicode':
        setTargetVal(chnToUnicodeTool(value))
        break;
      default:
    }
  }

  // Unicode转中文汉字、ASCII转换Unicode
  const reconvert=(str)=> {
    str = str.replace(/(\\u)(\w{1,4})/gi, function ($0) {
      return String.fromCharCode(
        parseInt(escape($0).replace(/(%5Cu)(\w{1,4})/g, "$2"), 16)
      );
    });
    str = str.replace(/(&#x)(\w{1,4});/gi, function ($0) {
      return String.fromCharCode(
        parseInt(
          escape($0).replace(/(%26%23x)(\w{1,4})(%3B)/g, "$2"),
          16
        )
      );
    });
    str = str.replace(/(&#)(\d{1,6});/gi, function ($0) {
      return String.fromCharCode(
        parseInt(
          escape($0).replace(/(%26%23)(\d{1,6})(%3B)/g, "$2")
        )
      );
    });
    return str;
  }

  // Unicode转换ASCII
  const unicode1=(str) => {
    var value = "";
    for (var i = 0; i < str.length; i++)
      value += "&#" + str.charCodeAt(i) + ";";
    return value;
  }

  // 中文汉字转Unicode
  const chnToUnicodeTool=(str) => {
    var value = "";
    for (var i = 0; i < str.length; i++) {
      value +=
        "\\u" +
        left_zero_4(parseInt(str.charCodeAt(i)).toString(16));
    }
    return value;
  }
  const left_zero_4=(str)=> {
    if (str != null && str != "" && str != "undefined") {
      if (str.length == 2) {
        return "00" + str;
      }
    }
    return str;
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
            handleUrlCode('asciiToUnicode')
          }} style={{marginRight:'20px'}}>
            ASCII转Unicode
          </Button>
          <Button type='primary' shape='round' icon={<QqOutlined />} onClick={() => {
            handleUrlCode('UnicodeToAscii')
          }} style={{marginRight:'20px'}}>
            Unicode转ASCII
          </Button>
          <Button type='primary' shape='round' icon={<QqOutlined />} onClick={() => {
            handleUrlCode('UnicodeToCh')
          }} style={{marginRight:'20px'}}>
            Unicode转中文
          </Button>
          <Button type='primary' shape='round' icon={<QqOutlined />} onClick={() => {
            handleUrlCode('chnToUnicode')
          }} style={{marginRight:'20px'}}>
            中文转Unicode
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
