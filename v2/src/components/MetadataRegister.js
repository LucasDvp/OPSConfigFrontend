import React, { Component } from 'react'
import { Drawer,  Button, Form, Input, Tooltip, Icon, Select, Upload } from 'antd'
import _ from 'lodash'

const FormItem = Form.Item
const Option = Select.Option
const TextArea = Input.TextArea
const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    }
}
const fullWidthItemLayout = {
    labelCol: {
        span: 24
    },
    wrapperCol: {
        span: 24
    }
}
const metadataType = ['bool', 'string', 'number', 'object', 'one or many']

class MetadataRegisterForm extends Component {
    state = this.initState
    
    get initState() {
        if (this.props.metadataSet) {
            return {
                groups: _.uniq(this.props.metadataSet.map(metadata => metadata.group)),
                names: this.props.metadataSet.map(metadata => metadata.key),
                values: this.props.metadataSet.map(metadata => metadata.value)
            }
        } else {
            return {
                group: [],
                names: []
            }
        }
    }

    onAddMetadataSet = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                values.key = values.name
                values.group = _.first(values.group)
                this.props.onAddMetadataSet(values)
            }
        });
    }

    validateValueExist = (key) => (rule, value, callback) => {
        let valueArray = []
        switch(key) {
            case "name":
                valueArray = this.state.names
                break;
            case "value":
            default:
                valueArray = this.state.values
        }

        console.log(valueArray, value, key, valueArray.includes(value))

        if (!valueArray.includes(value)) {
            callback()
        } else {
            callback(`The ${key} name has already exist`)
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.onAddMetadataSet}>
                <FormItem
                {...formItemLayout}
                label="Metadata Name"
                >
                {getFieldDecorator('name', {
                    rules: [{
                    required: true, message: 'Please input metadata name!',
                    }, {
                    validator: this.validateValueExist('name'),
                    }],
                })(
                    <Input />
                )}
                </FormItem>
                <FormItem
                {...formItemLayout}
                label={(
                    <span>
                      Metadata Value&nbsp;
                      <Tooltip title="Value is what your docfx.json key name.">
                        <Icon type="question-circle-o" />
                      </Tooltip>
                    </span>
                  )}
                >
                {getFieldDecorator('value', {
                    rules: [{
                    required: true, message: 'Please input metadata value!',
                    }, {
                    validator: this.validateValueExist('value'),
                    }],
                })(
                    <Input />
                )}
                </FormItem>
                <FormItem
                {...formItemLayout}
                label='Metadata Type'
                >
                {getFieldDecorator('type', {
                    rules: [{
                    required: true, message: 'Please select metadata type!',
                    }],
                })(
                    <Select placeholder='Select the metadata type'>
                        {metadataType.map(type => (<Option value={type}>{type}</Option>))}
                    </Select>
                )}
                </FormItem>
                <FormItem
                {...formItemLayout}
                label='Metadata Group'
                >
                {getFieldDecorator('group', {
                    rules: [{
                    required: true, message: 'Please select metadata group!',
                    }],
                })(
                    <Select 
                    allowClear
                    mode="tags" 
                    placeholder='Select the metadata group'
                    notFoundContent='Add new group'>
                        {this.state.groups.map(group => (<Option value={group}>{group}</Option>))}
                    </Select>
                )}
                </FormItem>
                <FormItem
                {...fullWidthItemLayout}
                label='Metadata Description'
                >
                {getFieldDecorator('des', {
                    rules: [{
                    required: true, message: 'Describe this metadata!',
                    }],
                })(
                    <TextArea rows={4}></TextArea>
                )}
                </FormItem>
                <FormItem
                {...fullWidthItemLayout}
                label='Metadata ScreenShot'
                >
                {getFieldDecorator('imgUrl', {
                valuePropName: 'fileList',
                getValueFromEvent: this.normFile,
                })(
                <Upload.Dragger name="files" action='/action.do'>
                    <p className="ant-upload-drag-icon">
                    <Icon type="inbox" />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                </Upload.Dragger>
                )}
                </FormItem>
                <FormItem>
                    <Button 
                    block
                    type='primary'
                    size='large'
                    htmlType="submit">
                        Add
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

export default class MetadataRegister extends Component {

    
    render() {
        const { onClose, showMetadataRegister, metadataSet, onAddMetadataSet } = this.props
        const MetadataRegistrationForm = Form.create()(MetadataRegisterForm)

        return (
            <Drawer
            visible={showMetadataRegister}
            onClose={onClose}
            title='Register New Metadata'
            width={450}>
                <MetadataRegistrationForm metadataSet={metadataSet} onAddMetadataSet={onAddMetadataSet}/>
            </Drawer>
        )
    }
}