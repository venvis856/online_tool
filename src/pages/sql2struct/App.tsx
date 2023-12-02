import { IconSetting } from '@douyinfe/semi-icons'
import { Button } from '@douyinfe/semi-ui'
import React, { useEffect, useState } from 'react'
import './App.less'
import Editor from './components/editor/Editor'
import Option from './components/option/Option'
import Toolbar from './components/toolbar/Toolbar'
import logoUrl from './images/logo.png'
import { genGoStructCode } from './core/gostruct'
import { defaultFieldMaps, defaultGoStructOptions, defaultGoStructTags, defaultSpecialIdentifiers } from './core/option'
import { pregSqlStatement } from './core/sql'
import { SqlTable } from './core/type'
import './index.css'
import { UiBody, UiBottom, UiCenter, UiHeader, UiLeft, UiRight } from '../uiCommon/ui'
import { DoubleRightOutlined, QqOutlined } from '@ant-design/icons'
import copy from 'copy-to-clipboard'
import { message } from 'antd'

export default () => {
  const [sqlCode, setSqlCode] = useState(``)

  const [sqlTable, setSqlTable] = useState({} as SqlTable)

  const [goStructCode, setGoStructCode] = useState(`type TableName struct`)

  const [goStructTags, setGoStructTags] = useState(defaultGoStructTags)

  const [optionIsShow, setOptionIsShow] = useState(false)

  const [specialIdentifiers, setSpecialIdentifiers] = useState(defaultSpecialIdentifiers)

  const [fieldMaps, setFieldMaps] = useState(defaultFieldMaps)

  // go struct option change handler
  const goStructOptionOnChange = (tags: string[]) => {
    setGoStructTags(tags)
  }

  // sql code change handler
  const sqlCodeOnChange = (code: string) => {
    setSqlCode(code)
  }

  // render go struct code
  const renderGoStructCode = () => {
    if (!sqlTable || !sqlTable.name || !sqlTable.fields) {
      setGoStructCode(`invalid sql`)
      return
    }
    const code = genGoStructCode(sqlTable, goStructTags, specialIdentifiers, fieldMaps)
    if (!code) {
      setGoStructCode(`gen go struct failed`)
      return
    }
    setGoStructCode(code)
  }

  // after sql code changed
  useEffect(() => {
    const table = pregSqlStatement(sqlCode)
    if (!table) {
      setSqlTable({} as SqlTable)
      return
    }
    setSqlTable(table)
  }, [sqlCode])

  // after sql table changed
  useEffect(() => {
    renderGoStructCode()
  }, [sqlTable])

  // after go struct tags changed
  useEffect(() => {
    renderGoStructCode()
  }, [goStructTags])

  // after special identifiers in options changed
  useEffect(() => {
    renderGoStructCode()
  }, [specialIdentifiers])

  // after field maps in options changed
  useEffect(() => {
    renderGoStructCode()
  }, [fieldMaps])

  // componentDidMount
  useEffect(() => {
    // load demo sql
    setSqlCode('CREATE TABLE \`system_user\` (\n  \`id\` int(10) NOT NULL AUTO_INCREMENT COMMENT \'主键id\',\n  \`username\` varchar(50) NOT NULL DEFAULT \'\' COMMENT \'登录用户名\',\n  \`password\` varchar(255) NOT NULL DEFAULT \'\' COMMENT \'登录密码\',\n  \`salt\` varchar(50) NOT NULL DEFAULT \'\' COMMENT \'密码盐值\',\n  \`email\` varchar(50) NOT NULL DEFAULT \'\' COMMENT \'邮箱\',\n  \`openid\` varchar(50) NOT NULL DEFAULT \'\' COMMENT \'微信标识\',\n  \`phone\` varchar(20) NOT NULL DEFAULT \'\' COMMENT \'手机号\',\n  \`type\` tinyint(1) NOT NULL DEFAULT \'1\' COMMENT \'注册方式\',\n  \`created_at\` int(10) NOT NULL DEFAULT \'0\' COMMENT \'注册时间\',\n  \`status\` tinyint(1) NOT NULL DEFAULT \'0\' COMMENT \'状态\',\n  \`nickname\` varchar(50) NOT NULL DEFAULT \'\' COMMENT \'昵称\',\n  \`avatar_url\` varchar(255) NOT NULL DEFAULT \'\' COMMENT \'头像\',\n  \`gender\` tinyint(1) NOT NULL DEFAULT \'0\' COMMENT \'性别\',\n  \`updated_at\` int(10) NOT NULL DEFAULT \'0\' COMMENT \'更新时间\',\n  \`role_id\` int(10) NOT NULL DEFAULT \'0\' COMMENT \'用户角色\',\n  PRIMARY KEY (\`id\`),\n  KEY \`UsernameIndex\` (\`username\`),\n  KEY \`EmailIndex\` (\`email\`),\n  KEY \`PhoneIndex\` (\`phone\`),\n  KEY \`OpenidIndex\` (\`openid\`)\n) ENGINE=InnoDB AUTO_INCREMENT=652 DEFAULT CHARSET=utf8mb4 COMMENT=\'用户表\'')
  }, [])

  return (
    <div className='content_body'>
      {/*<Option*/}
      {/*  isShow={optionIsShow}*/}
      {/*  onCancel={() => {*/}
      {/*    setOptionIsShow(false)*/}
      {/*  }}*/}
      {/*  onConfirm={(identifiers, maps) => {*/}
      {/*    setSpecialIdentifiers(identifiers)*/}
      {/*    setFieldMaps(maps)*/}
      {/*    setOptionIsShow(false)*/}
      {/*  }}*/}
      {/*  specialIdentifiers={specialIdentifiers}*/}
      {/*  fieldMaps={fieldMaps}*/}
      {/*/>*/}
      <UiHeader height={'50px'}>
        <span>
           Sql转Go结构体
        </span>
        <Toolbar
          languages={{ go: 'Go Struct' }}
          options={defaultGoStructOptions}
          optionValues={goStructTags}
          optionOnChange={goStructOptionOnChange}
          buttons={
          <></>
            // <Button
            //   icon={<IconSetting />}
            //   onClick={() => {
            //     setOptionIsShow(true)
            //   }}
            // >
            //   options
            // </Button>
          }
        />
      </UiHeader>
      <UiBody height={'80%'}>
        <UiLeft>
          {/*<Toolbar languages={{ sql: 'SQL' }} />*/}
          <Editor
            height={'800px'}
            codeLanguage='sql'
            code={sqlCode}
            placeholder={`paste sql statement like "CREATE TABLE ..." here`}
            onChange={sqlCodeOnChange}
          />
        </UiLeft>
        <UiCenter>
          <DoubleRightOutlined style={{ color: '#4390F7', fontSize: '25px' }} />
        </UiCenter>
        <UiRight overflowY={'none'}>
          <Editor   height={'800px'} codeLanguage='go' placeholder='go struct to be transfered' code={goStructCode} />
        </UiRight>
      </UiBody>
    </div>
  )
}
