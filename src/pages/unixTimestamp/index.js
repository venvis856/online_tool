//@ts-ignore
import React, { FC, useState } from 'react'
import { UiBody, UiBottom, UiCenter, UiLeft, UiLi, UiList, UiRight } from '../uiCommon/ui'
import { Input, Button } from 'antd'
import { QqOutlined,DoubleRightOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'

interface IndexProps {
}

const Index: FC<IndexProps> = props => {
  const {} = props
  const [unixValueS,setUnixValueS]=useState(""+dayjs().unix())
  const [unixTargetValueS,setUnixTargetValueS]=useState("")

  const [unixValueMS,setUnixValueMS]=useState(""+dayjs().valueOf())
  const [unixTargetValueMS,setUnixTargetValueMS]=useState("")

  const [dateValueS,setDateValueS]=useState(""+dayjs().format('YYYY-MM-DD HH:mm:ss'))
  const [dateTargetValueS,setDateTargetValueS]=useState("")

  const [dateValueMs,setDateValueMs]=useState(""+dayjs().format('YYYY-MM-DD HH:mm:ss'))
  const [dateTargetValueMS,setDateTargetValueMS]=useState("")


  return (
    <>
      <div className={'content_body'}>
        <UiBody height={'100%'}>
          <UiList width={'70%'} >

            <UiLi height={'40px'} >
              <span>Unix时间戳(s)</span>
              <Input value={unixValueS} onChange={e=>{setUnixValueS(e.target.value)}}/>
              <Button type='primary' icon={<QqOutlined />} onClick={() => {
                let data= dayjs.unix(+unixValueS).format('YYYY-MM-DD HH:mm:ss')
                setUnixTargetValueS(data)
              }}>
                {"转日期->"}
              </Button>
              <Input value={unixTargetValueS} />
            </UiLi>

            <UiLi height={'40px'} >
              <span>Unix时间戳(ms)</span>
              <Input value={unixValueMS}  onChange={e=>{setUnixValueMS(e.target.value)}} />
              <Button type='primary' icon={<QqOutlined />} onClick={() => {
                let data= dayjs(+unixValueMS).format('YYYY-MM-DD HH:mm:ss SSS')
                setUnixTargetValueMS(""+data)
              }}>
                {"转日期->"}
              </Button>
              <Input value={unixTargetValueMS} />
            </UiLi>


            <UiLi height={'40px'} >
              <span>日期 </span>
              <Input value={dateValueS} onChange={(e)=>setDateValueS(e.target.value)} />
              <Button type='primary' icon={<QqOutlined />} onClick={() => {
                let data=dayjs(dateValueS).unix()
                setDateTargetValueS(""+data)
              }}>
                {"转时间戳(s)->"}
              </Button>
              <Input value={dateTargetValueS} />
            </UiLi>

            <UiLi height={'40px'} >
              <span>日期</span>
              <Input value={dateValueMs} onChange={(e)=>setDateValueMs(e.target.value)} />
              <Button type='primary' icon={<QqOutlined />} onClick={() => {
                let data=dayjs(""+dateValueMs).valueOf()
                console.log(data,"====data")
                setDateTargetValueMS(""+data)
              }}>
                {"转时间戳(ms)->"}
              </Button>
              <Input value={dateTargetValueMS} />
            </UiLi>

          </UiList>
        </UiBody>
      </div>
    </>


  )
}

export default Index
