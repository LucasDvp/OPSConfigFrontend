import { Layout, Menu, Icon, Button, message, Tabs } from 'antd'
import React, { Component } from 'react'
import _ from 'lodash'
import FunctionalSetting from './FunctionalSetting'

const { Header, Sider, Content } = Layout

const docset1Metadatas = [
    {
        key: 'The URL of product feedback',
        subGroup: 'Feedback button',
        group: 'Page element',
        value: 'https://feedback.azure.com/forums/34192--general-feedback',
        type: 'string',
        keyDes: 'To provide product feedback, the customer clicks the "Give product feedback" button. The web page that is specified here for product feedback opens.',
        des: 'Add the documentation feedback control which directs users to submit product or documentation feedback',
        imgurl: '/screenshot_of_feedback.png',
        fileMetadata: {
            key: 'Apply the configuration to subset of docset',
            des: 'You need to provide a list of GitHub file path and feedback URL',
            value: '{"path1": "url1", "path2": "url2"}',
            type: 'object'
        }
    },
    {
        key: 'The URL of documentation feedback',
        subGroup: 'Feedback button',
        group: 'Page element',
        value: 'https://github.com/azure/azure-rest-api-specs',
        type: 'string',
        keyDes: 'If the customer wants to provide new documentation feedback or comment on an existing issue, they click the button that says "Sign in to give documentation feedback".',
        des: 'Add the documentation feedback control which directs users to submit product or documentation feedback',
    },
    {
        group: 'Navigation on page',
        key: 'Breadcrumb path',
        subGroup: 'Breadcrumb',
        value: '/azure/bread/toc.json',
        type: 'string'
    },
    {
        group: 'Metadata',
        subGroup: 'Metadata',
        key: 'ms.date',
        value: '11/28/2018',
        type: 'string'
    },
    {
        group: 'Metadata',
        subGroup: 'Metadata',
        key: 'ms.topic',
        value: 'article',
        type: 'string'
    }
]
export default class Metadata extends Component {
    state = {
        name: 'Metadata Config',
        metadatas: docset1Metadatas
    }

    onAddMetadata = () => {
        this.setState({
            metadatas: _.concat(this.state.metadatas, { key:'', value: '' })
        })
    }

    render() {
        return (
            <Layout>
            <Sider
                trigger={null}
                collapsible
                collapsed={this.state.collapsed}
                width={220}
            >
                <div className="logo" />
                <Menu 
                theme="dark" 
                mode="inline" 
                defaultSelectedKeys={['0']}
                style={{textAlign: 'left', padding: '20px 5px 20px 5px'}}
                onClick={this.menuClick}
                >
                    <Menu.Item key={0}>
                        <Icon type="book" />
                        <span>{this.state.name}</span>
                    </Menu.Item>   
                </Menu>
            </Sider>
            <Layout>
                <Header style={{ background: '#fff'}}>
                <div style={{ background: '#fff', fontSize: '20px', fontWeight: '500', textAlign: 'left'}}>
                    <Icon
                    className="trigger"
                    type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={this.onToggleCollapsed}
                    />
                    <span style={{paddingLeft: "10px"}}>OPS Metadata</span>
                </div>
                </Header>
                <Content className="main-content-for-functional">
                    <FunctionalSetting
                    metadatas={this.state.metadatas}
                    docsetName={this.state.name}
                    />     
                </Content>
            </Layout>
            </Layout>
        )
    }
}