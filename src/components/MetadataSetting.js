import React, { Component } from 'react'
import {Divider, Col, Row, Button} from 'antd';
import BooleanConfig from './BooleanConfig';
import StringConfig from './StringConfig';

export default class MetadataSetting extends Component {

    render() {
        const { name } = this.props
        return (
            <div>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Col><h2>{name} Metadata Settings</h2></Col>
                    <Col><Button type="primary">Add Metadata</Button></Col>
                </div>
                <Divider />
                <div>
                    <BooleanConfig keyName="open_to_public_contributors" des="XXXXXXXXXXXXXXX" checked={true}/>
                
                    <StringConfig keyName="feedback_github_repo" des="XXXXXXXXXX" value="MicrosoftDocs/azure-docs"/>
                
                    <StringConfig keyName="feedback_product_url" des="XXXXXXXXXX" value="https://feedback.azure.com/forums/34192--general-feedback"/>
                
                    <StringConfig keyName="breadcrumb_path" des="XXXXXXXXXX" value="/azure/bread/toc.json"/>
                
                    <StringConfig keyName="brand" des="XXXXXXXXXX" value="azure"/>
                </div>
            </div>
        );
    }
}