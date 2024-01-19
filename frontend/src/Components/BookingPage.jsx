import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PlaceGallery from '../PlaceGallery'
import { differenceInCalendarDays, format } from 'date-fns'

const BookingPage = () => {
    const { id } = useParams()
    const [booking, setBooking] = useState(null)

    useEffect(() => {
        if (id) {

            axios.get('/bookings').then(response => {
                const foundBooking = response.data.find(({ _id }) => _id === id)
                if (foundBooking) {
                    setBooking(foundBooking)
                }
            })
        }
    }, [id])

    if (!booking) {
        return;
    }


    return (
        <div>
            <div className="my-8">
                <h1 className="text-3xl">{booking.place.title}</h1>
                {console.log(booking)}
                <a className="my-2 underline" target={'_blank'} href={`https://maps.google.com/?q=${booking.place.address}`}>{booking.place.address}</a>

                <div className="bg-gray-200 p-6 my-6 rounded-2xl flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl mb-4">Your booking information:</h2>
                        <div className="flex gap-8">
                            <div>
                                Booked by: <i><b>{booking.name}</b></i> <br/>
                                Contact: {booking.phone}
                            </div>
                            <div>
                                Check In: <b> {  format( new Date(booking.checkIn), 'yyyy-MM-dd') }</b> <br />
                                Check Out: <b> { format( new Date(booking.checkOut), 'yyyy-MM-dd') }</b>
                            </div>
                            <div>
                                Booked for: <b>{differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))} nights </b> 

                            </div>
                        </div>
                        
                    </div>
                    <div className="bg-primary p-6 text-white rounded-2xl">
                        <div>Total price</div>
                        <div className="text-3xl">${booking.price}</div>
                    </div>
                </div>
                <PlaceGallery place={booking.place} />
            </div>
        </div>
    )
}

export default BookingPage