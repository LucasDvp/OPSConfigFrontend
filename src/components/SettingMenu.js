import { Layout, Menu, Icon } from 'antd';
import React, { Component } from 'react'
import MetadataSetting from './MetadataSetting'
import RepoConfigs from './RepoConfigs'

const { Header, Sider, Content } = Layout;

const SubMenu = Menu.SubMenu;
const menuName = ['Docset1', 'Docset2', 'Repo Config'];

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
        if (key <= 1) {
            return <MetadataSetting name={this.state.name}/>
        } else {
            return <RepoConfigs />
        }
    }

    render() {
        const content = this.contentRender(this.state.selectedContent)
        console.log(content);
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
                <SubMenu key="sub1" title={<span><Icon type="book" /><span>Docset Metadata</span></span>}>
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
                <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 800 }}>
                    {content}
                </Content>
            </Layout>
            </Layout>
        );
    }
}