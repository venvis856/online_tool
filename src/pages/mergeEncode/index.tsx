// @ts-ignore
import React, { FC, useState } from 'react'
import { UiBody, UiBottom, UiCenter, UiLeft, UiRight } from '../uiCommon/ui'
import { Input, Button, message,Tabs } from 'antd'
import { QqOutlined,DoubleRightOutlined } from '@ant-design/icons'
import copy from 'copy-to-clipboard'
// import { format } from 'sql-formatter';
import UrlEncode from '../urlEncode/index'
import Utf8Encode from '../utf8/index'
import Unicode from '../unicode/index'
import HtmlEncode from '../html/index'
import Base64Encode from '../base64/index'


const { TextArea } = Input

interface IndexProps {
}

const Index: FC<IndexProps> = props => {
  const {} = props

  return (
    <>
      <div className={'content_body'}>

        <Tabs defaultActiveKey="UrlEncode" centered={true} size={'large'}>
          <Tabs.TabPane tab="UrlEncode" key="UrlEncode" >
            <UrlEncode />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Utf8" key="Utf8" >
            <Utf8Encode />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Unicode" key="Unicode" >
            <Unicode />
          </Tabs.TabPane>
          <Tabs.TabPane tab="HtmlEncode" key="HtmlEncode" >
            <HtmlEncode />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Base64" key="Base64" >
            <Base64Encode />
          </Tabs.TabPane>
        </Tabs>

      </div>
    </>


  )
}

export default Index
