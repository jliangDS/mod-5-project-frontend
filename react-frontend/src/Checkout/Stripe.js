import React, { useState } from 'react'
import { Button, Form, Grid, Segment } from 'semantic-ui-react'
import {Elements} from 'react-stripe-elements'

import CheckoutForm from './CheckoutForm'

export default function Stripe(props){
    console.log(props)
    return (
        <Elements>
            <CheckoutForm user={props.user} subTotal={props.subTotal} salesTax={props.salesTax} shipping={props.shipping} estimatedTotal={props.estimatedTotal} order={props.order}/>
        </Elements>
    )
}