import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  initialStates,
  handleFileUpload,
  handleSubmit,
  handleDeleteUser,
  handleSignOut,
  handleShowListing,
  handleDeleteListing,
} from "../Handlers/ProfileHandlers";

export default function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [file, setFile] = useState(initialStates.file);
  const [filepercent, setFilePercent] = useState(initialStates.filePercent);
  const [fileUploadError, setFileUploadError] = useState(
    initialStates.fileUploadError
  );
  const [formData, setFormData] = useState(initialStates.formData);
  const [updateSuccess, setUpdateSuccess] = useState(
    initialStates.updateSuccess
  );
  const [showListingError, setShowListingError] = useState(
    initialStates.showListingError
  );
  const [userListings, setUserListings] = useState(initialStates.userListings);

  const fileRef = useRef(null);

  useEffect(() => {
    if (file) {
      handleFileUpload(
        file,
        setFilePercent,
        setFileUploadError,
        setFormData,
        formData
      );
    }
  }, [file]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form
        onSubmit={(e) =>
          handleSubmit(e, formData, currentUser, dispatch, setUpdateSuccess)
        }
        className="flex flex-col gap-5"
      >
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser?.avatar || ""}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center"
        />
        <p className="text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-700">
              Error Image Upload (image must be less than 2mb)
            </span>
          ) : filepercent > 0 && filepercent < 100 ? (
            <span className="text-green-700">Uploading {filepercent}%</span>
          ) : filepercent === 100 ? (
            <span className="text-green-700">Successfully Uploaded</span>
          ) : (
            ""
          )}
        </p>

        <input
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser?.username}
          onChange={handleChange}
          className="bg-white border border-slate-400 rounded-lg p-3"
        />
        <input
          type="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser?.email}
          onChange={handleChange}
          className="bg-white border border-slate-400 rounded-lg p-3"
        />
        <input
          type="text"
          id="password"
          placeholder="password"
          onChange={handleChange}
          className="bg-white border border-slate-400 rounded-lg p-3"
        />

        <button
          disabled={loading}
          className="bg-slate-800 text-white p-3 rounded-lg uppercase hover:opacity-80 disabled:opacity-60"
        >
          {loading ? "Loading..." : "update"}
        </button>
        <Link
          className="bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-80"
          to="/create-listing"
        >
          Create Listing
        </Link>
      </form>

      <div className="flex justify-between mt-5 font-medium">
        <span
          onClick={() => handleDeleteUser(currentUser, dispatch, navigate)}
          className="text-red-600 cursor-pointer"
        >
          Delete Account
        </span>
        <span
          onClick={() => handleSignOut(dispatch, navigate)}
          className="text-red-600 cursor-pointer"
        >
          Sign Out
        </span>
      </div>

      <p className="text-red-700 mt-5">{error}</p>
      <p className="text-green-700 mt-5">
        {updateSuccess ? "User updated successfully" : ""}
      </p>

      <button
        onClick={() =>
          handleShowListing(currentUser, setShowListingError, setUserListings)
        }
        type="button"
        className="text-green-700 w-full text-center"
      >
        Show Listings
      </button>
      <p>{showListingError ? "Error when Showing Listing" : ""}</p>

      {userListings && userListings.length > 0 && (
        <div className="flex flex-col gap-3 mt-6">
          <h1 className="text-2xl font-semibold text-center my-5">
            My Listings
          </h1>
          {userListings.map((listing) => (
            <div
              key={listing._id}
              className="border rounded-lg p-3 flex justify-between items-center border-slate-300 my-3 gap-3"
            >
              <Link to={`/listing/${listing._id}`}>
                <img
                  src={listing.imageUrls[0]}
                  alt="listing cover"
                  className="h-21 w-21 object-contain"
                />
              </Link>
              <Link
                className="flex-1 text-slate-700 font-semibold hover:underline truncate"
                to={`/listing/${listing._id}`}
              >
                <p>{listing.name}</p>
              </Link>
              <div className="flex flex-col gap-3">
                <button
                  onClick={() =>
                    handleDeleteListing(listing._id, setUserListings)
                  }
                  className="text-red-700 uppercase"
                >
                  Delete
                </button>
                <Link to={`/update-listing/${listing._id}`}> 
                <button className="text-green-700 uppercase">Edit</button> </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
