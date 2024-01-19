import React from 'react'

const PlaceImage = ({place}) => {
    return (
        <div>
            <div>
                {place.photos[0] && (
                    <div>
                        <img className="aspect-square object-cover" src={place.photos[0]} alt="" />
                    </div>
                )}
            </div>
        </div>
    )
}

export default PlaceImage