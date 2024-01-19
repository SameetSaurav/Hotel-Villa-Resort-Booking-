import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BookingWidget from '../BookingWidget'
import PlaceImage from '../PlaceImage'
import PlaceGallery from '../PlaceGallery'

const PlacePage = () => {
    const { id } = useParams()
    const [place, setPlace] = useState(null)

    useEffect(() => {
        axios.get(`/places/${id}`).then(response => (
            setPlace(response.data)
        ))
    }, [id])

    if (!place) {
        return
    }

    return (
        <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
            <div className='text-3xl'>{place.title}</div>
            <a className="my-2 underline" target={'_blank'} href={`https://maps.google.com/?q=${place.address}`}>{place.address}</a>

            <PlaceGallery place={place}/> 

            <div className="mt-8 mb-8 gap-8 grid grid-cols-1 md:grid-cols-[2fr_1fr]">
                <div>
                    <div className="my-4">
                        <h2 className="font-semibold text-2xl">Description</h2>
                        {place.description}
                    </div>
                    check in: {place.checkIn} <br/>
                    check out: {place.checkOut} <br/>
                    Guests: {place.maxGuests}
                </div>
                <BookingWidget place={place}/> 
            </div>
            <div className="bg-white -mx-8 px=8 py-8 p-8 border-t">
                <h2 className="font-semibold text-2xl">Description</h2>
                <div className="mb-4 mt-1 text-sm text-gray-600 leading-4">{place.extraInfo}</div>
            </div>

        </div>
    )
}

export default PlacePage