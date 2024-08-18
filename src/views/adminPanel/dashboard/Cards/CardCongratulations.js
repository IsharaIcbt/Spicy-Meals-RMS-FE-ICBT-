// ** Icons Imports
import { Award } from 'react-feather'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Reactstrap Imports
import { Card, CardBody, CardText } from 'reactstrap'
import './card.scss'
// ** Images
import decorationLeft from './assets/decore-left.png'
import decorationRight from './assets/decore-right.png'
import defaultAvatar from "@src/assets/images/portrait/small/avatar-s-11.jpg";

const CardCongratulations = (props) => {
  const {userData} = props
  const userAvatar = (userData && userData.img) || defaultAvatar
  return (
    <Card className='card-congratulations'>
      <CardBody className='text-center'>
        <img className='congratulations-img-left' src={decorationLeft} alt='decor-left' />
        <img className='congratulations-img-right' src={decorationRight} alt='decor-right' />
        <img src={userAvatar} className='rounded-circle' color='primary' width={100}  />
        <div className='text-center'>
          <h1 className='mb-1 text-white'>Congratulations {userData?.name}</h1>
          <CardText className='m-auto w-75'>
            You have done <strong>57.6%</strong> more sales today. Check your new badge in your profile.
          </CardText>
        </div>
      </CardBody>
    </Card>
  )
}

export default CardCongratulations
