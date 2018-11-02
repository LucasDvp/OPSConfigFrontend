import React from 'react'
import { Switch, Col } from 'antd'

export default function BooleanConfig({keyName, des, checked}) {
    return (
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px'}}>
            <Col>
            <h3>{keyName}</h3>
            <span>Des: {des}</span>
            </Col>
            <Col style={{marginRight: '100px'}}>
                <Switch defaultChecked={checked} />
            </Col>
        </div>
    );
}