import React from 'react'
import { Select } from 'antd'

const Option = Select.Option

export default function OutputConfig({keyName, des, branches, selected}) {
    const options = branches.map(branch => <Option key={branch}>{branch}</Option>)
    
    return (
        <div style={{marginBottom: '20px'}}>
            <h3>{keyName}</h3>
            <Select
            mode="tags"
            style={{ width: '100%' }}
            defaultValue={selected}
            placeholder="Input branch to filter"
            >
                {options}
            </Select>
        </div>
    )
}