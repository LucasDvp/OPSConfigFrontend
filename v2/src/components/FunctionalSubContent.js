import React, { Component } from 'react'
import { Menu, List, Tag, Input, InputNumber, Switch, Badge } from 'antd'
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
        selectedMenuKey: 0
    }

    handleSubGroupClick = (e) => {
        this.setState({
            selectedMenuKey: e.key
        })
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
        const { subGroups, updatedItemNums } = this.props
        const subGroupNames = _.keys(subGroups)
        const subGroupItems = subGroups ? subGroups : []

        return (
            <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                <Menu
                    onClick={this.handleSubGroupClick}
                    style={{ width: '20%' }}
                    defaultSelectedKeys={['0']}
                    mode="inline"
                >
                    { subGroupNames.map((name, idx) => 
                        <Menu.Item key={idx}>
                            <Badge count={updatedItemNums ? updatedItemNums[name] : 0}>{name}</Badge>
                        </Menu.Item>) 
                    }
                </Menu>
                <List 
                    dataSource={subGroupItems[subGroupNames[this.state.selectedMenuKey]]}
                    style={{ width: '77%' }}
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
            </div>
        );
    }
}