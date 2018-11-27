import React, { Component } from 'react'
import { Menu, List, Tag, Input, InputNumber, Switch, Badge, Avatar } from 'antd'
import '../App.css'
import _ from 'lodash'

const typeColorMap = {
    'string': 'magenta',
    'bool': 'green',
    'one or many': 'orange',
    'object': 'blue',
    'number': 'purple' 
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

    getInput(item, type, value) {
        value = value ? value : (type === 'bool' ? false : '') 
        console.log(item, type, value)
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
            default:
                return <Input size ='large' placeholder='Accept string value' value={value}/>
        }
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
                                {name} <Tag color='gold' style={{ 
                                    display: (subGroupItemHasOutDatedValues && subGroupItemHasOutDatedValues[name]) ? 'initial' : 'none',
                                }}>OutDated</Tag>
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
                    <List 
                        dataSource={subGroupItems[selectedSubGroupName]}
                        renderItem={ item => 
                            <List.Item 
                            key={item.key}
                            extra={<div style={{width: '700px'}}>{this.getInput(item, item.type, item.value)}</div>}
                            className='functional-settings-item'>
                                <List.Item.Meta
                                title={<div>
                                    {item.key} <Tag color={typeColorMap[item.type]}>{item.type}</Tag> <Tag color='gold' style={{display: item.outDated ? 'initial' : 'none'}}>OutDated</Tag>
                                </div>}
                                description={item.keyDes}
                                /> 
                            </List.Item> 
                        } 
                    />
                </div>
            </div>
        );
    }
}