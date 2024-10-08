// @ts-ignore
import React, { FC, useState } from 'react'
import { UiBody, UiBottom, UiCenter, UiLeft, UiRight } from '../uiCommon/ui'
import { Input, Button } from 'antd'
import { QqOutlined,DoubleRightOutlined } from '@ant-design/icons'

// todo 格式化html代码，使其更好看
// import pretty from 'pretty'

const { TextArea } = Input

interface IndexProps {}

const Index: FC<IndexProps> = props => {
  const {} = props

  const [value, setValue] = useState('')
  const [targetVal, setTargetVal] = useState('')
  const [show,setShow]=useState("en")

  const handleUrlCode = (code: string) => {
    if(value===''){
      setTargetVal('')
      return
    }
    switch (code) {
      case 'en':
        let data = value.replace(/[\u00A0-\u9999<>\&]/g, function(i) {
          return '&#'+i.charCodeAt(0)+';';
        })
        setTargetVal(data)
        setShow('en')
        break;
      case 'de':
        // let data2=  ((content) => {
        //   let txt = document.createElement("text");
        //   txt.innerHTML = content;
        //   return txt.value;
        // })(value);
        // setTargetVal(data2)
        // break;
        setTargetVal(value)
        setShow('de')
        break;
      default:
    }
  }

  console.log(value,targetVal,show,"====show")

  return (
    <>
        <UiBody height={'600px'}>
          <UiLeft>
            <TextArea
              style={{ height: '100%' }}
              value={value}
              onChange={(e) => {
                setValue(e.target.value)
              }}
            />
          </UiLeft>
          <UiCenter>
            <DoubleRightOutlined style={{color:'#4390F7',fontSize:'25px'}}  />
          </UiCenter>
          <UiRight>
            {
              show==='en'?  <TextArea
                  style={{ height: '100%' }}
                  value={targetVal}
                />:
                <div
                  dangerouslySetInnerHTML={{
                    __html: targetVal
                  }}
                />
            }
            {/*<TextArea*/}
            {/*  style={{ height: '100%' }}*/}
            {/*  value={targetVal}*/}
            {/*/>*/}
            {/*{targetVal}*/}
          </UiRight>
        </UiBody>
        <UiBottom>
          <Button type='primary' shape='round' icon={<QqOutlined />} onClick={() => {
            handleUrlCode('en')
          }} style={{marginRight:'20px'}}>
            HtmlEncode编码
          </Button>
          <Button type='primary' shape='round' icon={<QqOutlined />} onClick={() => {
            handleUrlCode('de')
          }}>
            HtmlDecode解码
          </Button>

        </UiBottom>
    </>
  )
}

export default Index
