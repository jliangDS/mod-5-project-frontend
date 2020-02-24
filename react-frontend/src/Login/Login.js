import React, { useState } from 'react'
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'

export function Login(props){

    const [ user, changeUser] = useState({
        name: '',
        password: ''
    })

    async function handleSubmit(e){
        e.preventDefault()
        let response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: user.name,
                password: user.password
            })
        })
        let { success, id, token } = await response.json()
        if(success){
            localStorage.setItem('token', token)
            props.history.push(`/users/${id}`)
        }
        
    }

    return (
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header textAlign='center'>Log-in to your account</Header>
                <Form size='large' onSubmit={handleSubmit}>
                    <Segment>
                        <Form.Input fluid icon='user' iconPosition='left' value={user.name} onChange={e => changeUser({ ...user, name: e.target.value})} placeholder='Use josh for Username'/>
                        <Form.Input fluid icon='lock' iconPosition='left' value={user.password} onChange={e => changeUser({ ...user, password: e.target.value})} type='password' placeholder='Use 1234 for Password'/>

                        <Button fluid size='large' color='green'>Login</Button>
                    </Segment>
                </Form>
            </Grid.Column>
        </Grid>
    )
}