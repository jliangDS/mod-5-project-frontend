import React from 'react'
import { Container, Image } from 'semantic-ui-react'

class NewsCard extends React.Component {

    render() {
        return (
            <Container>
                <h1>NEWS & EVENTS</h1>
                <Image style={{ height: '50vh' }} src='https://react.semantic-ui.com/images/wireframe/image.png' />
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </Container>
        )
    }
}

export default NewsCard