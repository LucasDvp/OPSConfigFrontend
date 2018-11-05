import React from 'react'
import { List, Input, Button } from 'antd';

const ListItem = List.Item;

export default function EmailConfigs({keyName, des, emails}) {
    const items = emails.map(email => <ListItem key={email} actions={[<a>Delete</a>]}>{email}</ListItem>)
    
    return (
        <div style={{marginBottom: '20px'}}>
            <h3>{keyName}</h3>
            <span>{des}</span>
            <div style={{display: 'flex', margin: '20px 0 20px 0'}}>
                <Input placeholder='Add email...'/>
                <Button type='primary' icon='plus' style={{marginLeft: '10px'}}>Add email</Button>
            </div>
            <List bordered >
                {items}
            </List>
        </div>
    );
}