import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { useSelector } from "react-redux";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css/bundle";
import Contact from "../Components/Contact";
import { FaBath, FaBed, FaChair, FaMapMarkerAlt, FaParking } from "react-icons/fa";

export default function Listing() {
  SwiperCore.use([Navigation, Pagination]);
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [contact , setContact] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        // console.log(data);

        if (data.success === false) {
          setError(true);
          setLoading(false);
          setError(false);
          console.log(data.message);
          return;
        }
        setListing(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchListing();
  }, [params.listingId]);

  return (
    <main className="  mx-auto">
      {loading && (
        <p className="text-center  my-7 font-medium text-2xl">Loading...</p>
      )}
      {listing && !loading && !error && (
        <div className="">
          <Swiper
            navigation
            pagination={{ clickable: true }}
            className="w-full mt"
          >
            {listing.imageUrls?.map((imageUrl, index) => (
              <SwiperSlide key={index}>
                <div
                  className="h-[500px] w-full"
                  style={{
                    backgroundImage: `url("${imageUrl}")`,
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="flex flex-col gap-3 max-w-7xl mx-auto p-3 ">

            <p className="text-2xl font-semibold ">
              {listing.name || "N/A"} - ${" "}
              {listing.offer
                ? listing.discountedPrice?.toLocaleString('en-US') || "N/A"
                : listing.regularPrice?.toLocaleString('en-US') || "N/A"}
              {listing.type === "rent" && "/ month"}
            </p>

            <p className=" flex items-center mt-3 gap-2 text-slate-600 my-1  font-semibold ">
              <FaMapMarkerAlt className="text-green-700" />
              {listing.address || "Address not available"}
            </p>

            <div className="flex gap-3" >
              <p className=" bg-red-800 w-full max-w-[200px] text-white p-1 rounded-md text-center" >
                {listing.type === "rent" ? "For Rent" : " For Sale"}
              </p>

              {listing.offer ? (
                <p className=" bg-green-800 w-full max-w-[200px] text-white p-1 rounded-md text-center">${+listing.regularPrice - +listing.discountedPrice} OFF</p>
              ) : `No offer available` }
              {/* <p>{console.log('listing.offer:', listing.offer)}</p> */}


            </div>
            <p className="text-slate-800">
            <span className="font-semibold text-black ">Description - {' '}</span>
             {listing.description}</p>

             <ul className="text-green-800 font-semibold text-sm flex flex-wrap gap-6 mt-4">
              <li className="flex items-center gap-2 whitespace-nowrap ">
                <FaBed className="text-lg" /> 
                {listing.bedroom > 1 ? `${listing.bedroom || 0} Bedrooms` : `${listing.bedroom || 0} Bedroom`}
              </li>
              <li className="flex items-center gap-2 whitespace-nowrap ">
                <FaBath className="text-lg" /> 
                {listing.bathroom > 1 ? `${listing.bathroom || 0} Bathrooms` : `${listing.bathroom || 0} Bathroom`}
              </li>
              <li className="flex items-center gap-2 whitespace-nowrap ">
                <FaParking className="text-lg" /> 
                {listing.parking  ? 'Parking' : 'No Parking'}
              </li>
              <li className="flex items-center gap-2 whitespace-nowrap ">
                <FaChair className="text-lg" /> 
                {listing.furnished ? 'Furnished' : 'Not Furnished'}
              </li>
             </ul>

             {currentUser && listing.userRef !== currentUser._id && !contact && (
                <button onClick={() => setContact(true)} className="bg-slate-800 text-white p-3  uppercase rounded-lg hover:opacity-80 ">Contact Landlord</button>
             ) }
             {contact && <Contact listing ={listing} />}
          </div>
        </div>
      )}
    </main>
  );
}
