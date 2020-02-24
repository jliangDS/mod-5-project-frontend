import React from 'react'
import { Container, Grid, Segment, Image } from 'semantic-ui-react'

class OrdersCard extends React.Component {

    state = {
        orders: []
    }

    componentDidMount(){
        const token = localStorage.getItem('token')

        fetch(`http://localhost:3000/orders/${this.props.user.id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(orders => this.setState({ orders: orders }))
            .then(orders => console.log(this.state.orders))
            
    }

    render() {
        return (
            <Container>
                <h1>ORDERS</h1>
                <Grid stackable columns={1} verticalAlign='middle'>
                    {this.state.orders.map( order => 
                    <Grid.Column>
                        <Segment>
                            <p><strong>Order Id: {order.id}</strong></p>
                            <p><strong>Full Name: {order.fullName} </strong></p>
                            <p><strong>Address: {order.address} </strong></p>
                            <p><strong>City: {order.city} </strong></p>
                            <p><strong>State: {order.state} </strong></p>
                            <p><strong>Zipcode: {order.zipcode} </strong></p>
                            <p><strong>Phone: {order.phone} </strong></p>
                            <p><strong>Country: {order.country} </strong></p>
                            {order.items.map( item => 
                                <Grid.Column key={item.id}>
                                    <Segment>
                                        <Grid columns={2}>
                                            <Grid.Column>
                                                <Image src={item.image} style={{ height: '10vh' }}/>
                                            </Grid.Column>
                                            <Grid.Column>
                                                <p><strong>{item.name}</strong></p>
                                                <p>${item.price}</p>
                                            </Grid.Column>
                                        </Grid>
                                    </Segment>
                                </Grid.Column>
                            )}
                        </Segment>
                    </Grid.Column>)}
                </Grid>
            </Container>
        )
    }
}

export default OrdersCard