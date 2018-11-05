import { Layout, Menu, Icon } from 'antd';
import React, { Component } from 'react'
import MetadataSetting from './MetadataSetting'
import RepoConfigs from './RepoConfigs'
import '../App.css';

const { Header, Sider, Content } = Layout;

const SubMenu = Menu.SubMenu;
const menuName = ['Docset1', 'Docset2', 'Configuration'];
const docset1Metadatas = [
    {
        key: 'feedback_github_repo',
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
];
const docset2Metadatas = [
    {
        key: 'feedback_product_url',
        value: 'https://feedback.azure.com/forums/34193--general-feedback'
    },
    {
        key: 'breadcrumb_path',
        value: '/azurelearning/bread/toc.json'
    },
    {
        key: 'brand',
        value: 'azure learning'
    }
];
export default class SettingMenu extends Component {
    state = {
        collapsed: false,
        selectedContent: 0,
        name: menuName[0]
    };

    toggle = () => {
    this.setState({
        collapsed: !this.state.collapsed,
    });
    }

    menuClick = (e) => {
        this.setState({
            name: menuName[e.key],
            selectedContent: e.key
        });
    }

    contentRender = (key) => {

        switch (parseInt(key))
        {
            case 2:
                return <RepoConfigs />
            case 1:
                return <MetadataSetting name={this.state.name} metadatas={docset2Metadatas} isChecked={false}/>
            case 0:
            default:
                return <MetadataSetting name={this.state.name} metadatas={docset1Metadatas} isChecked/>
        }
    }

    render() {
        const content = this.contentRender(this.state.selectedContent)
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
                <SubMenu key="sub1" title={<span><Icon type="book" /><span>Metadata</span></span>}>
                    <Menu.Item key="0">
                        <Icon type="book" />
                        <span>{menuName[0]}</span>
                    </Menu.Item>
                    <Menu.Item key="1">
                        <Icon type="book" />
                        <span>{menuName[1]}</span>
                    </Menu.Item>
                </SubMenu>
                <Menu.Item key="2">
                    <Icon type="file-text" />
                    <span>{menuName[2]}</span>
                </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header style={{ background: '#fff', fontSize: '20px', fontWeight: '500', textAlign: 'left'}}>
                <Icon
                    className="trigger"
                    type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={this.toggle}
                />
                <span style={{paddingLeft: "10px"}}>OPS Settings</span>
                </Header>
                <Content className="main-content">
                    {content}
                </Content>
            </Layout>
            </Layout>
        );
    }
}