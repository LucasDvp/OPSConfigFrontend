import React, { Component } from 'react'
import {Col, Button, Divider, Row} from 'antd'
import BooleanConfig from './BooleanConfig'
import MetadataItemConfig from './MetadataItemConfig'
import MetadataDiscovery from './MetadataDiscovery'

export default class MetadataSetting extends Component {

    state = {
        openAddMetadata: false
    }

    clickToggleAddMetadata = () => {
        const oldOpenAddMetadata = this.state.openAddMetadata
        this.setState({
            openAddMetadata: !oldOpenAddMetadata
        })
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
                    onClick={this.clickToggleAddMetadata}>
                        Add Metadata
                    </Button>
                </div>
                <MetadataDiscovery 
                isOpen={this.state.openAddMetadata} 
                onClose={this.clickToggleAddMetadata} 
                globalMetadatas={metadataSet}/>
            </div>
        )
    }
}