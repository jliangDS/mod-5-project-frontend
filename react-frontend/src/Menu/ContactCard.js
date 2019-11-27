import React from 'react'
import { Container } from 'semantic-ui-react'

class ContactCard extends React.Component {

    render() {
        return (
            <Container>
                <h1>CONTACT US</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <h4>COME VISIT US</h4>
                <p>22 OAK DRIVE</p>
                <p>SAN FRANCISCO, CA</p>
                <h4>STORE HOURS</h4>
                <p>MONDAY-FRIDAY 9:00-5:00</p>
                <p>SATURDAY 10:00-5:00</p>
                <h4>PHONE</h4>
                <p>(222) 222-2222</p>
            </Container>
        )
    }
}

export default ContactCard