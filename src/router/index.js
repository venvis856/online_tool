import { lazy } from 'react'
import {
  HomeOutlined,
  NodeExpandOutlined,
  FieldTimeOutlined,
  SortAscendingOutlined,
  AmazonOutlined,
  BarcodeOutlined,
  AndroidOutlined,
  SlackOutlined,
  AlibabaOutlined,
} from '@ant-design/icons'

import PageNotFound from '../pages/pageNotFound/PageNotFound'
import Date from '../pages/date/date'
import Json from '../pages/json/json'
import UnixTimestamp from '../pages/unixTimestamp/index'
import Md5Component from '../pages/md5/index'
import Format from '../pages/mergeFormat/index'
import mergeEncode from '../pages/mergeEncode'
import Crontab from '../pages/crontab/index'
import Sql2Struct from '../pages/sql2struct/App'
import UrlGetParam from '../pages/urlGetParam/Index'
import Erweima from '../pages/erweima/index'
import ImgToText from '../pages/img_to_text/index'

// const PageNotFound = lazy(() => import('../pages/pageNotFound/PageNotFound') );
// const Date = lazy(() => import('../pages/date/date') );
// const Json = lazy(() => import('../pages/json/json') );
// const UnixTimestamp = lazy(() => import('../pages/unixTimestamp/index') );
// const Md5Component = lazy(() => import('../pages/md5/index') );
// const Format = lazy(() => import('../pages/mergeFormat/index') );
// const mergeEncode = lazy(() => import('../pages/mergeEncode') );
// const Crontab = lazy(() => import('../pages/crontab/index') );
// const Sql2Struct = lazy(() => import('../pages/sql2struct/App') );
// const UrlGetParam = lazy(() => import('../pages/urlGetParam/Index') );

export const mainRoutes = [
  {
    path: '/',
    component: Date,
    title: '首页',
    isShow: true,
    icon: <HomeOutlined />,
  },
  {
    path: '/404',
    component: PageNotFound,
    title: '找不到',
    isShow: false,
  },
  {
    path: '/json',
    component: Json,
    title: 'JSON在线解析',
    isShow: true,
    icon: <NodeExpandOutlined />,
  },
  {
    path: '/unixTimestamp',
    component: UnixTimestamp,
    title: 'Unix时间戳',
    isShow: true,
    icon: <FieldTimeOutlined />,
  },
  {
    path: '/mergeEncode',
    component: mergeEncode,
    title: 'Encode编解码',
    isShow: true,
    icon: <SortAscendingOutlined />,
  },
  {
    path: '/md5',
    component: Md5Component,
    title: 'md5加密',
    isShow: true,
    icon:<AmazonOutlined />,
  },
  {
    path: '/format',
    component: Format,
    title: '代码格式化',
    isShow: true,
    icon: <BarcodeOutlined />,
  },
  {
    path: '/crontab',
    component: Crontab,
    title: 'Crontab在线',
    isShow: true,
    icon: <AndroidOutlined />,
  },
  {
    path: '/sql2struct',
    component: Sql2Struct,
    title: 'Sql转Go结构体',
    isShow: true,
    icon: <SlackOutlined />,
  },
  {
    path: '/urlGetParam',
    component: UrlGetParam,
    title: 'Url分解参数',
    isShow: true,
    icon:  <AlibabaOutlined />,
  },
  {
    path: '/qrcode',
    component: Erweima,
    title: '二维码',
    isShow: true,
    icon:  <AlibabaOutlined />,
  },
  {
    path: '/img_to_text',
    component: ImgToText,
    title: '图片转文字',
    isShow: true,
    icon:  <AlibabaOutlined />,
  },

  

]

