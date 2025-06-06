import React from 'react'
import { Link } from 'react-router-dom'
import { MdLocationOn } from 'react-icons/md'

export default function ListingCard({listing}) {
    // console.log(listing._id)
  return (
    <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px] '>
        <Link to ={`/listing/${listing._id}`}>
        <img src={listing.imageUrls[0] || "https://api.oneworld.id/uploads/Real_Estate_i_Stock_edited_aae30f2583.jpg"} alt="Listing Cover" className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300' />
        </Link>
        <div className='p-3 flex flex-col gap-2 w-full'>
            <p className='text-lg font-semibold text-slate-800 truncate'>{listing.name}
            </p>
            <div className='flex items-center gap-2 '>
            <MdLocationOn className='h-4 w-4 text-green-700 '/>
            <p className='text-sm text-gray-600 truncate '>{listing.address}</p>
            </div>

              <p className='text-sm text-gray-700 line-clamp-2 '>{listing.description}</p>


              <p className='text-slate-600 font-semibold '>
                ${listing.offer ? listing.discountedPrice.toLocaleString('en-US') : listing.regularPrice.toLocaleString('en-US')}

                {listing.type === 'rent' && ' / month'}
              </p>

              <div className='flex gap-2 text-slate-600'>
                <p className='font-bold text-sm '>{listing.bedroom>1 ? `${listing.bedroom} beds` : `${listing.bedroom} bed`}</p>
                <p className='font-bold text-sm '>{listing.bedroom>1 ? `${listing.bathroom} bathrooms` : `${listing.bathroom} bathroom`}</p>
              </div>

        </div>
    </div>
    
  )
}
