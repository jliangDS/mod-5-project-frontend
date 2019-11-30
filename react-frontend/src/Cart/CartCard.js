import React from 'react'
import { Button, Container, Divider, Form, Grid, Header, Image, Segment } from 'semantic-ui-react'

class CartCard extends React.Component {

    render() {
        return (
            <Container text>
               <Grid stackable columns={1}  verticalAlign='middle'>
                {this.props.carts.map( cart => 
                    <Grid.Column key={cart.id}>
                        <Segment>
                            <Grid columns={2}>
                                <Grid.Column>
                                    <Image src={cart.item.image} style={{ height: '10vh' }}/>
                                </Grid.Column>
                                <Grid.Column>
                                    <p><strong>{cart.item.name}</strong></p>
                                    <p>${cart.item.price}</p>
                                    <Form onSubmit={(e) => this.props.deleteCart(e)}>
                                        <Button color='orange' compact value={cart.id}>REMOVE</Button>
                                    </Form>
                                </Grid.Column>
                            </Grid>
                        </Segment>
                    </Grid.Column>
                )}
                    <Grid.Column>
                        <Segment>
                            <Header align='center'>SHIPPING</Header>
                            <Form>
                            <Grid columns={2}>
                                <Grid.Column>
                                    <Form.Radio label='STANDARD SHIPPING' control='input' type='radio' name='shippingMethod' onChange={() => this.props.switchShipping(9.95)}/>
                                </Grid.Column>
                                <Grid.Column>
                                    <p>$9.95</p>
                                </Grid.Column>
                                <Grid.Column>
                                    <Form.Radio label='PRIORITY SHIPPING' control='input' type='radio' name='shippingMethod' onChange={() => this.props.switchShipping(19.95)}/>
                                </Grid.Column>
                                <Grid.Column>
                                    <p>$19.95</p>
                                </Grid.Column>
                            </Grid>
                            </Form>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column>
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
                                    <p>${this.props.shipping}</p>
                                </Grid.Column>
                            </Grid>
                            <Divider clearing/>
                            <Grid columns={2}>
                                <Grid.Column>
                                    <p><strong>ESTIMATED TOTAL</strong></p>
                                </Grid.Column>
                                <Grid.Column>
                                    <p><strong>${this.props.estimatedTotal.toFixed(2)}</strong></p>
                                </Grid.Column>
                            </Grid>
                        </Segment>
                        <Button fluid size='large' color='green'>CHECKOUT</Button>
                    </Grid.Column>
                </Grid>  
            </Container>
        )
    }
}

export default CartCard