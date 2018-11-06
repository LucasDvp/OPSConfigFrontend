import React from 'react'
import {Col, Button, Divider, Row} from 'antd';
import BooleanConfig from './BooleanConfig';
import StringConfig from './StringConfig';

export default function MetadataSetting({ name, metadatas, isChecked }) {
    const metadataItems = metadatas.map(metadata => <StringConfig key={metadata.key} keyName={metadata.key} des={metadata.des} value={metadata.value}/>)

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
                <Button type="dashed" size='large' icon='plus' style={{width: '100%', marginTop: '10px'}}>Add Metadata</Button>
            </div>
        </div>
    );
}