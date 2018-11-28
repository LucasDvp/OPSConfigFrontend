import React from 'react'
import {Col, Divider} from 'antd'
import MetadataItemConfig from './MetadataItemConfig'
import _ from 'lodash'

export default function OldMetadataSetting({ name, metadatas }) {

    console.log(metadatas)
    const metadataItems = metadatas.map(metadata => <MetadataItemConfig showFileMetadata={false} key={metadata.key} keyName={metadata.key} fileJson={metadata.fileJson} hasFileMetadata={metadata.hasFileMetadata} value={metadata.value}/>)
    
    return (
        <div style={{padding : '0 10px'}}>
            <div style={{display:'flex', flexDirection: 'column'}}>
                <Col span={24}>
                    <h2>Metadata</h2>
                    <span>Following metadata will be applied docset-wide (globalMetadata)</span>
                    <Divider />
                </Col>
                {metadataItems}
            </div>
        </div>
    )
}