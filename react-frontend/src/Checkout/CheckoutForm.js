import React from 'react'
import {injectStripe} from 'react-stripe-elements'
import {CardElement} from 'react-stripe-elements'
import { Button, Container, Divider, Form } from 'semantic-ui-react'

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
        .then(response => console.log(response))
    }

    render() {
        return (
            <Container>
                <Form onSubmit={this.handleSubmit}>
                    <CardElement />
                    <Divider hidden/>
                    <Button fluid size='small' color='green'>Confirm Order</Button>
                </Form>
            </Container>
        )
    }
}

export default injectStripe(CheckoutForm)