import React, { Component } from 'react'
import {Divider} from 'antd'
import OutputConfig from './OutputConfig'
import EmailConfigs from './EmailConfigs'
import StringWithTitleConfig from './StringWithTitleConfig'

export default class RepoConfigs extends Component {
    render(){
        return (
            <div>
                <div>
                    <h2>Public Contributor</h2>
                    <Divider />
                    <StringWithTitleConfig 
                    keyName='Git Repository URL open to public contributors'
                    des='The url of the git repository open to public contributors. If not specified, use current git repository url.' 
                    value='https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md'
                    />
                    <StringWithTitleConfig 
                    keyName='Git Repository Branch open to public contributors'
                    des='The branch of the git repository open to public contributors. If not specified, use current git repository branch.'
                    value='master'
                    />
                </div>
                <div>
                    <h2>Email Notification</h2>
                    <Divider />
                    <EmailConfigs 
                    keyName='Build/publish notifications will be sent to these email addresses' 
                    emails={['jasoz@microsoft.com', 'zifan@microsoft.com', 'yanzhao@microsoft.com', 'jahe@microsoft.com']} />
                </div>
                <div>
                    <h2>Branch level functionality</h2>
                    <Divider />
                    <OutputConfig 
                    keyName="Generate PDF on following branches" 
                    branches={['master', 'live', 'test', 'zifan-test']}
                    selected={['master']}/>
                    <OutputConfig 
                    keyName="Generate intellisense on following  branches" 
                    branches={['master', 'live', 'test', 'zifan-test']}
                    selected={['master', 'live']}/>
                    <OutputConfig 
                    keyName="Enable bilingual on following branches" 
                    branches={['master', 'live', 'test', 'zifan-test']}
                    selected={['zifan-test', 'test']}/>
                </div>
                <div>
                    <h2>Branch Policy</h2>
                    <Divider />
                    <OutputConfig 
                    keyName="No build/publish will be trigged on following branches" 
                    branches={['master', 'live', 'test', 'zifan-test']}
                    selected={['live-sxs']}/>
                </div>
            </div>
        )
    }
}