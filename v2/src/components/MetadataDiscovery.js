import React, { Component } from 'react'
import { List, Button, Drawer, Input, Tabs, Tag, Row, Col, Alert, Badge } from 'antd'
import _ from 'lodash'
import '../MetadataDiscovery.css'

const ListItem = List.Item
const Search = Input.Search
const TabPane = Tabs.TabPane 
const colors = {
    'Page element': 'magenta',
    'Reference': 'orange', 
    'Archived': 'green', 
    'Navigation on page': 'yellow',
    'URL': 'orange', 
    'Versioning': 'cyan', 
    'Localization': 'blue', 
    'Cross Repository': 'purple',
    'Build output': 'black'
}
function MetadataButton({ isSelected, onToggleMetadata }) {
    return (
        <Button type={isSelected ? 'danger' : 'primary'} onClick={onToggleMetadata}>
            {isSelected ? 'Remove' : 'Add'}
        </Button>
    )
}
function TitleBox({ title, groupNickName}) {
    const color = colors[groupNickName]
    return (
        <Row gutter={8} type='flex'>
            <Col><p>{title}</p></Col>
            <Col><Tag color={color} style={{display: groupNickName ? 'initial': 'none'}}>{groupNickName}</Tag></Col>
        </Row>
    )
}
export default class MetadataDiscovery extends Component {
    
    state = this.initState

    componentWillReceiveProps = (o, nextProps) => {
        this.setState(this.initState)
    }

    get initState()  {
        return {
            metadatas: this.props.globalMetadatas.map(metadata => _.assign(metadata, {isSelected: false}))
        }
    }

    onTabClick = (value) => {
        //console.log(value)
    }

    onClose = () => {
        //console.log(this.props.globalMetadatas)
        this.setState(this.initState)
        this.props.onCancel();
    }

    onSubmitMetadatas = () => {
        const selectedMetadatas = _.filter(this.state.metadatas, {isSelected: true})
        this.setState(this.initState)
        this.props.onSubmitMetadatas(selectedMetadatas)
    }

    onToggleMetadata = (metadataKey) => () => {
        const oldMetadata = _.find(this.state.metadatas, { 'subGroup': metadataKey })
        oldMetadata.isSelected = !oldMetadata.isSelected
        this.setState({
            metadata: _.assign(this.state.metadatas, oldMetadata)
        })
    }

    render() {
        const { isOpen } = this.props
        
        const listContainerStyle = { height: '780px', overflowY: 'auto' }
        const groupedMetadata = _.groupBy(this.state.metadatas, 'group')
        const groupedMetadataItems = _.keys(groupedMetadata).map((groupName, index) => (
            <TabPane tab={groupName} key={index}>
                <List size='large' style={listContainerStyle}>
                    {
                       groupedMetadata[groupName].map(child => (
                           <ListItem 
                           key={child.subGroup}
                           actions={[
                           <MetadataButton isSelected={child.isSelected} onToggleMetadata={this.onToggleMetadata(child.subGroup)}/>
                           ]}>
                               <ListItem.Meta
                                title={<TitleBox title={child.subGroup} groupNickName={child.groupNickName} />}
                                description={<p >{child.des}</p>}/>
                            </ListItem>
                       )) 
                    }
                </List>
            </TabPane>
        ))

        return (
            <Drawer 
            title="Add Configuration"
            width="60%"
            visible={isOpen}
            onClose={this.onClose}>
                <Search
                enterButton='Search'
                size='large'
                placeholder='Seach Configuration'/>
                <Tabs style={{marginTop: '20px'}} defaultActiveKey="0" onChange={this.onTabClick}>
                    {groupedMetadataItems}
                </Tabs>
                <div
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    padding: '24px',
                    width: '100%',
                    backgroundColor: 'white'
                }}>
                    <Button
                    block
                    onClick={this.onSubmitMetadatas} 
                    type="primary" 
                    size='large'>
                        Add
                    </Button>
                </div>
            </Drawer>
        )
    }
}