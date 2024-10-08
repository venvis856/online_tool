// @ts-ignore
import React, { FC, useState } from 'react'
import { UiBody, UiBottom, UiCenter, UiLeft, UiRight } from '../uiCommon/ui'
import { Input, Button, message,Tabs } from 'antd'
import { QqOutlined,DoubleRightOutlined } from '@ant-design/icons'
import copy from 'copy-to-clipboard'
// import { format } from 'sql-formatter';
import MysqlFormat from '../sql/index'
import HtmlJsFormat from '../html_js_format/index'

const { TextArea } = Input

interface IndexProps {
}

const Index: FC<IndexProps> = props => {
  const {} = props

  return (
    <>
      <div className={'content_body'}>

        <Tabs defaultActiveKey="js" centered={true} size={'large'}>
          <Tabs.TabPane tab="Html/Js" key="js" >
            <HtmlJsFormat />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Mysql" key="mysql" >
            <MysqlFormat />
          </Tabs.TabPane>
        </Tabs>

      </div>
    </>


  )
}

export default Index
