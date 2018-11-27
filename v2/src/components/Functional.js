import React, { Component } from 'react'
import { Layout, Menu, Icon, Button, message } from 'antd'
import FunctionalSetting from './FunctionalSetting';
import _ from 'lodash'

const { Header, Sider, Content } = Layout
const menuNames = ['Readable Config', 'Config Discovery', 'Config Deprecation']
const docset1Metadatas = [
    {
        key: 'The URL of product feedback',
        subGroup: 'Feedback button',
        group: 'Page element',
        value: 'https://feedback.azure.com/forums/34192--general-feedback',
        type: 'string',
        keyDes: 'To provide product feedback, the customer clicks the "Give product feedback" button. The web page that is specified here for product feedback opens.',
        des: 'Add the documentation feedback control which directs users to submit product or documentation feedback',
        imgurl: '/screenshot_of_feedback.png'
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
    }
]
const docset2Metadatas = [
    
]

const docset3Metadatas = [
    {
        key: 'The URL of product feedback',
        subGroup: 'Feedback button',
        group: 'Page element',
        value: 'https://feedback.azure.com/forums/34192--general-feedback',
        type: 'string',
        outDated: true,
        keyDes: 'To provide product feedback, the customer clicks the "Give product feedback" button. The web page that is specified here for product feedback opens.',
        des: 'Add the documentation feedback control which directs users to submit product or documentation feedback',
        imgurl: '/screenshot_of_feedback.png'
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
        subGroup: 'Edit button',
        group: 'Page element',
        key: 'Accept public edits?',
        type: 'bool',
        value: true,
        imgurl: '/screenshot_of_editbutton.png',
        keyDes: 'Enable to allow the public contribution',
        des: 'By enabling it the docs site will render a Edit button in the right upper corner of the page, and the Edit button will redirect the end users to a public repository where community contributions to the content can be added.'
    },
    {
        subGroup: 'Edit button',
        group: 'Page element',
        key: 'The URL of the Git Repository open to public contributes',
        type: 'string',
        value: 'https://github.com/MicrosoftDocs/engineering',
        keyDes: 'Specify the URL of the Git Repository open to public contributes',
        des: ''
    },
    {
        subGroup: 'Edit button',
        group: 'Page element',
        key: 'The branch of the Git Repository open to public contributes',
        type: 'string',
        value: 'master',
        keyDes: 'Specify the Branch of the Git Repository open to public contributes',
        des: ''
    },
    {
        subGroup: 'Edit button',
        group: 'Page element',
        key: '[Optional] Set up automatic private-public synchronization',
        des: '',
        keyDes: 'If your content repository is private, and the repository open to public contributes is another public repo, you can set up automatic syncing between the private repo and the public repo.'
    },
    {
        key: 'Title Suffix',
        subGroup: 'Title suffix',
        group: 'Page element',
        type: 'string',
        value: 'Xamarin',
        imgurl: '/screenshot_of_titlesuffix.png',
        keyDes: 'Specify a suffix in page title',
        des: <p>Specify a suffix in page title, usually it is a product or brand.<br/>The page tile:<br/>Define a title in the browser toolbar<br/>Provide a title for the page when it is added to favorites<br/>Display a title for the page in search-engine results'</p>
    },
    {
        group: 'Navigation on page',
        key: 'Breadcrumb path',
        subGroup: 'Breadcrumb',
        value: '/azure/bread/toc.json',
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
        // flat the metadataSets
        const flattenMetadatas = _.flatMap(valuesToBeAdded, value => {
            return value.keys ? value.keys.map(key => _.assign(key, value)) : []
        })
        this.setState({
            metadatas: _.uniqBy(_.concat(this.state.metadatas, flattenMetadatas), 'key')
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
                    <span style={{paddingLeft: "10px"}}>OPS Configuration</span>
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