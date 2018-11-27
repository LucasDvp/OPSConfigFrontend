import { Layout, Menu, Icon, Button, message } from 'antd'
import React, { Component } from 'react'
import MetadataSetting from './MetadataSetting'
import RepoConfigs from './RepoConfigs'
import _ from 'lodash'
import '../App.css'
import MetadataRegister from './MetadataRegister';

const { Header, Sider, Content } = Layout

const SubMenu = Menu.SubMenu
const menuName = ['Docset1', 'Docset2', 'Configuration']
const docset1Metadatas = [
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
const docset2Metadatas = [
    {
        key: 'feedback_product_url',
        hasFileMetadata: true,
        fileJson: '**/*.md',
        value: 'https://feedback.azure.com/forums/34193--general-feedback'
    },
    {
        key: 'breadcrumb_path',
        hasFileMetadata: true,
        fileJson: '**/build/*.yaml',
        value: '/azurelearning/bread/toc.json'
    },
    {
        key: 'brand',
        hasFileMetadata: true,
        fileJson: '**/*.md',
        value: 'azure learning'
    }
]
const metadataSet = [
    {
        group: 'Feedback',
        key: 'feedback product url',
        value: 'feedback_product_url',
        type: 'string',
        des: 'Config the feedback url for product'
    },
    {
        group: 'Feedback',
        key: 'feedback github repo',
        value: 'feedback_github_repo',
        type: 'string',
        des: ''
    },
    {
        group: 'Feedback',
        key: 'feedback system',
        value: 'feedback_system',
        type: 'string',
        des: ''
    },
    {
        group: 'Feedback',
        key: 'product feedback displaytext',
        value: 'product_feedback_displaytext',
        type: 'string',
        des: ''
    },
    {
        group: 'BreadCrumb',
        key: 'breadcrumb path',
        value: 'breadcrumb_path',
        type: 'string',
        des: ''
    },
    {
        group: 'BreadCrumb',
        key: 'extend breadcrumb',
        value: 'extend_breadcrumb',
        type: 'string',
        des: ''
    },
    {
        group: 'ContributorList',
        key: 'author',
        value: 'author',
        type: 'string',
        des: ''
    },
    {
        group: 'ContributorList',
        key: 'contributors to exclude',
        value: 'contributors_to_exclude',
        type: 'string',
        des: ''
    },
]
export default class NewMetadata extends Component {
    state = {
        collapsed: false,
        selectedContent: 0,
        name: menuName[0],
        docsetMetadata1: docset1Metadatas,
        docsetMetadata2: docset2Metadatas,
        metadataSet: metadataSet,
        showMetadataRegister: false
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        })
    }

    menuClick = (e) => {
        this.setState({
            name: menuName[e.key],
            selectedContent: e.key
        })
    }

    addMetadataToPanel = (valuesToBeAdded) => {
        valuesToBeAdded = valuesToBeAdded.map(item => {
            let hintValue = null
            if (item.type) {
                //'bool', 'string', 'number', 'object', 'one or many'
                switch (item.type) {
                    case 'bool':
                        hintValue = 'Boolean value: true/false'
                        break;
                    case 'number':
                        hintValue = 'Number value: integer/float/double'
                        break;
                    case 'object':
                        hintValue = 'JSON object value: {"a": "a value"}'
                        break;
                    case 'one or many':
                        hintValue = 'One or many value: string/string[]'
                        break;
                    case 'string':
                    default:
                        hintValue = 'String value'
                        break;
                }
            }
            item.value = ''
            item.hint = hintValue
            return item
        })
        if (parseInt(this.state.selectedContent) === 0)
        {
            this.setState({
                docsetMetadata1: _.uniqBy(_.concat(this.state.docsetMetadata1, valuesToBeAdded), 'key')
            })
        }
        else 
        {
            this.setState({
                docsetMetadata2: _.uniqBy(_.concat(this.state.docsetMetadata2, valuesToBeAdded), 'key')
            })
        }    
    }

    onAddMetadataSet = (newMetadata) => {
        this.setState({
            metadataSet: _.concat(this.state.metadataSet, newMetadata),
            showMetadataRegister: false
        })
        message.success("New metadata has registed.")
    }

    onToggleMetadataRegister = () => {
        this.setState({
            showMetadataRegister: !this.state.showMetadataRegister
        })
    }

    contentRender = (key) => {
        switch (parseInt(key))
        {
            case 2:
                return <RepoConfigs />
            case 1:
                return <MetadataSetting 
                name={this.state.name} 
                metadatas={this.state.docsetMetadata2} 
                isChecked={false} 
                metadataSet={this.state.metadataSet}
                addMetadataToPanel={this.addMetadataToPanel} />
            case 0:
            default:
                return <MetadataSetting 
                name={this.state.name} 
                metadatas={this.state.docsetMetadata1} 
                isChecked 
                metadataSet={this.state.metadataSet}
                addMetadataToPanel={this.addMetadataToPanel} />
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
                <Header style={{ background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <div style={{ background: '#fff', fontSize: '20px', fontWeight: '500', textAlign: 'left'}}>
                    <Icon
                    className="trigger"
                    type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={this.toggle}
                    />
                    <span style={{paddingLeft: "10px"}}>OPS Settings</span>
                </div>
                <Button type='primary' icon='setting' onClick={this.onToggleMetadataRegister}>
                    Metadata Register
                </Button>
                </Header>
                <Content className="main-content">
                    {content}
                    <MetadataRegister 
                    metadataSet={this.state.metadataSet} 
                    onAddMetadataSet={this.onAddMetadataSet} 
                    onClose={this.onToggleMetadataRegister}
                    showMetadataRegister={this.state.showMetadataRegister}
                    />
                </Content>
            </Layout>
            </Layout>
        )
    }
}