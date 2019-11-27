import React from 'react'
import { Button, Container, Form, Grid, Image, Segment } from 'semantic-ui-react'

class CartCard extends React.Component {

    render() {
        return (
            <Container>
               <Grid stackable columns={1}  verticalAlign='middle'>
                {this.props.carts.map( cart => 
                    <Grid.Column key={cart.id}>
                        <Segment>
                            <Image src={cart.item.image} style={{ height: '10vh' }}/>
                            <p>{cart.item.name}</p>
                            <p>${cart.item.price}</p>
                            <Form onSubmit={e => this.props.deleteCart(e)}>
                                <Button value={cart.id} color='orange'>REMOVE</Button>
                            </Form>
                        </Segment>
                    </Grid.Column>
                )}
                    <Grid.Column>
                        <Segment>
                            <p>SUBTOTAL: ${this.props.subTotal.toFixed(2)}</p>
                        </Segment>
                        <Segment>
                            <Button fluid size='large' color='green'>CHECKOUT</Button>
                        </Segment>
                    </Grid.Column>
                </Grid>  
            </Container>
        )
    }
}

export default CartCard