import React from 'react'
import { Input, Col, Button } from 'antd';

const InputGroup = Input.Group;
export default function OutputConfig({keyName, des, value}) {
    return (
        <div style={{marginTop: '20px'}}>
            <InputGroup size="large" style={{ display: 'flex', marginTop: '10px', justifyContent: 'space-between'}}>
                <Col span={10}>
                    <Input defaultValue={keyName} />
                </Col>
                <Col span={8}>
                    <Input defaultValue={value} />
                </Col>
                <Col>
                    <Button type='primary'>Delete</Button>
                </Col>
            </InputGroup>
        </div>
    );
}