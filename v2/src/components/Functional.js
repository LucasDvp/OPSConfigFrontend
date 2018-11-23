import React, { Component } from 'react'
import { Layout, Menu, Icon, Button, message } from 'antd'
import FunctionalSetting from './FunctionalSetting';
import _ from 'lodash'

const { Header, Sider, Content } = Layout
const menuNames = ['Docset1', 'Docset2', 'Docset3']
const docset1Metadatas = [
    {
        key: 'Feedback github repo',
        group: 'Feedback',
        hasFileMetadata: true,
        value: 'MicrosoftDocs/azure-docs',
        type: 'string'
    },
    {
        key: 'Feedback product url',
        group: 'Feedback',
        value: 'https://feedback.azure.com/forums/34192--general-feedback',
        type: 'string'
    },
    {
        key: 'Breadcrumb path',
        group: 'Breadcrumb',
        value: '/azure/bread/toc.json',
        type: 'string'
    },
    {
        key: 'Brand',
        group: 'Breadcrumb',
        value: 'azure',
        type: 'object'
    },
    {
        key: 'Accepts community contributions',
        type: 'bool',
        value: false,
        group: 'Feedback'
    }
]
const docset2Metadatas = [
    {
        key: 'Feedback github repo',
        group: 'Feedback',
        hasFileMetadata: true,
        value: 'MicrosoftDocs/azure-docs',
        type: 'string'
    },
    {
        key: 'Feedback product url',
        group: 'Feedback',
        value: 'https://feedback.azure.com/forums/34192--general-feedback',
        type: 'string'
    }
]

const docset3Metadatas = [
    {
        key: 'Feedback github repo',
        group: 'Feedback',
        hasFileMetadata: true,
        value: 'MicrosoftDocs/azure-docs',
        type: 'string'
    }
]

const docsetsMetadatas = [docset1Metadatas, docset2Metadatas, docset3Metadatas]

export default class Functional extends Component {
    state = {
        collapsed: false,
        selectedContent: 0,
        name: menuNames[0],
        metadatas: docsetsMetadatas[0]
    }

    menuClick = (e) => {
        this.setState({
            name: menuNames[e.key],
            selectedContent: e.key,
            metadatas: docsetsMetadatas[e.key]
        })
    }

    onToggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed
        })
    }

    onSubmitMetadatas = (valuesToBeAdded) => {
        this.setState({
            metadatas: _.uniqBy(_.concat(this.state.metadatas, valuesToBeAdded), 'key')
        })
        message.success("Metadatas has added.")
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
                defaultOpenKeys={['sub1']}
                style={{textAlign: 'left', padding: '20px 5px 20px 5px'}}
                onClick={this.menuClick}
                >
                    {
                        menuNames.map((name, idx) => 
                        <Menu.Item key={idx}>
                            <Icon type="book" />
                            <span>{name}</span>
                        </Menu.Item>)
                    }
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
                    <span style={{paddingLeft: "10px"}}>OPS Functional Settings</span>
                </div>
                </Header>
                <Content className="main-content-for-functional">
                    <FunctionalSetting
                    metadatas={this.state.metadatas}
                    docsetName={this.state.name}
                    onToggleAddMetadata={this.onToggleAddMetadata}
                    onSubmitMetadatas={this.onSubmitMetadatas}
                    />
                </Content>
            </Layout>
            </Layout>
        )
    }
}