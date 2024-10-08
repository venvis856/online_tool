// @ts-ignore
import React, { FC, useState, useEffect } from 'react'
import { Input, Table } from 'antd'
import { UiLeft, UiNormalDiv, UiBody, UiCenter, UiRight, UiList, UiLi, UiFlexSpan } from '../uiCommon/ui'
import lodash from 'lodash'
import { randomNum } from '../../utils/commonFunc'
import { switchProp } from 'styled-tools'
import { ArrowRightOutlined , ArrowUpOutlined, ArrowDownOutlined} from '@ant-design/icons'

const Index = props => {
  const {} = props
  const [url, setUrl] = useState('')
  const [dataSource, setDataSource] = useState([])
  const [sortKey,setSortKey]=useState("")

  useEffect(()=>{
    let data=lodash.orderBy(dataSource, ['key'], [sortKey]);
    setDataSource(data)
  },[sortKey])


  const updateInput = (id, inputKey, val) => {
    let newUrl = ''
    let data = dataSource.map(item => {
      if (item.id === id) {
        item[inputKey] = val
      }
      console.log(item, '=====item')
      // 拼接url
      if (newUrl !== '') {
        newUrl += '&'
      }
      newUrl += item.key + item.option + item.value
      return item
    })
    setDataSource(data)
    setUrl(newUrl)
  }

  useEffect(() => {
    if (url === '') {
      setDataSource([])
      return
    }
    if (url.indexOf('?') === -1 && url.substring(0,4) === "http") {
      setDataSource([])
      return
    }
    let newUrl = url.substring(url.lastIndexOf('?') + 1).split('&')
    console.log(newUrl)
    // @ts-ignore
    let rs = []
    newUrl.forEach(item => {
      if (item.indexOf('=') !== -1) {
        rs.push({
          id: randomNum(1, 10000000),
          key: item.substring(0, item.lastIndexOf('=')),
          value: item.substring(item.lastIndexOf('=') + 1),
          option: '='
        })
      }
    })
    setDataSource(rs)
  }, [url])


  return (
    <>
      <div className={'content_body'}>
        <Input
          value={url}
          onChange={(e) => {
            setUrl(e.target.value)
          }}
          placeholder={'请输入url地址,如:https://www.baidu.com?a=1&b=2'}
        />
        <UiNormalDiv>
          解析:
        </UiNormalDiv>
        <UiList height={'800px'}>
          <UiLi height={'40px'} margin={'0 0 5px 0'} background={'#F0F2F5'}>
            <UiFlexSpan onClick={()=>{
              if(sortKey==='') setSortKey('asc')
              if(sortKey==='asc') setSortKey('desc')
              if(sortKey==='desc') setSortKey('')
            }}>
              <span style={{marginRight:'10px'}}>key</span>
              {
                sortKey==='' && <ArrowRightOutlined />
              }
              {
                sortKey==='asc' && <ArrowUpOutlined />
              }
              {
                sortKey==='desc' && <ArrowDownOutlined />
              }
            </UiFlexSpan>
            <span style={{ width: '4%' }}>option</span>
            <UiFlexSpan>value</UiFlexSpan>
          </UiLi>
          {
            dataSource.map(item => {
              return <UiLi height={'40px'} margin={0}>
                <Input
                  style={{ width: '48%' }}
                  value={item.key}
                  onChange={(e) => {
                    updateInput(item.id, "key",e.target.value)
                  }}
                />
                <span style={{ width: '4%' }}>=</span>
                <Input
                  style={{ width: '48%' }}
                  value={item.value}
                  onChange={(e) => {
                    updateInput(item.id,"value", e.target.value)
                  }}
                />
              </UiLi>
            })
          }
        </UiList>

      </div>
    </>

  )
}

export default Index
