import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ListingCard from '../Components/ListingCard'

export default function Search() {
    const navigate = useNavigate();
    const [sidebardata, setSidebardata] = React.useState({
        searchTerm: "",
        type: "all",
        parking: false,
        furnished: false,
        offer: false,
        sort: "created_at",
        order: "desc",
    })

//   console.log(sidebardata);
    const [loading, setLoading] = React.useState(false);
    const [listings, setListings] = React.useState([]);
    const [showMore, setShowMore] = React.useState(false);
    // console.log(listings);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTermFromUrl = urlParams.get("searchTerm") ;
    const typeFromUrl = urlParams.get("type");
    const parkingFromUrl = urlParams.get("parking") ;
    const furnishedFromUrl = urlParams.get("furnished") ;
    const offerFromUrl = urlParams.get("offer");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order") ;

    if(searchTermFromUrl || typeFromUrl || parkingFromUrl || furnishedFromUrl || offerFromUrl || sortFromUrl || orderFromUrl){
        setSidebardata({
            searchTerm: searchTermFromUrl || "",
            type: typeFromUrl || "all",
            parking: parkingFromUrl === "true" || false,
            furnished: furnishedFromUrl === "true" || false,
            offer: offerFromUrl === "true" || false,
            sort: sortFromUrl || "created_at",
            order: orderFromUrl || "desc",
        });
    }

    const fetchListings = async () => {
        setLoading(true);
        const seearchQuery = urlParams.toString();
        const res = await fetch(`/api/listing/get?${seearchQuery}`);
        const data = await res.json();
        if(data.length >8 ){
            setShowMore(true);}
        else{
            setShowMore(false);
        }
        setListings(data);
        setLoading(false);

    }

    fetchListings();
    
  },[location.search] );

  const handleChange = (e) => {
    if(e.target.id === "all" || e.target.id === "sale" || e.target.id === "rent"){
        setSidebardata({...sidebardata, type: e.target.id})
    }

    if(e.target.id === "searchTerm"){
        setSidebardata({...sidebardata, searchTerm: e.target.value})
    }

    if(e.target.id === "parking" || e.target.id === "furnished" || e.target.id === "offer"){
        setSidebardata({...sidebardata , [e.target.id]: e.target.checked || e.target.checked === 'true' ? true : false});
    }

    if(e.target.id === "sort_order"){
        const sort = e.target.value.split("_")[0] || "created_at";
        const order = e.target.value.split("_")[1] || "desc";
        setSidebardata({...sidebardata, sort, order});
    };
        
  };

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams();
        urlParams.set("searchTerm", sidebardata.searchTerm);
        urlParams.set("type", sidebardata.type);
        urlParams.set("parking", sidebardata.parking);
        urlParams.set("furnished", sidebardata.furnished);
        urlParams.set("offer", sidebardata.offer);
        urlParams.set("sort", sidebardata.sort);
        urlParams.set("order", sidebardata.order);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    }
     
    const onShowMoreClick = async  () => {
        const numberOfListings = listings.length;
        const startIndex = numberOfListings;
        const urlParams = new URLSearchParams(location.search);
        urlParams.set("startIndex", startIndex);
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/listing/get?${searchQuery}`);
        const data = await res.json();
        if(data.length<9){
            setShowMore(false);
        }
        setListings([...listings, ...data]);

    }

  return (
    <div className='flex flex-col md:flex-row gap-2 md:min-h-screen'>
        <div className='p-7 border-b-2 md:border-r-2 border-slate-300'>
            <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
               <div className='flex items-center gap-2'>
               <label className='whitespace-nowrap font-semibold' >SearchTerm:</label>
               <input type="text" id='searchTerm' placeholder='Search...' 
               value={sidebardata.searchTerm} 
               onChange={handleChange}
               className='border rounded-lg  p-3 w-full bg-white border-slate-300 ' />
               </div>
               <div className='flex gap-3 items-center '>
                <label className='font-semibold'>Type:</label>
                <div className='flex gap-2'> 
                    <input type="checkbox" id='all' className='w-5 '
                    onChange={handleChange}
                    checked={sidebardata.type === "all"}
                    />
                    <span>Rent & Sale</span>
                </div>
                <div className='flex gap-2'> 
                    <input type="checkbox" id='sale'
                    onChange={handleChange}
                    checked={sidebardata.type === "sale"}
                    className='w-5 '/>
                    <span>Sale</span>
                </div>
                <div className='flex gap-2'> 
                    <input type="checkbox" id='rent' 
                    onChange={handleChange}
                    checked={sidebardata.type === "rent"}
                    className='w-5 '/>
                    <span>Rent</span>
                </div>
                <div className='flex gap-2'> 
                    <input type="checkbox" id='offer'
                    onChange={handleChange}
                    checked={sidebardata.offer}
                    className='w-5 '/>
                    <span>Offer</span>
                </div>

               </div>
               <div className='flex gap-3 flex-wrap items-center '>
                <label className='font-semibold'>Amenities:</label>
                <div className='flex gap-2'> 
                    <input type="checkbox" 
                    onChange={handleChange}
                    checked={sidebardata.parking}
                    id='parking' className='w-5 '/>
                    <span>Parking</span>
                </div>
                <div className='flex gap-2'> 
                    <input type="checkbox" 
                    onChange={handleChange}
                    checked={sidebardata.furnished}
                    id='furnished' className='w-5 '/>
                    <span>Furnished</span>
                </div>
                
               </div>
               <div className='flex gap-3 flex-wrap items-center '>

                <label className='font-semibold' >Sort :</label>
                <select id="sort_order" 
                onChange={handleChange}
                defaultValue={'created_at_desc'}
                className='border border-slate-300 rounded-lg bg- p-2 bg-white '>
                    <option value='regularPrice_desc'>Price high to low</option>
                    <option value='regularPrice_asc'>Price low to high</option>
                    <option
                    value='createdAt_desc'>Oldest First</option>
                    <option
                    value='createdAt_asc'>Newest First</option>
                </select>
               </div>
               <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-80'>Search</button>
            </form>
        </div>
        <div className='flex-1'>
            <h1 className='text-2xl font-semibold  p-3 text-slate-700  mt-5 '>Listing Results:</h1>
            <div className='p-6  flex flex-wrap gap-6'>{!loading && listings.length === 0 && (<p className='text-xl text-slate-800'>Listing Not Found!</p>)}
            {
                loading && (<p className='text-xl text-slate-800 text-center w-full '>Loading...</p>)
            }
            {!loading && listings && listings.map((listing) =>(
                <ListingCard key={listing._id} 
                listing={listing}/>
                
            ))}

            {showMore && (
                <button onClick={() => {onShowMoreClick();}} className=' text-green-700   p-3 text-center w-full  hover:underline'>Show More</button>
            )}
            
            
            </div>
        </div>
    </div>
  )
}