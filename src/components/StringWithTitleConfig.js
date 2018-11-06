import React from 'react'
import { Input,  Row, Tooltip, Icon } from 'antd';

export default function StringWithTitleConfig({keyName, des, value}) {
    return (
        <Row style={{marginTop: '20px'}} type='flex' justify='space-between'>
            <div style={{display: 'flex'}}>
            <span style={{fontSize: '16px', color: 'grey', 'fontWeight': '400'}}>{keyName}</span>
                <Tooltip title={des}>
                    <Icon type="info-circle" theme="twoTone" style={{margin: '3px'}}/>
                </Tooltip>
            </div>
            <Input value={value} style={{margin: '10px 0'}} />
        </Row>
    );
}