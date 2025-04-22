import { useState , useEffect } from "react";
import { Link } from "react-router-dom";

export default function Contact({ listing }) {
    // const { userRef } = Listing;
    console.log(listing.name);
    const [landLord, setLandLord] = useState(null); 
    const [message, setMessage] = useState("");
    const onChange = (e) => {
      setMessage(e.target.value);
    };
    
    useEffect(() => {
      const fetchLandLord = async () => {
        if (!listing?.userRef) {
          console.warn("userRef is undefined or null.");
          return;
        }
        try {
          const res = await fetch(`/api/user/${listing.userRef}`);
          // console.log(res);
          const data = await res.json();
          setLandLord(data);
      }
        catch (error) {
          console.log(error);
        }
      };
        fetchLandLord();
    }, [listing.userRef]);
  return (  
    <>{ landLord && (
      <div className="flex flex-col gap-2">
        <p>Contact <span className="font-semibold">{landLord.username}</span> for <span className="font-semibold">{listing.name}</span> </p>
        <textarea name="message" id="message" rows={2} value={message} onChange={onChange} placeholder="write your message here..." className="  w-full border-2 border-slate-500  p-3 rounded-lg " ></textarea>
        <Link to={`mailto:${landLord.email}?subject=Regarding ${listing.name}&body=${message}`} className="bg-slate-700 text-white rounded-lg p-3 text-center hover:opacity-80"> Send Message</Link>
      </div>
    )  }</>
  )
}
