import React, { useState } from 'react'
import { Button, Form, Grid, Segment } from 'semantic-ui-react'

export default function ShippingFormNew(props){

    const [shipping, changeShipping] = useState({
        fullName: '',
        address: '',
        city: '',
        state: '',
        zipcode: '',
        phone: '',
        country: ''
    }) 

    async function handleSubmit(e) {
        e.preventDefault()
        const token = localStorage.getItem('token')
        fetch('http://localhost:3000/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                user_id: props.user.id, 
                fullName: shipping.fullName,
                address: shipping.address,
                city: shipping.city,
                state: shipping.state,
                zipcode: shipping.zipcode,
                phone: shipping.phone,
                country: shipping.country,
                items: props.user.items,
                complete: false
            })
        })
            .then(response => response.json())
            .then(order => props.setOrder(order))
            .then(console.log)
            .then(props.switchPage('stripe', null))
    }

    return (
        <Grid textAlign='center'>
            <Grid.Column>
                <Form size='large' onSubmit={handleSubmit}>
                    <Segment>
                        <Form.Input label="Full Name" value={shipping.fullName} onChange={e => changeShipping({...shipping, fullName: e.target.value})}/>
                        <Form.Input label="Address" value={shipping.address} onChange={e => changeShipping({...shipping, address: e.target.value})}/>
                        <Form.Input label="City" value={shipping.city} onChange={e => changeShipping({...shipping, city: e.target.value})}/>
                        <Form.Input label="State" value={shipping.state} onChange={e => changeShipping({...shipping, state: e.target.value})}/>
                        <Form.Input label="Zipcode" value={shipping.zipcode} onChange={e => changeShipping({...shipping, zipcode: e.target.value})}/>
                        <Form.Input label="Phone" value={shipping.phone} onChange={e => changeShipping({...shipping, phone: e.target.value})}/>
                        <Form.Input label="Country" value={shipping.country} onChange={e => changeShipping({...shipping, country: e.target.value})}/>
                        <Button fluid size='large' color='green'>SAVE & CONTINUE</Button>
                    </Segment>
                </Form>
            </Grid.Column>
        </Grid>
    )
}