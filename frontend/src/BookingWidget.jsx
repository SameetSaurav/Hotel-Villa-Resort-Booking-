import React, { useState } from 'react'
import {differenceInCalendarDays } from "date-fns"
import axios from "axios"
import { Navigate } from "react-router-dom";

const BookingWidget = ({place}) => {
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [numberOfGuests, setNumberOfGuests] = useState(1)
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [redirect, setRedirect] = useState('')

    let numberOfDays = 0;
    if(checkIn && checkOut){
        numberOfDays = differenceInCalendarDays(new Date(checkOut), new Date(checkIn))
    }

    async function bookThisPlace() {
        const data = {checkIn, checkOut, numberOfGuests, name, phone, place: place._id, price: numberOfDays * place.price}

        const response = await axios.post("/bookings", data)
        const bookingId = response.data._id
        setRedirect(`/account/bookings/${bookingId}`)
    }

    if(redirect){
        return <Navigate to={redirect}/>
    }

    return (
        <div>
            <div className="bg-white rounded-xl shadow p-4">
                <div className="text-2xl text-center">
                    price: ₹{place.price}/night
                </div>
                <div className="border rounded-2xl mt-4">
                    <div className="flex">
                        <div className="py-3 px-4">
                            <label>Check in:</label>
                            <input type="date" value={checkIn} onChange={ev => setCheckIn(ev.target.value)}/>
                        </div>
                        <div className="py-3 px-4 border-l">
                            <label>Check out:</label>
                            <input type="date" value={checkOut} onChange={ev => setCheckOut(ev.target.value)} />
                        </div>
                    </div>

                    {numberOfDays > 0 && (
                        <div>
                            <div className="py-3 px-4 border-t">
                                <label>Enter your name:</label>
                                <input type="text" value={name} onChange={ev => setName(ev.target.value)} />
                            </div>
                            <div className="py-3 px-4 border-t">
                                <label>Phone number: </label>
                                <input type="tel" value={phone} onChange={ev => setPhone(ev.target.value)} />
                            </div>
                        </div>
                    )}

                </div>
                <button onClick={bookThisPlace} className="primary mt-4">
                    Book at 
                    {numberOfDays > 0 && (
                        <span><b> ₹{numberOfDays * place.price}</b> for {numberOfDays} night</span>
                    )}
                    
                </button>
                
            </div>
        </div>
    )
}

export default BookingWidget