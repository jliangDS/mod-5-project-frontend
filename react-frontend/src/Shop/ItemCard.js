import React from 'react'
import { Button, Container, Form, Grid, Image, Segment  } from 'semantic-ui-react'

class ItemCard extends React.Component {

    render() {
        return (
            <Container>
                <Grid>
                    <Grid.Row columns={2}>
                        <Grid.Column>
                            <Image src={this.props.item.image}/>
                        </Grid.Column>
                        <Grid.Column>
                            <Segment >
                            <p>{this.props.item.name}</p>
                            <p>${this.props.item.price}</p>
                            <Form onSubmit={this.props.createCart}>
                                <Button fluid size='large' color='green'>ADD</Button>
                            </Form>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        )
    }
}

export default ItemCard