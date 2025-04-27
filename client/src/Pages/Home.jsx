import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css'; // Import Swiper's styles
import SwiperCore from 'swiper'; 
import { Navigation } from 'swiper/modules'; 
import ListingCard from '../Components/ListingCard';

export default function Home() {
  // Declare state for offer listings
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  // Initialize SwiperCore with the Navigation module
  SwiperCore.use([Navigation]);

  // Console log to check data being fetched
  // console.log(offerListings);

  // Fetch the listings once the component is mounted
  useEffect(() => {
    // Fetch offer listings
    const fetchOfferListings = async () => {
      try {
        const res = await fetch(`/api/listing/get?offer=true&limit=4`);
        const data = await res.json(); // Parse the JSON response
        setOfferListings(data);
        fetchSaleListings(); 
      } catch (error) {
        console.error(error); // Log any errors
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch(`/api/listing/get?type=sale&limit=4`);
        const data = await res.json(); // Parse the JSON response
        setSaleListings(data);
        fetchRentListings(); // Update state with the fetched data
      } catch (error) {
        console.error(error); // Log any errors
      }
    }

    const fetchRentListings = async () => {
      try {
        const res = await fetch(`/api/listing/get?type=rent&limit=4`);
        const data = await res.json(); // Parse the JSON response
        setRentListings(data); // Update state with the fetched data
      } catch (error) {
        console.error(error); // Log any errors
      }
    }

    // Start the fetching process
    fetchOfferListings();
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <div className='m-2'>
      {/* Top Section */}
      <div className='flex flex-col gap-6 p-30 px-15 max-w-6xl '>
        <h1 className='text-4xl lg:text-6xl font-bold'>
          Welcome to <span className='text-slate-600'>GayatriEstate</span>
          <br />
          See Real Dreams
        </h1>
        <div className='text-lg sm:text-sm'>
          All the properties you need in one place
          <br />
          Find your dream Home, Land & many more today!
        </div>
        <Link to={'/Search'} className='text-blue-500 text-xs sm:text-sm font-bold hover:underline'>
          Get Started...
        </Link>
      </div>

      {/* Swiper Slider for offer listings */}
      <div className="swiper-container">
        <Swiper
          navigation
          className="mySwiper"
        >
          {offerListings && offerListings.length > 0 ? (
            offerListings.map((listing) => (
              <SwiperSlide key={listing._id}>

                <div
                  style={{
                    background: `url(${listing.imageUrls[0]}) center no-repeat`,
                    backgroundSize: 'cover',
                    height: '500px',
                  }}
                ></div>
              </SwiperSlide>
            ))
          ) : (
            <p>No offers available at the moment</p>
          )}
        </Swiper>
      </div>


      <div className='max-w-6xl mx-auto  flex flex-col gap-8 my-10'>
         {
          offerListings && offerListings.length > 0 &&(
            <div className='my-3'>
              <div className=''>
                <h2 className='text-2xl font-semibold text-slate-800'>
                  Recent Offers
                </h2>
                <Link  className='text-sm text-blue-800 ' to={'/Search?offer=true'} >
                Show more 
                </Link>
              </div>
              <div className='flex flex-wrap gap-6 '>
                {offerListings.map((listing) => (
                  <ListingCard key={listing._id} listing={listing} />
                ))}
              </div>
            </div>
          )
         }

         {
          rentListings && rentListings.length > 0 &&(
            <div className='my-3'>
              <div className=''>
                <h2 className='text-2xl font-semibold text-slate-800'>
                  Recent Places for Rent
                </h2>
                <Link  className='text-sm text-blue-800 ' to={'/Search?type=rent'} >
                Show more 
                </Link>
              </div>
              <div className='flex flex-wrap gap-6 '>
                {rentListings.map((listing) => (
                  <ListingCard key={listing._id} listing={listing} />
                ))}
              </div>
            </div>
          )
         }


         {
          saleListings && saleListings.length > 0 &&(
            <div className='my-3'>
              <div className=''>
                <h2 className='text-2xl font-semibold text-slate-800'>
                  Recent Places for Sale
                </h2>
                <Link  className='text-sm text-blue-800 ' to={'/Search?type=sale'} >
                Show more 
                </Link>
              </div>
              <div className='flex flex-wrap gap-6 '>
                {saleListings.map((listing) => (
                  <ListingCard key={listing._id} listing={listing} />
                ))}
              </div>
            </div>
          )
         }
         {console.log( 's:', saleListings ,'r:', rentListings , 'o:',offerListings)}
      </div>
    </div>
  );
}
