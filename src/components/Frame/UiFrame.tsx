import styled from '@emotion/styled'
import { prop } from 'styled-tools'

export const UiRouteUi=styled.div`
  height: 100%;
  width: 100%;
  overflow-y: auto;
  background: #fff;
  display: flex;
  align-items: center;
  flex-flow: column;
`

export const UiRouteLi=styled.div<any>`
  background: ${prop("background",'#fff')};
  color: ${prop("color",'#666666')};
  width: 100%;
  height: 40px;
  line-height: 40px;
  padding: 10px;
  display: flex;
  justify-content: left;
  align-items: center;
  span{
    margin-left: 16px;
  }
  box-sizing: border-box;  
  &:hover{
    background: ${prop("hoverColor",'#F3F3F3')};
  }
  cursor:pointer;
`
