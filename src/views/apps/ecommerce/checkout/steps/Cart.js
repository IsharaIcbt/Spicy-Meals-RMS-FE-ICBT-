// ** React Imports
import { Link } from 'react-router-dom'

// ** Third Party Components
import classnames from 'classnames'
import InputNumber from 'rc-input-number'
import { X, Heart, Star, Plus, Minus } from 'react-feather'

// ** Reactstrap Imports
import { Card, CardBody, CardText, Button, Badge, InputGroup, Input, InputGroupText } from 'reactstrap'

// ** Styles
import '@styles/react/libs/input-number/input-number.scss'
import { useEffect, useState } from "react"

const Cart = props => {
  // ** Props
  const { products, stepper, deleteCartItem, dispatch } = props

  // ** Local state
  const [cartItems, setCartItems] = useState(products)

  // ** Function to convert Date
  const formatDate = (value, formatting = { month: 'short', day: 'numeric', year: 'numeric' }) => {
    if (!value) return value
    return new Intl.DateTimeFormat('en-US', formatting).format(new Date(value))
  }

  // ** Function to handle quantity change
  const handleQuantityChange = (value, id) => {
    const updatedCartItems = cartItems.map(item => {
      if (item.id === id) {
        item.qty = value
        item.totalPrice = value * item.price
      }
      return item
    })
    setCartItems(updatedCartItems)
  }

  // ** Function to calculate total price
  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.totalPrice, 0)
  }

  const formatTextChange = (text) => {
    // Replace underscores with spaces and capitalize each word
    return text
      .replace(/_/g, ' ')
      .toLowerCase()
      .replace(/\b\w/g, char => char.toUpperCase())
  }


  // ** Render cart items
  const renderCart = () => {
    return cartItems.map(item => {
      return (
        <Card key={item.name} className='ecommerce-card'>
          <div className='item-img'>
            <Link to={`/apps/ecommerce/product-detail/${item.id}`}>
              <img className='img-fluid' src={item.image} alt={item.name} />
            </Link>
          </div>
          <CardBody>
            <div className='item-name'>
              <h6 className='mb-0'>
                <Link to={`/apps/ecommerce/product-detail/${item.id}`}>{item.name}</Link>
              </h6>
              <span className='item-company'>
                <a className='ms-25 text-dark' href='/' onClick={e => e.preventDefault()}>
                  {formatTextChange(item.mealType)}
                </a>
              </span>
              <div className='item-rating'>
                <ul className='unstyled-list list-inline'>
                  {new Array(5).fill().map((listItem, index) => {
                    return (
                      <li key={index} className='ratings-list-item me-25'>
                        <Star
                          className={classnames({
                            'filled-star': index + 1 <= item.rating,
                            'unfilled-star': index + 1 > item.rating
                          })}
                        />
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
            <span className='text-success mb-1'>{item.status === 'ACTIVE' ? 'Available Now' : 'Unavailable'}</span>
            <div className='item-quantity'>
              <span className='quantity-title me-50'>Qty</span>
              <InputNumber
                min={1}
                max={10}
                upHandler={<Plus />}
                className='cart-input'
                value={item.qty}
                onChange={(value) => handleQuantityChange(value, item.id)}
                downHandler={<Minus />}
              />
            </div>
            <div className='delivery-date text-muted'>Meal Updated by :  {formatDate(item.updatedDate)}</div>
            <span className='text-success'>
              {item.discount}% off  discount Available
            </span>
          </CardBody>
          <div className='item-options text-center'>
            <div className='item-wrapper'>
              <div className="item-cost">
                <h4 className="item-price">${item.totalPrice}</h4>
                {item.hasFreeShipping ? (
                  <CardText className="shipping">
                    <Badge color="light-success" pill>
                      Free Shipping
                    </Badge>
                  </CardText>
                ) : null}
              </div>
            </div>
            <Button className='mt-1 remove-wishlist bg-light-danger border-0' onClick={() => dispatch(deleteCartItem(item.id))}>
              <X size={14} className='me-25' />
              <span>Remove</span>
            </Button>

          </div>
        </Card>
      )
    })
  }

  useEffect(() => {
    setCartItems(products.map(item => ({ ...item, totalPrice: item.price * item.qty })))
  }, [products])

  return (
    <div className='list-view product-checkout'>
      <div className='checkout-items'>{cartItems.length ? renderCart() : <h4>Your cart is empty</h4>}</div>
      <div className='checkout-options'>
        <Card>
          <CardBody>
            <label className='section-label mb-1'>Options</label>
            <InputGroup className='input-group-merge coupons'>
              <Input placeholder='Coupons' />
              <InputGroupText className='text-primary ms-0'>Apply</InputGroupText>
            </InputGroup>
            <hr />
            <div className='price-details'>
              <h6 className='price-title'>Price Details</h6>
              <ul className='list-unstyled'>
                <li className='price-detail'>
                  <div className='detail-title'>Total MRP</div>
                  <div className='detail-amt'>${calculateTotal()}</div>
                </li>
                <li className='price-detail'>
                  <div className='detail-title'>Bag Discount</div>
                  <div className='detail-amt discount-amt text-success'>-25$</div>
                </li>
                <li className='price-detail'>
                  <div className='detail-title'>Estimated Tax</div>
                  <div className='detail-amt'>$1.3</div>
                </li>
                <li className='price-detail'>
                  <div className='detail-title'>EMI Eligibility</div>
                  <a href='/' className='detail-amt text-primary' onClick={e => e.preventDefault()}>
                    Details
                  </a>
                </li>
                <li className='price-detail'>
                  <div className='detail-title'>Delivery Charges</div>
                  <div className='detail-amt discount-amt text-success'>Free</div>
                </li>
              </ul>
              <hr />
              <ul className='list-unstyled'>
                <li className='price-detail'>
                  <div className='detail-title detail-total'>Total</div>
                  <div className='detail-amt fw-bolder'>${calculateTotal()}</div>
                </li>
              </ul>
              <Button
                block
                color='primary'
                disabled={!cartItems.length}
                onClick={() => stepper.next()}
                classnames='btn-next place-order'
              >
                Place Order
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default Cart
