import React from 'react'
import {injectStripe} from 'react-stripe-elements'
import {CardElement} from 'react-stripe-elements'
import { Button, Container, Divider, Form } from 'semantic-ui-react'

class CheckoutForm extends React.Component {

    state = {
        user: 'testing',
        // subTotal: this.props.subTotal,
        // salesTax: this.props.salesTax,
        // shipping: this.props.shipping,
        // estimatedTotal: this.props.estimatedTotal,
        // order: this.props.order,
    }

    componentDidMount() {
        
    }

    handleSubmit = (ev) => {
        ev.preventDefault()
        const amount = this.props.estimatedTotal.toFixed(2) * 100
        console.log(this.props.stripe.createToken())
        // this.props.stripe.createToken().then(payload => {
        //     fetch('http://localhost:3000/charges', {
        //         method: 'POST',
        //         headers: {'Content-Type': 'application/json'},
        //         body: JSON.stringify({
        //             amount: amount,
        //             payload: payload
        //         })
        //     })
        //     .then(charge => console.log("NewCharge", charge))
        // })
        .then(charge => console.log("Charges", charge))
        .then( response => {
            fetch(`http://localhost:3000/orders/${this.props.order.id}`, {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    order: this.props.order,
                })
            })
            .then(order => console.log(order))
        })
        .catch(err => console.log("Error", err))
        console.log(this.props.estimatedTotal)
        console.log('test')
    }

    render() {
        console.log(this.props.user)
        console.log(this.props.subTotal)
        console.log(this.props.salesTax)
        console.log(this.props.shipping)
        console.log(this.props.estimatedTotal)
        console.log(this.props.order)

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