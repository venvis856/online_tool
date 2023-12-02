import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { mainRoutes } from '../../router'
import { Layout, Menu, ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import kftoolIcon from '../../img/kftools.png'

import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  BorderLeftOutlined,
} from '@ant-design/icons'
import cx from 'classnames'

import ErrorBoundary from '../ErrorBoundary/ErrorBoundary'
import { UiRouteLi, UiRouteUi } from './UiFrame'

const { Header, Content, Sider } = Layout

function Index(props) {
  const [menuStretch, setMenuStretch] = useState(false) // 菜单折叠控制
  const [layoutKey, setLayoutKey] = useState(0)
  return (
    <Layout key={layoutKey}>
      <Sider trigger={null} collapsible collapsed={menuStretch}>
        <div className='side_header'>
          {/*KFTOOLS-react*/}
          <img src={kftoolIcon} alt='' className={'side_icon_img'} />
          <span className={'side_span'}>React</span>
        </div>
        <UiRouteUi>
          {
            mainRoutes.length > 0 && mainRoutes.filter(item => item.isShow).map(route => {
              return (
                <UiRouteLi
                  onClick={p => {
                    console.log(111,route.path)
                    props.history.push(route.path)
                  }}
                  background={props.history.location.pathname===route.path?'#1F54D1':'#fff'}
                  color={props.history.location.pathname===route.path?'#fff':'#666666'}
                  hoverColor={props.history.location.pathname===route.path?'#1F54D1':'#F3F3F3'}
                >
                  {route.icon}
                  <span>{!menuStretch && route.title}</span>
                </UiRouteLi>
              )
            })
          }


        </UiRouteUi>



        {/*<Menu*/}
        {/*  mode='inline'*/}
        {/*  defaultSelectedKeys={['1']}*/}
        {/*  defaultOpenKeys={['sub1']}*/}
        {/*  selectedKeys={props.history.location.pathname}*/}
        {/*  className='side'*/}
        {/*  // theme="dark"*/}
        {/*>*/}
        {/*  {*/}
        {/*    mainRoutes.length > 0 && mainRoutes.filter(item => item.isShow).map(route => {*/}
        {/*      return (*/}
        {/*        <Menu.Item key={route.path} onClick={p => {*/}
        {/*          props.history.push(p.key)*/}
        {/*        }}>*/}
        {/*          <div className={'menu_li_div'}>*/}
        {/*            {route.icon}*/}
        {/*            <span>{!menuStretch && route.title}</span>*/}
        {/*          </div>*/}
        {/*        </Menu.Item>*/}
        {/*      )*/}
        {/*    })*/}
        {/*  }*/}
        {/*</Menu>*/}
      </Sider>
      <Layout className='site-layout'>
        {/*<Header className={cx('site-layout-background', 'header_bg')}>*/}
        {/*  <div onClick={() => setMenuStretch(!menuStretch)}>*/}
        {/*    {menuStretch ? <MenuUnfoldOutlined className='trigger' /> :*/}
        {/*      <MenuFoldOutlined className='trigger' />}*/}
        {/*  </div>*/}
        {/*  <div className='nav_header_left_div'>*/}
        {/*    {*/}
        {/*      <div*/}
        {/*        className={cx('nav_menu_div')}*/}
        {/*      >*/}
        {/*        工作台*/}
        {/*      </div>*/}
        {/*    }*/}
        {/*  </div>*/}
        {/*  <div className='nav_header_right'>*/}
        {/*  </div>*/}
        {/*</Header>*/}
        {/* 面包屑 */}
        {/*<Breadcrumb style={{padding: '16px'}}>*/}
        {/*    <Breadcrumb.Item>Home</Breadcrumb.Item>*/}
        {/*    <Breadcrumb.Item>List</Breadcrumb.Item>*/}
        {/*    <Breadcrumb.Item>App</Breadcrumb.Item>*/}
        {/*</Breadcrumb>*/}
        <Content
          className='site-layout-background'
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
            backgroundColor: '#F0F2F5',
          }}
        >
          {/*<WaterMark content={`内部资料,请勿外传`}>*/}
          <ConfigProvider locale={zhCN}>
            <ErrorBoundary>
              {props.children}
            </ErrorBoundary>
          </ConfigProvider>
          {/*</WaterMark>*/}
        </Content>
      </Layout>
    </Layout>
  )
}

export default withRouter(Index)
