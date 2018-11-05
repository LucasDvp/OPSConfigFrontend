import React, { Component } from 'react'
import {Col, Button, Divider} from 'antd';
import BooleanConfig from './BooleanConfig';
import StringConfig from './StringConfig';

export default class MetadataSetting extends Component {

    render() {
        const { name, metadatas, isChecked } = this.props
        const metadataItems = metadatas.map(metadata => <StringConfig key={metadata.key} keyName={metadata.key} des={metadata.des} value={metadata.value}/>)

        return (
            <div>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Col span={24}>
                        <h2>{name} Metadata</h2>
                        <Divider />
                        <span>Following metadata will be applied docset-wide (globalMetadata)</span>
                    </Col>
                </div>
                <div>
                    <BooleanConfig 
                    keyName="Accepts community contributions" 
                    des="Select if your content accepts community contributions, adds a button to the rendered page which directs external users to a repository to submit pull requests" 
                    checked={isChecked}/>
                    {metadataItems}
                    <Button type="dashed" size='large' icon='plus' style={{width: '100%', marginTop: '25px'}}>Add Metadata</Button>
                </div>
            </div>
        );
    }
}