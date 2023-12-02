// @ts-ignore
import React,{ FC } from 'react'

import { Calendar } from 'tdesign-react';
import 'tdesign-react/es/style/index.css'; // 少量公共样式
import 'tdesign-react/esm/style/index.js'; // 少量公共样式
interface IndexProps {
}

const Index: FC<IndexProps> = props => {
  const {
  }=props

  return (
    <div className={"content_body"}>
      <Calendar />
    </div>
  )
}

export default Index;
