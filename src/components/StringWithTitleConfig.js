import React from 'react'
import { Input, Col, Button, Row } from 'antd';

export default function StringWithTitleConfig({keyName, des, value}) {
    return (
        <Row style={{marginTop: '20px'}} type='flex' justify='space-between'>
            <Col span={10}>
                <span style={{fontSize: '16px', color: 'grey', 'fontWeight': '400'}}>{keyName}</span>
            </Col>
            <Col span={8}>
                <Input defaultValue={value} />
            </Col>
            <Col>
                <Button type='primary'>Delete</Button>
            </Col>
        </Row>
    );
}