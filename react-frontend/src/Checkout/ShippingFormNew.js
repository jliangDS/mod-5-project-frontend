import React, { useState } from 'react'
import { Button, Divider, Form, Grid, Image, Segment } from 'semantic-ui-react'

export default function ShippingFormNew(props){

    const [shipping, changeShipping] = useState({
        fullName: '',
        email: '',
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
                email: shipping.email, 
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
            .then(props.switchPage('stripe', null))
    }

    return (
        <Grid textAlign='center'>
            <Grid.Column width={12}>
                <Form size='large' onSubmit={handleSubmit}>
                    <Segment>
                        <Form.Input label="Full Name" value={shipping.fullName} onChange={e => changeShipping({...shipping, fullName: e.target.value})}/>
                        <Form.Input label='Email' value={shipping.email} onChange={e => changeShipping({...shipping, email: e.target.value})}/>
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
            <Grid.Column width={4}>
                <Segment>
                    {props.user.items.map( item => 
                        <div key={item.id} align='center' >
                            <Image src={item.image} style={{ height: '10vh' }} />
                            <p>{item.name}</p>
                            <p>${item.price}</p>
                            <Divider hidden />
                        </div>
                    )}
                </Segment>
                <Segment>
                    <Grid columns={2}>
                        <Grid.Column>
                            <p>SUBTOTAL</p>
                        </Grid.Column>
                        <Grid.Column>
                            <p>${props.subTotal.toFixed(2)}</p>
                        </Grid.Column>
                        <Grid.Column>
                            <p>SALES TAX</p>
                        </Grid.Column>
                        <Grid.Column>
                            <p>${props.salesTax.toFixed(2)}</p>
                        </Grid.Column>
                        <Grid.Column>
                            <p>SHIPPING</p>
                        </Grid.Column>
                        <Grid.Column>
                            <p>${props.shipping.toFixed(2)}</p>
                        </Grid.Column>
                    </Grid>
                    <Divider clearing/> 
                    <Grid columns={2}>
                        <Grid.Column>
                            <p><strong>TOTAL</strong></p>
                        </Grid.Column>
                        <Grid.Column>
                            <p><strong>${props.estimatedTotal.toFixed(2)}</strong></p>
                        </Grid.Column>
                    </Grid>
                </Segment>
            </Grid.Column>
        </Grid>
    )
}