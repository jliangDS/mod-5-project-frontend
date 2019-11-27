import React from 'react'
import { Container, Grid, Image } from 'semantic-ui-react'

class ItemCollection extends React.Component {

    render() {
        return (
            <Container>
                <Grid>
                    <Grid.Row columns={5}>
                        {this.props.itemCollection.map( item => 
                            <Grid.Column key={item.id}>
                                <Image src={item.image} onClick={() => this.props.switchPage('show', item)}/>
                                <p>{item.name}</p>
                                <p>${item.price}</p>
                            </Grid.Column> 
                        )}
                    </Grid.Row>
                </Grid>
            </Container>
        )
    }
}

export default ItemCollection