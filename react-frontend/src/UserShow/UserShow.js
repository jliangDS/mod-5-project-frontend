import React from 'react';
import HomeCard from '../Menu/HomeCard'
import NewsCard from '../Menu/NewsCard'
import AboutCard from '../Menu/AboutCard'
import ContactCard from '../Menu/ContactCard'
import ItemCollection from '../Shop/ItemCollection'
import ItemCard from '../Shop/ItemCard'
import CartCard from '../Cart/CartCard'
import ShippingFormNew from '../Checkout/ShippingFormNew'
import Stripe from '../Checkout/Stripe'
import { Button, Container, Icon, Header, Menu } from 'semantic-ui-react'

export class UserShow extends React.Component {

    state = {
        currentPage: 'index',
        user: null,
        item: null,
        shippingType: null, 
        itemCollection: [],
        subTotal: 0,
        salesTax: 0,
        shipping: 0,
        estimatedTotal: 0,
        defaultCheckedStandard: false,
        defaultCheckedPriority: false,
        order: null, 
    }

    componentDidMount(){
        const token = localStorage.getItem('token')
        fetch(`http://localhost:3000/users/${this.props.match.params.id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(user => this.setState({ 
                user: user,
                subTotal: user.items.reduce(function (a, b) {return {price: a.price + b.price}}, {price: 0}).price,
                salesTax: user.items.reduce(function (a, b) {return {price: a.price + b.price}}, {price: 0}).price * 0.0625,
                estimatedTotal: ((user.items.reduce(function (a, b) {return {price: a.price + b.price}}, {price:0}).price * 1.0625) + this.state.shipping)
            }))
        
        fetch('http://localhost:3000/items', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(itemCollection => this.setState({ itemCollection: itemCollection}))
    }

    createCart = (e) => {
        e.preventDefault()
        const token = localStorage.getItem('token')
        fetch('http://localhost:3000/carts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                user_id: this.state.user.id,
                item_id: this.state.item.id
            })
        })
            .then(response => response.json())
            .then(cart => this.setState({
                user: {
                    ...this.state.user,
                    carts: [
                        ...this.state.user.carts,
                        cart
                    ],
                    items: [
                        ...this.state.user.items,
                        cart.item
                    ]
                },
                subTotal: (this.state.subTotal + cart.item.price),
                salesTax: ((this.state.subTotal + cart.item.price) * 0.0625),
                estimatedTotal: (((this.state.subTotal + cart.item.price) * 1.0625) + this.state.shipping)
            }))
    }

    deleteCart = (e) => {
        e.preventDefault()
        const id = e.target.querySelector('button').value
        const token = localStorage.getItem('token')
        fetch(`http://localhost:3000/carts/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then( response => response.json())
            .then( removeCart => this.removeCart(removeCart))
    }

    removeCart = (removeCart) => {
        const carts = this.state.user.carts.filter(cart => cart.id !== removeCart.id)
        const items = carts.map(cart => cart.item)
        this.setState({
            user: {
                ...this.state.user,
                carts: carts,
                items: items
            },
            subTotal: (this.state.subTotal - removeCart.item.price),
            salesTax: ((this.state.subTotal - removeCart.item.price) * 0.0625),
            estimatedTotal: (((this.state.subTotal - removeCart.item.price) * 1.0625) + this.state.shipping)
        })
    }

    setOrder = (order) => {
        this.setState({
            order: order, 
        })
    }

    switchShipping = (shipping) => {
        switch (shipping) {
            case 9.95: 
                this.setState({
                    shipping: shipping,
                    shippingType: "STANDARD SHIPPING",
                    estimatedTotal: this.state.estimatedTotal - this.state.shipping + shipping,
                    defaultCheckedStandard: true,
                    defaultCheckedPriority: false
                })
                break;
            case 19.95:
                this.setState({
                    shipping: shipping,
                    shippingType: "PRIORITY SHIPPING",
                    estimatedTotal: this.state.estimatedTotal - this.state.shipping + shipping,
                    defaultCheckedStandard: false,
                    defaultCheckedPriority: true
                })
                break;
            default:
                break;
        }
    }

    switchPage = (page, item) => {
        this.setState({
            currentPage: page,
            item: item
        })
    }

    render() {
        if(this.state.user === null){
            return <div></div>
        }

        let CurrentPage
        switch (this.state.currentPage) {
            case 'home':
                CurrentPage = <HomeCard />;
                break;
            case 'index':
                CurrentPage = <ItemCollection itemCollection={this.state.itemCollection} switchPage={this.switchPage}/>;
                break;
            case 'cart':
                CurrentPage = <CartCard carts={this.state.user.carts} deleteCart={this.deleteCart} subTotal={this.state.subTotal} salesTax={this.state.salesTax} shipping={this.state.shipping} estimatedTotal={this.state.estimatedTotal} switchPage={this.switchPage} switchShipping={this.switchShipping} defaultCheckedStandard={this.state.defaultCheckedStandard} defaultCheckedPriority={this.state.defaultCheckedPriority}/>
                break;
            case 'checkout':
                CurrentPage = <ShippingFormNew user={this.state.user} subTotal={this.state.subTotal} salesTax={this.state.salesTax} shipping={this.state.shipping} shippingType={this.state.shippingType} estimatedTotal={this.state.estimatedTotal} switchPage={this.switchPage} setOrder={this.setOrder}/>;
                break;
            case 'stripe':
                CurrentPage = <Stripe user={this.state.user} subTotal={this.state.subTotal} salesTax={this.state.salesTax} shipping={this.state.shipping} estimatedTotal={this.state.estimatedTotal} order={this.state.order}/>;
                break;
            case 'contact':
                CurrentPage = <ContactCard />;
                break;
            case 'about':
                CurrentPage = <AboutCard />;
                break;
            case 'news':
                CurrentPage = <NewsCard />;
                break;
            case 'show':
                CurrentPage = <ItemCard createCart={this.createCart} item={this.state.item} user={this.state.user}/>;
                break;
            default:
                break;
        }
        
        return (
            <Container>
                <Container fluid>
                    <Header as='h1' align='center'></Header>
                    <Container align='right'>
                        <Button icon labelPosition='left' onClick={() => this.switchPage('cart', null)}>
                            <Icon name='shopping cart'/>{this.state.user.carts.length}
                        </Button>
                    </Container>
                </Container>
                <Menu>
                    <Container>
                        <Menu.Item as='a' header onClick={() => this.switchPage('home', null)}>HOME</Menu.Item>
                        <Menu.Item as='a' header onClick={() => this.switchPage('index', null)}>SHOP</Menu.Item>
                        <Menu.Item as='a' header onClick={() => this.switchPage('about', null)}>ABOUT</Menu.Item>
                        <Menu.Item as='a' header onClick={() => this.switchPage('news', null)}>NEWS & EVENTS</Menu.Item>
                        <Menu.Item as='a' header onClick={() => this.switchPage('contact', null)}>CONTACT</Menu.Item>
                    </Container>
                </Menu>
                {CurrentPage}
            </Container>
        )
    }
}