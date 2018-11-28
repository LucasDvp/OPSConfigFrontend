import React, {Component} from 'react'
import { Input, Col, Button, Icon } from 'antd'

const InputGroup = Input.Group
export default class MetadataItemConfig extends Component {

    state = {
        showInput: false
    }

    clickShowFileScopeToggle = () => {
        const oldShowInput = this.state.showInput
        this.setState({
            showInput: !oldShowInput
        })
    }

    render() {
        const { keyName, fileJson, value, hasFileMetadata=false, showFileMetadata=true, hint } = this.props
        let fileMetadataContent = this.state.showInput ? 
           
            <Input addonBefore="File Scope" placeholder="default is global scope" defaultValue={fileJson} addonAfter={<a onClick={this.clickShowFileScopeToggle}><Icon type='check'/></a>}/>
            : 
            <Button type='primary' icon='copy' disabled={!hasFileMetadata} onClick={this.clickShowFileScopeToggle}>Show File Scope</Button>
        
        return (
            <div style={{marginBottom: '15px'}}>
                <InputGroup size="large" style={{ display: 'flex', marginTop: '10px', justifyContent: 'space-between'}}>
                    <Col span={6}>
                        <Input defaultValue={keyName} />
                    </Col>
                    <Col span={6}>
                        <Input defaultValue={value} placeholder={hint} />
                    </Col>
                    <Col style={{display: showFileMetadata ? 'default' : 'none' }}>
                        {fileMetadataContent}
                    </Col>
                    <Col>
                        <Button type='primary'>Delete</Button>
                    </Col>
                </InputGroup>
            </div>
        )
    }
}