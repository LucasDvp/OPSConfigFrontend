import React, { Component } from 'react'
import { Tabs, Button, message, Badge } from 'antd'
import MetadataDiscovery from './MetadataDiscovery'
import FunctionalSubContent from './FunctionalSubContent'
import _ from 'lodash'

const Tab = Tabs.TabPane
const metadataSet = [
    {
        group: 'Page element',
        subGroup: 'Title suffix',
        keys: [
            {
                key: 'Title Suffix',
                type: 'string',
                keyDes: 'Specify a suffix in page title'
            }
        ],
        imgurl: '/screenshot_of_titlesuffix.png',
        des: 'Specify a suffix in page title, usually it is a product or brand. The page tile:\n\nDefine a title in the browser toolbar\n\nProvide a title for the page when it is added to favorites\n\nDisplay a title for the page in search-engine results'
    },
    {
        group: 'Page element',
        subGroup: 'Edit button',
        keys: [
            {
                key: 'Accept public edits?',
                type: 'bool'
            },
            {
                key: 'The URL of the Git Repository open to public contributes',
                type: 'string'
            },
            {
                key: 'The branch of the Git Repository open to public contributes',
                type: 'string'
            },
            {
                key: '[Optional] Set up automatic private-public synchronization',
                type: 'bool'
            }
        ],
        imgurl: '/screenshot_of_editbutton.png',
        des: 'By enabling it the docs site will render a Edit button in the right upper corner of the page, and the Edit button will redirect the end users to a public repository where community contributions to the content can be added.'
    },
    {
        group: 'Page element',
        subGroup: 'Feedback button',
        keys: [
            {
                key: 'The URL of product feedback',
                type: 'string'
            },
            {
                key: 'The URL of documentation feedback',
                type: 'string'
            }
        ],
        imgurl: '/screenshot_of_feedback.png',
        des: 'Add the documentation feedback control which directs users to submit product or documentation feedback'
    },
    {
        group: 'Page element',
        key: 'Feedback',
        subGroup: 'Download PDF button',
        type: 'string',
        des: ''
    },
    {
        group: 'Page element',
        key: 'Archived page disclaimer',
        subGroup: 'Search button (search scope)',
        type: 'number'
    },
    {
        group: 'Page element',
        key: 'Language selector',
        subGroup: 'Language selector',
        type: 'one or many'
    },
    {
        group: 'Page element',
        key: 'Language selector',
        subGroup: 'Archived page disclaimer',
        type: 'one or many'
    },
    {
        group: 'Navigation on page',
        key: 'Header/footer',
        subGroup: 'Header/footer',
        type: 'number'
    },
    {
        group: 'Navigation on page',
        key: 'Header/footer',
        subGroup: 'Breadcrumb',
        type: 'number'
    },
    {
        group: 'Navigation on page',
        key: 'Header/footer',
        subGroup: 'Fusion TOC',
        type: 'number'
    },
    {
        group: 'URL',
        key: 'Header/footer',
        subGroup: 'Base URL',
        type: 'number'
    },
    {
        group: 'URL',
        key: 'Header/footer',
        subGroup: 'Shared base path',
        type: 'number'
    },
    {
        group: 'URL',
        key: 'Header/footer',
        subGroup: 'Redirection',
        type: 'number'
    },
    {
        group: 'Versioning',
        key: 'Header/footer',
        subGroup: 'Moniker range',
        type: 'number'
    },
    {
        group: 'Localization',
        key: 'Header/footer',
        subGroup: 'Bilingual (side by side)',
        type: 'number'
    },
    {
        group: 'Cross Repository',
        key: 'Header/footer',
        subGroup: 'Cross Repository Reference (CRR)',
        type: 'number'
    },
    {
        group: 'Cross Repository',
        key: 'Header/footer',
        subGroup: 'XRef',
        type: 'number'
    },
    {
        group: 'Build output',
        key: 'Header/footer',
        subGroup: 'PDF',
        type: 'number'
    },
    {
        group: 'Build output',
        key: 'Header/footer',
        subGroup: 'Intellisense',
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
            const subGroup = metadata.subGroup
            if (!result.hasOwnProperty(subGroup)) {
                result[subGroup] = 1
            } else {
                result[subGroup] ++
            }
            return result
        }, {})
    }

    componentWillReceiveProps = (nextProps) => {
       
        //console.log(nextProps)
        if (this.props.docsetName === nextProps.docsetName) {
            const oldMetadatasNum = this.getGroupedCount(this.props.metadatas)
            const newMetadatasNum = this.getGroupedCount(nextProps.metadatas)

            //console.log(oldMetadatasNum, newMetadatasNum)
            this.setState({
                updatedItemNums: _.mapValues(newMetadatasNum, (value, key) => 
                    value - (oldMetadatasNum[key] ? oldMetadatasNum[key] : 0)
                )
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

    render() {
        const { metadatas, docsetName } = this.props
        const groupedItems = _.groupBy(metadatas, 'group')

        const tabItems = _.keys(groupedItems).map(group => {
            const subGroupItems = _.groupBy(groupedItems[group], 'subGroup')

            //Filter the group level has updated
            const didUpdated = this.state.updatedItemNums ? 
            !_.isEmpty(_.filter(groupedItems[group], groupItems => this.state.updatedItemNums[groupItems.subGroup] > 0))
            :
            false
            console.log(groupedItems[group], this.state.updatedItemNums)
            return (
                <Tab tab={<Badge dot={didUpdated}><p>{group}</p></Badge>} key={group}>
                    <FunctionalSubContent subGroups={subGroupItems} updatedItemNums={this.state.updatedItemNums} />
                </Tab>
            )
        })

        return (
            <div>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <h2>{docsetName}</h2>
                    <div>
                        <Button type='dashed' icon='plus' onClick={this.onToggleAddMetadata}>
                            Add Config
                        </Button>
                            
                        <Button type="primary" onClick={this.onFakeChangeMetadatas} style={{marginLeft: '10px'}}>
                            Save
                        </Button>
                    </div>  
                </div>                
                <Tabs onChange={this.onClickTabs} type='card' size='large' style={{marginTop: '20px'}}>
                    {tabItems}
                </Tabs>
                <MetadataDiscovery 
                    isOpen={this.state.openAddMetadata} 
                    onSubmitMetadatas={this.onSubmitMetadatas} 
                    onCancel={this.onToggleAddMetadata}
                    globalMetadatas={metadataSet}/>
            </div>
        )
    }
}