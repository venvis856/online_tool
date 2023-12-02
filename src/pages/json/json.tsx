// @ts-ignore
import React, { FC, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { UiBody, UiCenter, UiLeft, UiRight } from '../uiCommon/ui'
import { Input } from 'antd'
import ReactJson from 'react-json-view'
import { DoubleRightOutlined } from '@ant-design/icons'

const { TextArea } = Input

interface IndexProps {
  updateRedux(param: { value: string }): void
}

const Index: FC<IndexProps> = props => {
  const { reduxValue = '', reduxError = '', reduxTargetVal = {} } = props
  const [value, setValue] = useState(reduxValue)
  const [error, setError] = useState(reduxError)
  const [targetVal, setTargetVal] = useState(reduxTargetVal)

  useEffect(() => {
    props.updateRedux({ value: value })
  }, [value])

  useEffect(() => {
    props.updateRedux({ error: error })
  }, [error])

  useEffect(() => {
    props.updateRedux({ targetVal: targetVal })
  }, [targetVal])


  useEffect(() => {
    if (value === '') {
      setError('')
      setTargetVal({})
      return
    }
    handleSrcChange(value)
  }, [value])

  const handleSrcChange = (val: string) => {
    if (!val) {
      return
    }
    try {
      let targetVal = JSON.parse(val)
      if (typeof targetVal !== 'object' && typeof targetVal !== 'Object') {
        setError('非正确json串')
        return
      }
      setTargetVal(targetVal)
      setError('')
    } catch (e) {
      console.log(e, 'json err')
      setError(getErrInfo(e))
    }
  }

  const getErrInfo = (e) => {
    e = e.toString()
    // 区分几种情况

    // Unexpected token h in JSON at position 5
    let err = e.split(' ')
    let errPos = parseInt(err[err.length - 1])
    e = e
      + '<div style=\'background-color:#f3f5f7;padding: 4px 4px;margin: 4px;border-radius: 4px;color:#37474f;\'>'
      + value.substr(errPos - 10, 11)
      + '</div>'
      + '<div style=\'color:red\'>这里导致解析失败了</div>'

    // SyntaxError: Unexpected end of JSON input

    return e
  }

  const rightContent = () => {
    if (error !== '') {
      return <div
        dangerouslySetInnerHTML={{
          __html: error
        }}
      />
    }
    if (JSON.stringify(targetVal) === '{}') {
      return ''
    }
    return <ReactJson
      src={targetVal}
      iconStyle={'square'}
      displayDataTypes={false}
      // theme={'monokai'}
    />
  }

  return (
    <>
      <div className={'content_body'}>
        <UiBody>
          <UiLeft>
            <TextArea
              style={{ height: '100%' }}
              value={value}
              onChange={(e) => {
                setValue(e.target.value)
              }} />
          </UiLeft>
          <UiCenter>
            <DoubleRightOutlined style={{ color: '#4390F7', fontSize: '25px' }} />
          </UiCenter>
          <UiRight overflowWrap={'anywhere'}>
            {rightContent()}
          </UiRight>
        </UiBody>
      </div>
    </>

  )
}

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    redux_value: state.jsonReducer.value,
    redux_error: state.jsonReducer.error,
    redux_targetVal: state.jsonReducer.targetVal
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateRedux: (data: any) => dispatch({ type: 'update', data: data })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)
