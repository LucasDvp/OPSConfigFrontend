import React, { Component } from 'react'
import {Col, Button, Divider} from 'antd'
import BooleanConfig from './BooleanConfig'
import MetadataItemConfig from './MetadataItemConfig'
import _ from 'lodash'

export default class OldMetadataSetting extends Component {
    state = {
        metadatas: this.props.metadatas
    }

    onAddMetadata = () => {
        this.setState({
            metadatas: _.concat(this.state.metadatas, { key:'', value: '' })
        })
    }

    render() {
        const { name } = this.props
        const metadataItems = this.state.metadatas.map(metadata => <MetadataItemConfig showFileMetadata={false} key={metadata.key} keyName={metadata.key} fileJson={metadata.fileJson} hasFileMetadata={metadata.hasFileMetadata} value={metadata.value}/>)
        
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
                    checked={true}/>
                    
                    {metadataItems}
                    
                    <Button 
                    type="dashed" 
                    size='large' 
                    icon='plus' 
                    style={{width: '100%', marginTop: '10px'}} 
                    onClick={this.onAddMetadata}>
                        Add Metadata
                    </Button>
                </div>
            </div>
        )
    }
}