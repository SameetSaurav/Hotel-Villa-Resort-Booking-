import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"

export default function IndexPage() {
  const [places, setPlaces] = useState([])
  useEffect(() => {
    axios.get("/places").then(response => {
      setPlaces(response.data)
    }
    )
  
  }, [])

  return (
    <div className="mt-8 gap-x-6 gap-y-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
      {places.length > 0 && places.map(place => (
        <Link to={'/place/'+place._id} key={place._id}>
          <div  >
            <div className="bg-gray-500 flex rounded-2xl mb-2">
              {place?.photos[0] && (
                <img className="rounded-2xl object-cover aspect-square w-full" src={place.photos[0]} alt="" />
              )}
            </div>

            <h3 className="font-bold leading-4">
              {place.address}
            </h3>
            <div className="text-sm truncate leading-5 text-gray-500">
              {place.title}
            </div>
            <div className="mt-1">
              <span className="font-bold"> ₹{place.price} </span> per night
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}