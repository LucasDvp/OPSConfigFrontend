import React, { Component } from 'react'
import { Menu, List, Tag, Input, InputNumber, Switch, Badge, Avatar, Icon, Collapse } from 'antd'
import '../App.css'
import _ from 'lodash'

const typeColorMap = {
    'string': 'magenta',
    'bool': 'green',
    'one or many': 'orange',
    'object': 'blue',
    'number': 'purple' 
}

class FunctionalItem extends Component {
    getInput = (type, value) => {
        value = value ? value : (type === 'bool' ? false : '') 
        switch (type) {
            case 'object':
                return <Input size ='large' placeholder='Accept Json object value' defaultValue={value}/>
            case 'one or many':
                return <Input size ='large' placeholder='Accept one string or a string array' defaultValue={value}/>
            case 'bool':
                return <Switch size ='large' checkedChildren="True" unCheckedChildren="False" defaultChecked={value} />
            case 'number':
                return <InputNumber size ='large' defaultValue={value} />
            case 'string':
                return <Input size ='large' placeholder='Accept string value' value={value}/>
            default:
                return <div />
        }
    }

    render() {
        const { item, itemKey } = this.props
        const { key, keyDes, type, value, outDated } = item
        const hasFileMetadata = item.fileMetadata ? true : false
        const fileMetadata = hasFileMetadata ? item.fileMetadata : {}
        const fileMetadataKey = fileMetadata.key
        const fileMetadataType = fileMetadata.type
        const fileMetadataValue = fileMetadata.value
        const fileMetadataDes = fileMetadata.des

        //console.log(key, des, type, value, outDated, fileMetadata)

        return (
            <div className="function-item-panel" key={itemKey}>
                <div className="function-item-main-panel">
                    <div className="function-item-title">
                        <h4>
                            {key} <Tag color={typeColorMap[type]} style={{display: type ? 'initial': 'none'}}>{type}</Tag> 
                            <br/>
                            <Tag color='red' style={{display: outDated ? 'initial' : 'none'}}>This configuration is under retirement, we don't recommend to use it any longer</Tag>
                        </h4>
                        <p>{keyDes}</p>
                    </div>
                    <div className="function-item-sub-panel">
                        {this.getInput(type, value)}
                    </div>
                </div>
                <div className="function-item-file-metadata-panel">
                    <Collapse bordered={false} style={{display: hasFileMetadata ? 'flex' : 'none', flexDirection: 'column'}}>
                        <Collapse.Panel header="Apply to subset of docset only?" key="1">
                            <div className="function-item-title">
                                <h4>{fileMetadataKey} <Tag color={typeColorMap[fileMetadataType]} style={{display: fileMetadataType ? 'initial': 'none'}}>{fileMetadataType}</Tag> </h4>
                                <p>{fileMetadataDes}</p>
                            </div>
                            <div className="function-item-sub-panel">
                                {this.getInput(fileMetadataType, fileMetadataValue)}
                            </div>
                        </Collapse.Panel>
                    </Collapse>
                </div>
            </div>
        );
    }
}

export default class FunctionalSubContent extends Component { 
    state = {
        selectedMenuKey: '0'
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps && this.props && !_.isEqual(nextProps.subGroups, this.props.subGroups)) {
            this.setState({
                selectedMenuKey: '0'
            })
        }
    } 

    handleSubGroupClick = (e) => {
        this.setState({
            selectedMenuKey: e.key
        })
    }

    

    render() {
        const { subGroups, updatedItemNums } = this.props
        const subGroupItems = subGroups ? subGroups : []
        const subGroupNames = _.keys(subGroupItems)
        let subGroupItemHasOutDatedValues = _.clone(subGroupItems)
        
        subGroupNames.forEach(name => {
            _.set(subGroupItemHasOutDatedValues, name, !_.isEmpty(_.filter(subGroupItems[name], item => item.outDated)))
        })
        const selectedSubGroupName = subGroupNames[this.state.selectedMenuKey]
        const selectedSubGroupDes = _.first(subGroupItems[selectedSubGroupName]) ? _.first(subGroupItems[selectedSubGroupName]).des : null
        const selectedSubGroupImgUrl =  _.first(subGroupItems[selectedSubGroupName]) ? _.first(subGroupItems[selectedSubGroupName]).imgurl : null

        //console.log(subGroupItems[selectedSubGroupName])

        return (
            <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                <Menu
                    onClick={this.handleSubGroupClick}
                    style={{ width: '18%' }}
                    defaultSelectedKeys={[this.state.selectedMenuKey]}
                    mode="inline"
                >
                    { subGroupNames.map((name, idx) => 
                        <Menu.Item key={idx}>
                            <Badge dot={updatedItemNums ? updatedItemNums[name] > 0 : false}>
                                {name} <Icon type='warning' theme="twoTone" twoToneColor="red" style={{ 
                                    display: (subGroupItemHasOutDatedValues && subGroupItemHasOutDatedValues[name]) ? 'initial' : 'none',
                                }} />
                            </Badge>
                        </Menu.Item>
                    )
                    }
                </Menu>
                <div style={{ width: '80%' }}>
                    <div style={{border: '1px black'}}>
                    <h2>{selectedSubGroupName}</h2>
                    <blockquote>{selectedSubGroupDes}</blockquote>
                    <img style={{ width: 450 }} src={selectedSubGroupImgUrl} alt='no img'/>
                    </div>
                    <div>
                        {subGroupItems[selectedSubGroupName].map((item, idx) => <FunctionalItem item={item} itemKey={idx}/>)}
                    </div>
                </div>
            </div>
        );
    }
}