import React from 'react'
import {Elements} from 'react-stripe-elements'

import CheckoutForm from './CheckoutForm'

export default function Stripe(props){
    return (
        <Elements>
            <CheckoutForm user={props.user} subTotal={props.subTotal} salesTax={props.salesTax} shipping={props.shipping} estimatedTotal={props.estimatedTotal} order={props.order}/>
        </Elements>
    )
}
