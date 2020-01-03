import React from 'react'
import { Button, Container, Divider, Form, Grid, Image, Segment, Step } from 'semantic-ui-react'
import { ShippingFormNew } from './ShippingFormNew'

const steps= [
    {
        active: true,
        key: 'shipping',
        icon: 'truck',
    },
    {
        disabled: true,
        key: 'billing',
        icon: 'payment',
    },
    {
        disabled: true,
        key: 'confirm', 
        icon: 'info',
    }
]

const stateOptions = []

const countryOptions = []

class ShippingForm extends React.Component {

    state = {
        full_name: '',
        address: '',
        city: '',
        state: '',
        zipcode: '',
        phone: '',
        country: ''
    }

    render() {
        return (
            <Container>
                <Step.Group items={steps} fluid size='mini'/>
                
                <ShippingFormNew user={this.props.user}/>

                <Grid>
                    <Grid.Column width={12}>
                        <Segment>
                            <h4 align='center'>DELIVERY METHOD</h4>
                            <Divider clearing />
                            <Grid columns={2}>
                                <Grid.Column><strong><p>SHIPMENT</p></strong></Grid.Column>
                                <Grid.Column><p>{this.props.shippingType}</p></Grid.Column>
                            </Grid>
                        </Segment>
                        <Segment>
                            <h4 align='center'>SHIPPING ADDRESS</h4>
                            <Divider clearing />
                            <Form>
                                <Form.Input label='FULL NAME' value={this.state.full_name} ></Form.Input>
                                <Form.Input label='ADDRESS'></Form.Input>
                                <Form.Group widths='equal'>
                                    <Form.Input fluid label='CITY'></Form.Input>
                                    <Form.Select fluid options={stateOptions} label='STATE' placeholder='SELECT...'></Form.Select>
                                </Form.Group>
                                <Form.Group widths='equal'>
                                    <Form.Input fluid label='ZIPCODE'></Form.Input>
                                    <Form.Input fluid label='PHONE' placeholder='XXX-XXX-XXXX'></Form.Input>
                                </Form.Group>
                                <Form.Select  label='COUNTRY' options={countryOptions} placeholder='SELECT...'></Form.Select>
                                <Form.Button color='green' fluid>SAVE & CONTINUE</Form.Button>
                            </Form>
                        </Segment>
                    </Grid.Column>

                    <Grid.Column width={4}>
                        <Segment>
                            <h4 align='center'>ORDER SUMMARY</h4>
                            <Divider clearing />
                            <Grid stackable columns={1}>
                            {this.props.user.items.map( item => 
                                <Grid.Column key={item.id}>
                                    <Grid columns={2}>
                                        <Grid.Column>
                                            <Image src={item.image} />
                                        </Grid.Column>
                                        <Grid.Column>
                                            <p>{item.name}</p>
                                            <p>${item.price}</p>
                                        </Grid.Column>
                                    </Grid>
                                    <Divider clearing />                           
                                </Grid.Column> 
                            )}
                            </Grid>
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
                            <Divider clearing />
                            <Grid columns={2}>
                                <Grid.Column>
                                    <strong><p>TOTAL</p></strong>
                                </Grid.Column>
                                <Grid.Column>
                                    <strong><p>${this.props.estimatedTotal.toFixed(2)}</p></strong>
                                </Grid.Column>
                            </Grid>
                            <Divider hidden />
                            <Button disabled={true} align='center' fluid>COMPLETE ORDER</Button>
                        </Segment>
                    </Grid.Column>
                </Grid>
            </Container>
        )
    }
}

export default ShippingForm