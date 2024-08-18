// ** Custom Components
import Avatar from '@components/avatar'

// ** Icons Imports
import { Calendar, MapPin } from 'react-feather'

// ** Reactstrap Imports
import { Card, CardTitle, CardBody, CardText } from 'reactstrap'

// ** Images Imports
import illustration from '@src/assets/images/illustration/pricing-Illustration.svg'
import moment from "moment";

const CardMeetup = () => {

  return (
    <Card className='card-developer-meetup'>
      <div className='meetup-img-wrapper rounded-top text-center'>
        <img src={illustration} height='250' />
      </div>
      <CardBody>
        <div className='meetup-header d-flex align-items-center'>
          <div className="meetup-day">
            <h6 className="mb-0">{moment().format("ddd").toUpperCase()}</h6>
            <h3 className="mb-0">{moment().format("D")}</h3>
          </div>
          <div className="my-auto">
            <CardTitle tag="h4" className="mb-25">
              Your Reservations
            </CardTitle>
            <CardText className='mb-0'>Let's Enjoy Favorite Restaurant Experience.</CardText>
          </div>
        </div>
        <div className='d-flex'>
          <Avatar color='light-primary' className='rounded me-1' icon={<Calendar size={18} />} />
          <div>
            <h6 className='mb-0'>Sat, May 25, 2020</h6>
            <small>10:AM to 6:PM</small>
          </div>
        </div>
        <div className='d-flex mt-2'>
          <Avatar color='light-primary' className='rounded me-1' icon={<MapPin size={18} />} />
          <div>
            <h6 className='mb-0'>Central Park</h6>
            <small>Manhattan, New york City</small>
          </div>
        </div>
        <div className='d-flex mt-2'>
          <Avatar color='light-primary' className='rounded me-1' icon={<MapPin size={18} />} />
          <div>
            <h6 className='mb-0'>Central Park</h6>
            <small>Manhattan, New york City</small>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

export default CardMeetup
