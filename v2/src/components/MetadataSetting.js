import React, { Component } from 'react'
import {Col, Button, Divider, Row} from 'antd'
import BooleanConfig from './BooleanConfig'
import MetadataItemConfig from './MetadataItemConfig'
import MetadataDiscovery from './MetadataDiscovery'
import _ from 'lodash'

export default class MetadataSetting extends Component {

    state = {
        openAddMetadata: false
    }

    onToggleAddMetadata = () => {
        console.log(this.state.openAddMetadata)
        this.setState({
            openAddMetadata: !this.state.openAddMetadata
        })
    }

    onSubmitMetadatas = (selectedMetadatas) => {
        this.setState({
            openAddMetadata: false,
        })
        this.props.addMetadataToPanel(selectedMetadatas)
    }

    render() {
        const { name, metadatas, isChecked, metadataSet } = this.props
        const metadataItems = metadatas.map(metadata => <MetadataItemConfig key={metadata.key} keyName={metadata.key} fileJson={metadata.fileJson} hasFileMetadata={metadata.hasFileMetadata} value={metadata.value}/>)

        return (
            <div>
                <h2>{name}</h2>
                <div style={{display:'flex', flexDirection: 'column'}}>
                    <Col span={24}>
                        <h2>Metadata</h2>
                        <span>Following metadata will be applied docset-wide (globalMetadata)</span>
                        <Divider />
                    </Col>
                    <BooleanConfig 
                    keyName="Accepts community contributions" 
                    des="Select if your content accepts community contributions, adds a button to the rendered page which directs external users to a repository to submit pull requests" 
                    checked={isChecked}/>
                    
                    {metadataItems}
                    
                    <Button 
                    type="dashed" 
                    size='large' 
                    icon='plus' 
                    style={{width: '100%', marginTop: '10px'}} 
                    onClick={this.onToggleAddMetadata}>
                        Add Metadata
                    </Button>
                </div>
                <MetadataDiscovery 
                isOpen={this.state.openAddMetadata} 
                onSubmitMetadatas={this.onSubmitMetadatas} 
                onCancel={this.onToggleAddMetadata}
                globalMetadatas={metadataSet}/>
            </div>
        )
    }
}