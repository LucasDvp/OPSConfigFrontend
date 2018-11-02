import React from 'react'
import { Select } from 'antd';

const Option = Select.Option;

export default function OutputConfig({keyName, des, branches}) {
    const options = branches.map(branch => <Option key={branch}>{branch}</Option>)
    
    return (
        <div style={{marginBottom: '20px'}}>
            <h3>{keyName}</h3>
            <span>{des}</span>
            <Select
            mode="tags"
            style={{ width: '100%' }}
            placeholder="Tags Mode"
            >
                {options}
            </Select>
        </div>
    );
}