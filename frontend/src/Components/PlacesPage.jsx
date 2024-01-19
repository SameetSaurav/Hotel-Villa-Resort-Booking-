import { Link, Navigate, useParams } from "react-router-dom"
import AccountNav from "../AccountNav"
import { useEffect, useState } from "react"
import axios from 'axios'

const PlacesPage = () => {
    const [places, setPlaces] = useState([])

    useEffect(() => {
        axios.get('/user-places').then(({ data }) => {
            setPlaces(data)
        })
    }, [])


    return (
        <div>
            <AccountNav />
            <div className="text-center ">
                <Link to="/account/places/new" className="inline-flex bg-primary px-3 py-2 rounded-full text-white gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    Add new places
                </Link>
            </div>
            <div>
                {places.length > 0 && places.map(place => (
                    <Link to={'/account/places/'+place._id} key={place._id} className="flex p-4 rounded-2xl bg-gray-100 gap-4">
                        <div className="flex w-32 h-32 bg-gray-300 grow">
                            {place.photos.length > 0 && (
                                <img className="object-cover" src={place.photos[0]} alt="" />
                                
                            )}
                        </div>
                        <div className="grow-0 shrink">
                            <h2 className="text-xl">{place.title}</h2>
                            <p className="text-sm mt-2">{place.description} Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore illo sint eius suscipit esse explicabo recusandae, quam repudiandae ab. Quo doloribus quod deserunt placeat, esse alias quidem ab quaerat eveniet dolorem vel maiores aperiam sed repellat saepe reprehenderit molestias excepturi.</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default PlacesPage