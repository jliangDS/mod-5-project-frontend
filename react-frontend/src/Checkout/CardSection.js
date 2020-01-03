import React from 'react'
import {CardElement} from 'react-stripe-elements'

class CardSection extends React.Components {
    render() {
        return (
            <label>
                Card details
                <CardElement />
            </label>
        )
    }
}

export default CardSection