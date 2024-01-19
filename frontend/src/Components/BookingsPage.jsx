import React, { useEffect, useState } from 'react'
import axios from "axios"
import AccountNav from "../AccountNav.jsx"
import PlaceImage from '../PlaceImage.jsx'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'

const BookingsPage = () => {
  const [bookings, setBookings] = useState([])

  useEffect(() => {
    axios.get('/bookings').then(response => {
      setBookings(response.data)
    })
  }, [])
  
  return (
    <div>
      <AccountNav/>
      
      {bookings?.length > 0 && bookings.map(booking => (
        <Link to={`/account/bookings/${booking.id}`} className="flex gap-4 bg-gray-200 rounded-xl overflow-hidden">
          <div className="w-48">
            <PlaceImage place={booking.place}/>
          </div>
          <div className="p-3">
            <h2 className="text-xl">{booking.place.title}</h2>
            <div>
              { format( new Date(booking.checkIn), 'yyyy-MM-dd') } to { format( new Date(booking.checkOut), 'yyyy-MM-dd') }
            </div>
            <div> 
              Total Price: ₹{booking.price}
            </div>
          </div>

        </Link>
      ))}
    </div>
  )
}

export default BookingsPage