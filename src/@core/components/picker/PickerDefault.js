// ** React Imports
import { Fragment, useState } from 'react'

// ** Reactstrap Imports
import { Label } from 'reactstrap'

// ** Third Party Components
import Flatpickr from 'react-flatpickr'
import moment from "moment"

const PickerDefault = ({value, onchange}) => {


  return (
    <Fragment>
      <Flatpickr
        className='form-control'
        value={value}
        onChange={date => onchange(date[0])}
        placeholder={moment(new Date()).format("YYYY-MM-DD")}
        id='default-picker'
      />
    </Fragment>
  )
}

export default PickerDefault
