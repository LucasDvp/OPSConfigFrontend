import React, { Component } from 'react'
import { Tabs, Button, List, Tag, Input, Switch, InputNumber, message, Badge } from 'antd'
import MetadataDiscovery from './MetadataDiscovery'
import _ from 'lodash'

const Tab = Tabs.TabPane
const typeColorMap = {
    'string': 'magenta',
    'bool': 'green',
    'one or many': 'orange',
    'object': 'blue',
    'number': 'purple' 
}
const metadataSet = [
    {
        group: 'Page',
        subGroup: 'Feedback button',
        key: 'Title suffix',
        type: 'string',
        des: 'Config the feedback url for product'
    },
    {
        group: 'Page',
        subGroup: 'Feedback',
        key: 'Edit button',
        type: 'string',
        des: ''
    },
    {
        group: 'Page',
        subGroup: 'Feedback',
        key: 'Feedback button',
        type: 'string',
        des: ''
    },
    {
        group: 'Page',
        subGroup: 'Feedback',
        key: 'Download PDF button',
        type: 'string',
        des: ''
    },
    {
        group: 'Page',
        subGroup: 'Archived page disclaimer',
        key: 'Search button (search scope)',
        type: 'number'
    },
    {
        group: 'Page',
        subGroup: 'Language selector',
        key: 'Language selector',
        type: 'one or many'
    },
    {
        group: 'Page',
        subGroup: 'Language selector',
        key: 'Archived page disclaimer',
        type: 'one or many'
    },
    {
        group: 'Navigation on page',
        subGroup: 'Header/footer',
        key: 'Header/footer',
        type: 'number'
    },
    {
        group: 'Navigation on page',
        subGroup: 'Header/footer',
        key: 'Breadcrumb',
        type: 'number'
    },
    {
        group: 'Navigation on page',
        subGroup: 'Header/footer',
        key: 'Fusion TOC',
        type: 'number'
    },
    {
        group: 'URL',
        subGroup: 'Header/footer',
        key: 'Base URL',
        type: 'number'
    },
    {
        group: 'URL',
        subGroup: 'Header/footer',
        key: 'Shared base path',
        type: 'number'
    },
    {
        group: 'URL',
        subGroup: 'Header/footer',
        key: 'Redirection',
        type: 'number'
    },
    {
        group: 'Versioning',
        subGroup: 'Header/footer',
        key: 'Moniker range',
        type: 'number'
    },
    {
        group: 'Localization',
        subGroup: 'Header/footer',
        key: 'Bilingual (side by side)',
        type: 'number'
    },
    {
        group: 'Cross Repository',
        subGroup: 'Header/footer',
        key: 'Cross Repository Reference (CRR)',
        type: 'number'
    },
    {
        group: 'Cross Repository',
        subGroup: 'Header/footer',
        key: 'XRef',
        type: 'number'
    },
    {
        group: 'Build output',
        subGroup: 'Header/footer',
        key: 'PDF',
        type: 'number'
    },
    {
        group: 'Build output',
        subGroup: 'Header/footer',
        key: 'Intellisense',
        type: 'number'
    },
]

export default class FunctionalSetting extends Component {
    state = {
        openAddMetadata: false,
        updatedItemNums: {}
    }

    getGroupedCount = (metadatas) => {
        return metadatas.reduce((result, metadata) => {
            const group = metadata.group
            if (!result.hasOwnProperty(group)) {
                result[group] = 1
            } else {
                result[group] ++
            }
            return result
        }, {})
    }

    componentWillReceiveProps = (nextProps) => {
        console.log(nextProps)
        if (this.props.docsetName === nextProps.docsetName) {
            const oldMetadatasNum = this.getGroupedCount(this.props.metadatas)
            const newMetadatasNum = this.getGroupedCount(nextProps.metadatas)

            console.log(oldMetadatasNum, newMetadatasNum)

            this.setState({
                updatedItemNums: _.mapValues(newMetadatasNum, (value, key) => {
                    return  value - (oldMetadatasNum[key] ? oldMetadatasNum[key] : 0)
                })
            })
        } else {
            this.setState({
                updatedItemNums: {}
            })
        }
    }

    onClickTabs = (key) => {
        const newUpdatedItemNums = _.set(this.state.updatedItemNums, key, 0)
        this.setState({
            updatedItemNums: newUpdatedItemNums
        })
    }

    onToggleAddMetadata = () => {
        this.setState({
            openAddMetadata: !this.state.openAddMetadata
        })
    }

    onSubmitMetadatas = (newMetadatas) => {
        this.setState({
            openAddMetadata: false
        })
        this.props.onSubmitMetadatas(newMetadatas)
    }

    onFakeChangeMetadatas = () => {
        message.success('New functinonal settings applied!')
    }

    getInput(type, value) {
        switch (type) {
            case 'object':
                return <Input size ='large' placeholder='Accept Json object value' defaultValue={value}/>
            case 'one or many':
                return <Input size ='large' placeholder='Accept one string or a string array' defaultValue={value}/>
            case 'bool':
                return <Switch size ='large' checkedChildren="True" unCheckedChildren="False"/>
            case 'number':
                return <InputNumber size ='large' defaultValue={value}/>
            case 'string':
            default:
                return <Input size ='large' placeholder='Accept string value' defaultValue={value}/>
        }
    }
    render() {
        const { metadatas, docsetName } = this.props
        const groupedItems = _.groupBy(metadatas, 'group')

        //console.log(groupedItems)
        const tabItems = _.keys(groupedItems).map(group => 
            <Tab tab={<Badge count={this.state.updatedItemNums[group]}><p>{group}</p></Badge>} key={group}>
                <List 
                dataSource={groupedItems[group]}
                renderItem={ item => 
                    <List.Item 
                    key={item.key}
                    extra={<div style={{width: '300px'}}>{this.getInput(item.type, item.value)}</div>}
                    className='functional-settings-item'>
                        <List.Item.Meta
                        title={item.key}
                        description={<Tag color={typeColorMap[item.type]}>{item.type}</Tag>}
                        />
                    </List.Item> 
                }
                />
            </Tab>
        )

        return (
            <div>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <h2>{docsetName}</h2>
                    <Button type='primary' icon='setting' onClick={this.onToggleAddMetadata}>
                        Add Metadatas
                    </Button>
                </div>
                <blockquote>Following functional settings will be applied docset-wide</blockquote>
                <Tabs onChange={this.onClickTabs} type='card' size='large' style={{marginTop: '20px'}}>
                    {tabItems}
                </Tabs>
                <Button.Group style={{width: '100%', marginTop: '20px'}}>
                    <Button type="primary" size='large' style={{width: '50%'}} onClick={this.onFakeChangeMetadatas}>
                        Changed
                    </Button>
                    <Button type="danger" size='large' style={{width: '50%'}}>
                        Revert
                    </Button>
                </Button.Group>
                <MetadataDiscovery 
                    isOpen={this.state.openAddMetadata} 
                    onSubmitMetadatas={this.onSubmitMetadatas} 
                    onCancel={this.onToggleAddMetadata}
                    globalMetadatas={metadataSet}/>
            </div>
        )
    }
}