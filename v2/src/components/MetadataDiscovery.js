import React, { Component } from 'react'
import { List, Button, Drawer, Input, Tabs, Tag, Row, Col, Alert, Badge } from 'antd'
import _ from 'lodash'
import '../MetadataDiscovery.css'
import Viewer from 'react-viewer';
import 'react-viewer/dist/index.css';

const ListItem = List.Item
const Search = Input.Search
const TabPane = Tabs.TabPane 
const colors = ['magenta', 'orange', 'green']
function MetadataButton({ isSelected, onToggleMetadata }) {
    return (
        <Button type={isSelected ? 'danger' : 'primary'} onClick={onToggleMetadata}>
            {isSelected ? 'Remove' : 'Add'}
        </Button>
    )
}
function TitleBox({ title, groupName}) {
    const color = colors[groupName.length % colors.length]
    return (
        <Row gutter={8} type='flex'>
            <Col><p>{title}</p></Col>
            <Col><Tag color={color}>{groupName}</Tag></Col>
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
            metadatas: this.props.globalMetadatas.map(metadata => _.assign(metadata, {isSelected: false})),
            secondDrawerOpen: false,
            secondDrawerTitle: '',
            secondDrawerDes: '',
            secondDrawerGroup: '',
            secondDrawerImageDetail: '',
            secondDrawerType: '',
            imageVisible: false
        }
    }

    onTabClick = (value) => {
        console.log(value)
    }

    onClose = () => {
        console.log(this.props.globalMetadatas)
        this.setState(this.initState)
        this.props.onCancel();
    }

    onSubmitMetadatas = () => {
        const selectedMetadatas = _.filter(this.state.metadatas, {isSelected: true})
        this.setState(this.initState)
        this.props.onSubmitMetadatas(selectedMetadatas)
    }

    onToggleMetadata = (metadataKey) => () => {
        const oldMetadata = _.find(this.state.metadatas, { 'key': metadataKey })
        oldMetadata.isSelected = !oldMetadata.isSelected
        this.setState({
            metadata: _.assign(this.state.metadatas, oldMetadata)
        })
    }

    onToggleSecondDrawer = (metadata) => () => {
        if (this.state.secondDrawerOpen)
        {
            this.setState({
                secondDrawerOpen: false
            })
        } else if (metadata) {
            this.setState({
                secondDrawerOpen: true,
                secondDrawerTitle: metadata.key,
                secondDrawerDes: metadata.des,
                secondDrawerType: metadata.type,
                secondDrawerGroup: metadata.group,
                secondDrawerImageDetail: metadata.imgUrl
            })
        }
    }

    render() {
        const { isOpen } = this.props
        
        const allMetadatas = this.state.metadatas.map(metadata => (
            <ListItem actions={[
            <MetadataButton isSelected={metadata.isSelected} onToggleMetadata={this.onToggleMetadata(metadata.key)}/>,
            <Button 
            type='dashed'  
            onClick={this.onToggleSecondDrawer(metadata)}>Detail</Button>]}>
                <ListItem.Meta
                style={{width: '180px'}}
                title={<TitleBox title={metadata.key} groupName={metadata.group}/>}
                description={metadata.des}/>
            </ListItem>
        ))
        const listContainerStyle = { height: '780px', overflowY: 'auto' }
        const groupedMetadata = _.groupBy(this.state.metadatas, 'group')
        const groupedMetadataItems = _.keys(groupedMetadata).map((groupName, index) => (
            <TabPane tab={groupName} key={index+1}>
                <List size='large' style={listContainerStyle}>
                    {
                       groupedMetadata[groupName].map(child => (
                           <ListItem actions={[
                           <MetadataButton isSelected={child.isSelected} onToggleMetadata={this.onToggleMetadata(child.key)}/>,
                           <Button 
                           type='dashed' 
                           onClick={this.onToggleSecondDrawer(child)}>Detail</Button>]}>
                               <ListItem.Meta
                               style={{width: '180px'}}
                                title={<TitleBox title={child.key} groupName={groupName}/>}
                                description={child.des}/>
                            </ListItem>
                       )) 
                    }
                </List>
            </TabPane>
        ))

        const detailImageDiv = _.isEmpty(this.state.secondDrawerImageDetail) ? 
        <span className='no-detail-screenshot'>No Detail ScreenShot</span> :
        <img 
        src={this.state.secondDrawerImageDetail}
        alt='No Detail ScreenShot'
        onClick={() => {this.setState({ imageVisible: !this.state.imageVisible })}} />  

        return (
            <Drawer 
            title="Add Metadata"
            width="450"
            visible={isOpen}
            onClose={this.onClose}>
                <Search
                enterButton='Search'
                size='large'
                placeholder='Seach Metadata'/>
                <Tabs style={{marginTop: '20px'}} defaultActiveKey="0" onChange={this.onTabClick}>
                    <TabPane tab='All' key='0'>
                        <List size='large' style={listContainerStyle}>
                            {allMetadatas}
                        </List>
                    </TabPane >
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
                <Drawer
                title={this.state.secondDrawerTitle}
                width={400}
                closable={false}
                onClose={this.onToggleSecondDrawer()}
                visible={this.state.secondDrawerOpen}
                >
                    <div className='second-drawer-content'>
                        <div>Metadata Group: <Tag color='blue'>{this.state.secondDrawerGroup}</Tag></div>
                        <div>Metadata Type: <Tag color='purple'>{this.state.secondDrawerType}</Tag></div>
                        <div>Used Count: <Tag color='cyan'>109</Tag></div>
                        <Alert 
                        type='success' 
                        description={_.isEmpty(this.state.secondDrawerDes) ? 'No Description' : this.state.secondDrawerDes} 
                        message='Description'/>
                        <p>Metadata ScreenShot: </p>
                        {detailImageDiv}
                        <Viewer
                        visible={this.state.imageVisible}
                        onClose={() => { this.setState({ imageVisible: false }); } }
                        images={[{src: this.state.secondDrawerImageDetail, alt: 'Docs ScreenShot Details'}]}
                        />
                    </div>
                </Drawer>
            </Drawer>
        )
    }
}