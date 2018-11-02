import React, { Component } from 'react'
import {Divider} from 'antd';
import BooleanConfig from './BooleanConfig';
import OutputConfig from './OutputConfig';

export default class RepoConfigs extends Component {
    render(){
        return (
            <div>
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
                </div>
            </div>
        );
    }
}