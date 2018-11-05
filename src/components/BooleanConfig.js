import React from 'react'
import { Switch, Col, Tooltip, Icon } from 'antd'

export default function BooleanConfig({keyName, des, checked}) {
    return (
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px'}}>
            <div style={{display: 'flex'}}>
                <h3>{keyName}</h3>
                <Tooltip title={des}>
                    <Icon type="info-circle" theme="twoTone" style={{margin: '3px'}}/>
                </Tooltip>
            </div>
            <Col>
                <Switch defaultChecked={checked} />
            </Col>
        </div>
    );
}