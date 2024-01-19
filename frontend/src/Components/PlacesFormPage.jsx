import React,{useEffect, useState} from 'react'

import Perks from "../Perks"
import PhotosUploader from "../PhotosUploader"
import axios from "axios"
import AccountNav from '../AccountNav'
import { Navigate, useParams } from 'react-router-dom'

const PlacesFormPage = () => {
    const {id} = useParams()

    const [title, setTitle] = useState('')
    const [address, setAddress] = useState('')
    const [addedPhotos, setAddedPhotos] = useState([])
    const [description, setDescription] = useState('')
    const [perks, setPerks] = useState([])
    const [extraInfo, setExtraInfo] = useState('')
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [maxGuests, setMaxGuests] = useState(1)
    const [price, setPrice] = useState(100)
    const [redirect, setRedirect] = useState(false)

    useEffect(() => {
      if(!id){
        return
      }
      axios.get('/places/'+id).then(response => {
        const {data} = response

        setTitle(data?.title)
        setAddress(data?.address)
        setAddedPhotos(data?.photos)
        setDescription(data?.description)
        setPerks(data?.perks)
        setExtraInfo(data?.extraInfo)
        setCheckIn(data?.checkIn)
        setCheckOut(data?.checkOut)
        setMaxGuests(data?.maxGuests)
        setPrice(data?.price)
      })
    }, [id])
    

    async function savePlace (ev){
        ev.preventDefault()

        const placeData = {title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price}

        if(id){
            //update
            await axios.put('/places', {id, ...placeData})
            setRedirect(true)

        }else{
            //new Place
            await axios.post('/places', placeData)
            setRedirect(true)
        }
    }

    if(redirect){
        return <Navigate to={"/account/places"}/>
    }

    return (
        <div>
            <AccountNav />

            <form onSubmit={savePlace}>
                <h2 className="text-xl mt-4">Title</h2>
                <input type="text" placeholder="Name of place" value={title} onChange={ev => setTitle(ev.target.value)} />

                <h2 className="text-xl mt-4">Address</h2>
                <input type="text" placeholder="Address" value={address} onChange={ev => setAddress(ev.target.value)} />

                <h2 className="text-xl mt-4">Photos</h2>
                <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

                <h2 className="text-xl mt-4">Description</h2>
                <textarea value={description} onChange={ev => setDescription(ev.target.value)} />

                <h2 className="text-xl mt-4">Perks</h2>
                <Perks selected={perks} onChange={setPerks} />

                <h2 className="text-xl mt-4">Add Extra Information</h2>
                <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)} />

                <h2 className="text-xl mt-4">Check in & checkout time</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <div>
                        <h3 className="mt-2 -mb-1">Check in</h3>
                        <input type="text" placeholder="14:00" value={checkIn} onChange={ev => setCheckIn(ev.target.value)} />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Check out</h3>
                        <input type="text" placeholder="14:00" value={checkOut} onChange={ev => setCheckOut(ev.target.value)} />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Guests</h3>
                        <input type="number" value={maxGuests} onChange={ev => setMaxGuests(ev.target.value)} />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Price per night</h3>
                        <input type="number" value={price} onChange={ev => setPrice(ev.target.value)} />
                    </div>
                </div>

                <button className="primary my-2">Save</button>
            </form>
        </div>
    )
}

export default PlacesFormPage