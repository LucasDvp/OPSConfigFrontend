import React, { Component } from 'react'
import {Divider} from 'antd';
<<<<<<< HEAD
import OutputConfig from './OutputConfig';
import EmailConfigs from './EmailConfigs';
import StringWithTitleConfig from './StringWithTitleConfig';
=======
import BooleanConfig from './BooleanConfig';
import OutputConfig from './OutputConfig';
>>>>>>> refs/remotes/origin/master

export default class RepoConfigs extends Component {
    render(){
        return (
            <div>
<<<<<<< HEAD
                <div>
                    <h2>Public Contributor</h2>
                    <Divider />
                    <StringWithTitleConfig 
                    keyName='Git Repository URL open to public contributors'
                    des='The url of the git repository open to public contributors. If not specified, use current git repository url.' 
                    />
                    <StringWithTitleConfig 
                    keyName='Git Repository Branch open to public contributors'
                    des='The branch of the git repository open to public contributors. If not specified, use current git repository branch.'
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
=======
                <h2>Repo Configuration</h2>
                <Divider />
                <div>
                    <h2>Public Contributor</h2>
                    <Divider />
                    <BooleanConfig keyName="git_repository_url_open_to_public_contributors" des="XXXXXXXXX" checked={false}/>
                    <BooleanConfig keyName="git_repository_branch_open_to_public_contributors" des="XXXXXXXXX" checked={true}/>
                </div>
                <div>
                    <h2>Output</h2>
                    <Divider />
                    <BooleanConfig keyName="enable_pdf" des="XXXXXXXXX" checked={false}/>
                    <BooleanConfig keyName="enable_bilingual" des="XXXXXXXXX" checked={true}/>
                    <BooleanConfig keyName="enable_intellisense" des="XXXXXXXXX" checked={true}/>
                </div>
                <div>
                    <h2>Notification</h2>
                    <Divider />
                    <OutputConfig keyName="Notification valid for following branches" des="XXXXXXX" branches={["master", "live", "test", "zifan-test"]}/>
                </div>
                <div>
                    <h2>Build Exclude</h2>
                    <Divider />
                    <BooleanConfig keyName="build exclude" des="XXXXXXXXX" checked={true}/>
>>>>>>> refs/remotes/origin/master
                </div>
            </div>
        );
    }
}