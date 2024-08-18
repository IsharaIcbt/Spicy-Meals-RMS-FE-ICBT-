// ** React Imports
import { Fragment } from 'react'

// ** Reactstrap Imports
import { Label } from 'reactstrap'

// ** Third Party Components
import Flatpickr from 'react-flatpickr'
import moment from "moment"

const PickerDefault = ({ value, onChange }) => {
  return (
    <Fragment>
      <Flatpickr
        className='form-control'
        value={value}
        onChange={date => onChange(date[0])}
        placeholder={moment(new Date()).format("YYYY-MM-DD")}
        id='default-picker'
      />
    </Fragment>
  )
}

export default PickerDefault
