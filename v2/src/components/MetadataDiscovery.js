import React, { Component } from 'react'
import { Modal, TreeSelect } from 'antd'
import _ from 'lodash'

export default class MetadataDiscovery extends Component {
    state = {
        selectedMetadatas: []
    }

    
    onSelectMetadatas = (value) => {
        console.log(value)
        this.setState({
            selectedMetadatas: value
        })
    }

    render() {
        const { isOpen, onClose, globalMetadatas } = this.props;

        const groupedMetadatas = _.groupBy(globalMetadatas, (metadata) => metadata.group)

        const metadataItems = _.keys(groupedMetadatas).map(key => ({
            title: key,
            key: key,
            value: groupedMetadatas[key].map(metadata => metadata.key),
            children: groupedMetadatas[key].map(child => ({
                title: child.key,
                key: child.key,
                value: child.key
            }))
           
        }))
        return (
            <Modal 
            title="Add Metadata"
            visible={isOpen}
            onOk={onClose}
            onCancel={onClose}
            maskClosable={false}
            okText="Add">
                <TreeSelect 
                treeData={metadataItems}
                treeCheckable
                allowClear
                size='large'
                style={{width: '100%'}}
                showCheckedStrategy='SHOW_PARENT'
                searchPlaceholder='Choose metadata'
                onChange={this.onSelectMetadatas}
                value={this.state.selectedMetadatas}
                enterButton="Find" 
                onSearch={this.searchMetadatas} />
            </Modal>
        )
    }
}