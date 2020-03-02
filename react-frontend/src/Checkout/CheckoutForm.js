import React from 'react'
import {injectStripe} from 'react-stripe-elements'
import {CardElement} from 'react-stripe-elements'
import { Button, Divider, Form, Segment, Grid, Image } from 'semantic-ui-react'

class CheckoutForm extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    async handleSubmit(ev) {
        ev.preventDefault()

        const amount = this.props.estimatedTotal.toFixed(2) * 100
        const stripe = this.props.stripe 
        const payload = await stripe.createToken()
        fetch('http://localhost:3000/charges', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'},
            body: JSON.stringify({
                amount: amount,
                payload: payload
            })
        })
    }

    render() {
        return (
            <Grid textAlign='center' >
                <Grid.Column width={12}>
                    <Form onSubmit={this.handleSubmit}>
                        <Segment>
                            <CardElement/>
                            <Divider hidden/>
                            <Button fluid size='small' color='green'>Confirm Order</Button>
                        </Segment>
                    </Form>
                </Grid.Column>
                <Grid.Column width={4}>
                    <Segment>
                        {this.props.user.items.map( item => 
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
                            <p>${this.props.subTotal.toFixed(2)}</p>
                        </Grid.Column>
                        <Grid.Column>
                            <p>SALES TAX</p>
                        </Grid.Column>
                        <Grid.Column>
                            <p>${this.props.salesTax.toFixed(2)}</p>
                        </Grid.Column>
                        <Grid.Column>
                            <p>SHIPPING</p>
                        </Grid.Column>
                        <Grid.Column>
                            <p>${this.props.shipping.toFixed(2)}</p>
                        </Grid.Column>
                    </Grid>
                    <Divider clearing/> 
                    <Grid columns={2}>
                        <Grid.Column>
                            <p><strong>TOTAL</strong></p>
                        </Grid.Column>
                        <Grid.Column>
                            <p><strong>${this.props.estimatedTotal.toFixed(2)}</strong></p>
                        </Grid.Column>
                    </Grid>
                    </Segment>
                </Grid.Column>
            </Grid>
        )
    }
}

export default injectStripe(CheckoutForm)