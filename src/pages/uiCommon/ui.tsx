// @ts-nocheck
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { prop, switchProp } from 'styled-tools'

export const UiBody=styled.div<any>`
  width: 100%;
  height: ${prop('height', '100%')};
  display: flex;
`

export const UiHeader=styled.div<any>`
  height: ${prop('height', '10%')};
  display: flex;
  justify-content:  ${prop('justifyContent', 'space-between')};
  span{
    font-weight: bold;
  }
`

export const UiLeft=styled.div<any>`
  width:  ${prop('width', '48%')};
  height: 100%;
`

export const UiCenter=styled.div<any>`
  width: ${prop('width', '4%')};
  height: ${prop('height', '100%')};
  display: flex;
  justify-content: center;
  align-items: center;
`

export const UiRight=styled.div<any>`
  width: 48%;
  height: 100%;
  border: solid 1px #eeeeee;
  overflow-wrap: ${prop('overflowWrap', 'break-word')};
  overflow-y: ${prop('overflowY', 'auto')};
  background: ${prop('background','#fff')};
`

export const UiBottom=styled.div<any>`
  height: ${prop('height', '10%')};
  display: flex;
  justify-content: center;
  padding: 20px;
  margin-bottom: 30px;
`

export const UiList=styled.div<any>`
  width:  ${prop('width', '100%')};
  height:  ${prop('height', '100%')};
  margin:  ${prop('margin', '20px auto')};
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-flow: column;
  overflow-y: auto;
`

export const UiLi=styled.div<any>`
  width:  ${prop('width', '100%')};
  height:  ${prop('height', '100%')};
  margin:  ${prop('margin', '20px auto')};
  background: ${prop('background', '#fff')};
  display: flex;
  justify-content: space-around;
  align-items: center;
  & > span {
    width: 120px;
    text-align: center;
  }
  & > input {
    width: 250px;
  }
  & > button {
    width: 160px;
  }
`

export const UiFlexSpan=styled.span`
  width:  ${prop('width', '48%')};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor:pointer;
`

export const UiCrontabDiv=styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 20px 0;
  & > span{
    margin-right: 20px;
  }
`

export const UiCrontabBoldDiv=styled.div`
  font-weight: bold;
  margin-bottom: 20px;
  font-size: 18px;
`

export const UiNormalDiv=styled.div`
  margin: 20px 0;
`

export const UiBorderDiv=styled.div`
  border: solid 1px #807d7d;
  height: 40px;
  line-height: 40px;
  box-sizing: border-box;
  padding-left: 5px;
`
