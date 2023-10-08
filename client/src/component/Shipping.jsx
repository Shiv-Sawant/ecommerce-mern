import React, { useEffect, useState } from 'react'
import PinDropIcon from "@material-ui/icons/PinDrop";
import HomeIcon from "@material-ui/icons/Home";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import PublicIcon from "@material-ui/icons/Public";
import PhoneIcon from "@material-ui/icons/Phone";
import { Country, State } from "country-state-city";
import { useSelector, useDispatch } from "react-redux";
import CheckoutSteps from './CheckoutSteps'
import { clearErrors, saveShipping } from '../featrues/productSlice';
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom'

const Shipping = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const alerts = useAlert()
  const data = useSelector((state) => {
    return state.app
  })

  const [Address, setAddress] = useState(data?.shipping?.Address)
  const [City, setCity] = useState(data?.shipping?.City)
  const [States, setState] = useState(data?.shipping?.State)
  const [Countrys, setCountry] = useState(data?.shipping?.Country)
  const [Pincode, setPincode] = useState(data?.shipping?.Pincode)
  const [PhoneNumber, setPhoneNumber] = useState(data?.shipping?.PhoneNumber)


  const handleShipping = (e) => {
    e.preventDefault()

    if (PhoneNumber.length < 10 || PhoneNumber.length > 10) {
      alerts.error('Please Check The Phone Number')
    }

    dispatch(saveShipping({
      Address: Address,
      City: City,
      State: States,
      Country: Countrys,
      Pincode: Pincode,
      PhoneNumber: PhoneNumber,
    }))

    navigate('/order/confirm')
  }

  useEffect(() => {
    if (data?.error != null) {
      dispatch(clearErrors())
    }
  }, [dispatch, PhoneNumber, alerts])

  return (
    <>
      <CheckoutSteps activeStep={0} />
      <div className='shippingcontainer'>

        <div>
          <h1>
            Shipping Details
          </h1>
        </div>

        <div>
          <form action="" className='shippingform'>

            <div>
              <HomeIcon />
              <input type="text" placeholder='Address' value={Address} onChange={(e) => setAddress(e.target.value)} />
            </div>

            <div>
              <LocationCityIcon />
              <input type="text" placeholder='City' value={City} onChange={(e) => setCity(e.target.value)} />
            </div>

            <div>
              <PinDropIcon />
              <input type="text" placeholder='Pincode' value={Pincode} onChange={(e) => setPincode(e.target.value)} />
            </div>

            <div>
              <PhoneIcon />
              <input type="text" placeholder='Phone Number' value={PhoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
            </div>

            <div>
              <PublicIcon />
              <select name="" id="" placeholder='Country' value={Countrys} onChange={(e) => setCountry(e.target.value)}>
                <option value="">--Country  --</option>
                {
                  Country && Country?.getAllCountries()?.map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))
                }
              </select>
            </div>

            {
              Countrys && (
                <div>
                  <PublicIcon />
                  <select name="" id="" placeholder='State' value={States} onChange={(e) => setState(e.target.value)}>
                    <option value="">--select--</option>
                    {
                      State && State.getStatesOfCountry(Countrys).map((item) => (
                        <option key={item.isoCode} value={item.isoCode}>
                          {item.name}
                        </option>
                      ))
                    }
                  </select>
                </div>
              )
            }



            <div>
              <button onClick={handleShipping}>Continue</button>
            </div>

          </form>
        </div>
      </div>
    </>
  )
}

export default Shipping