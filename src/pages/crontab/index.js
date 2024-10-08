// @ts-ignore
import React, { FC, useState} from 'react'
import { UiBorderDiv, UiCrontabBoldDiv, UiCrontabDiv, UiNormalDiv } from '../uiCommon/ui'
import { Button, Input } from 'antd'
import { QqOutlined } from '@ant-design/icons'
import CodeMirror from '@uiw/react-codemirror'
import { sql } from '@codemirror/lang-sql'
import { okaidia } from '@uiw/codemirror-theme-okaidia'
import { formatDate } from '../../utils/commonFunc'

const Index = props => {
  const {} = props
  const [value,setValue]=useState("0 */12 * * *")
  const [arrData,setArrData]=useState( [])

  const handleUrlCode = (code) => {
    if(value===''){
      setArrData([])
      return
    }
    switch (code) {
      case 'en':
        let parser = require('cron-parser');
        try {
          let data = [];
          let interval = parser.parseExpression(value);
          for (let i = 0; i < 7; i++) {
            data.push(formatDate(interval.next().toString()));
          }

          setArrData(data)
        } catch (err) {
          console.log('Error: ' + err.message);
        }

        break;
      default:
    }
  }

  return (
    <>
      <div className={'content_body'}>
        <div>CRON表达式是一个字符串，包含五个到七个由空格分隔的字段（每种软件不一样），表示一组时间，通常作为执行某个程序的时间表。</div>
        <div>注释以注释标记#开始，并且必须单独在一行上。</div>
        <UiNormalDiv>
          <span style={{ color: 'red' }}>0 */12 * * *</span> [user] [command] 请只输入红色部分。
        </UiNormalDiv>
        <UiCrontabDiv>
          <span>Cron表达式:</span>
          <Input value={value} onChange={(e)=>{
            setValue(e.target.value)
          }} style={{width:'200px',marginRight:'20px'}} />
          <Button type='primary' shape='round' icon={<QqOutlined />} onClick={() => {
            handleUrlCode('en')
          }} style={{marginRight:'20px'}}>
            查询执行时间
          </Button>
        </UiCrontabDiv>
        <UiNormalDiv>
          <span>说明</span>
         <code>
           <CodeMirror
             value={`
*     *     *     *     *
┬    ┬    ┬    ┬    ┬    ┬
│    │    │    │    │    |
│    │    │    │    │    └ day of week (0 - 7, 1L - 7L) (0 or 7 is Sun)
│    │    │    │    └───── month (1 - 12)
│    │    │    └────────── day of month (1 - 31, L)
│    │    └─────────────── hour (0 - 23)
│    └──────────────────── minute (0 - 59)
└───────────────────────── second (0 - 59, optional)
`}
             height="250px"
             extensions={[sql({})]}
             onChange={()=>{}}
             theme={okaidia}
           />

         </code>
        </UiNormalDiv>
        <UiCrontabBoldDiv>接下来7次的执行时间:</UiCrontabBoldDiv>
        {
          arrData.map(item=>{
            return <UiBorderDiv>{item}</UiBorderDiv>
          })
        }
      </div>
    </>
  )
}

export default Index
