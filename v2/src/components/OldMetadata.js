import { Layout, Menu, Icon, Button, message } from 'antd'
import React, { Component } from 'react'
import OldMetadataSetting from './OldMetadataSetting';

const { Header, Sider, Content } = Layout

const SubMenu = Menu.SubMenu
const docsetMetadatas = [
    {
        key: 'feedback_github_repo',
        hasFileMetadata: true,
        value: 'MicrosoftDocs/azure-docs'
    },
    {
        key: 'feedback_product_url',
        value: 'https://feedback.azure.com/forums/34192--general-feedback'
    },
    {
        key: 'breadcrumb_path',
        value: '/azure/bread/toc.json'
    },
    {
        key: 'brand',
        value: 'azure'
    }
]

export default class NewMetadata extends Component {
    state = {
        collapsed: false
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        })
    }

    render() {
        const content = <OldMetadataSetting name='Docset1' metadatas={docsetMetadatas}/>
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
                <Menu.Item key="0">
                    <Icon type="file-text" />
                    <span>Docset1</span>
                </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header style={{ background: '#fff', fontSize: '20px', fontWeight: '500', textAlign: 'left'}}>
                <div>
                    <Icon
                    className="trigger"
                    type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={this.toggle}
                    />
                    <span style={{paddingLeft: "10px"}}>OPS Settings</span>
                </div>
                </Header>
                <Content className="main-content">
                    {content}
                </Content>
            </Layout>
            </Layout>
        )
    }
}