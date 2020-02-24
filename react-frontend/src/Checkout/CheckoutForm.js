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
        console.log(this.props)
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
        .then(response => {
            if(response.status === 204) {
                fetch(`http://localhost:3000/orders/${this.props.order.id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    }
                })
                .then(response => alert("Payment Success"))
            }
            else {
                alert("Payment Failed")
            }
        })
    }

    render() {
        return (
            <Container>
                <Form onSubmit={this.handleSubmit}>
                    <p><strong>Demo Card Number: 4242 4242 4242 4242</strong></p>
                    <p><strong>MM/YY: 01/30</strong></p>
                    <p><strong>CVC: 424</strong></p>
                    <CardElement/>
                    <Divider hidden/>
                    <Button fluid size='small' color='green'>Confirm Order</Button>
                </Form>
            </Container>
        )
    }
}

export default injectStripe(CheckoutForm)