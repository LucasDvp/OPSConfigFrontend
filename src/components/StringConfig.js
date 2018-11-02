import React from 'react'
import { Input, Col, Button, Tooltip, Row } from 'antd';

const InputGroup = Input.Group;
export default function OutputConfig({keyName, des, value}) {
   
    
    return (
        <div style={{marginTop: '20px'}}>
            <h3>{keyName}</h3>
            <InputGroup size="large" style={{display: 'flex', justifyContent: 'space-around', alignContent: 'center'}}>
                <Col span={8}>
                    <Input defaultValue={keyName} disabled={true} />
                </Col>
                <Col span={8}>
                    <Input defaultValue={value} />
                </Col>
                <Col span={4}>
                <Tooltip placement="right" title={des}>
                    <Button>Description</Button>
                </Tooltip>
                </Col>
            </InputGroup>
        </div>
    );
}