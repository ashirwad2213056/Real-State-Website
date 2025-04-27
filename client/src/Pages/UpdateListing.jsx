import React, { useState , useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate , useParams } from "react-router-dom";
import {
  handleChange,
  handleImageSubmit,
  handleRemoveImage,
  handleSubmit,

} from "../Handlers/CreateListingHandler.jsx";

export default function CreateListing() {
  const [images, setImages] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();
  const paramas = useParams();
  const { currentUser } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedroom: 1,
    bathroom: 1,
    regularPrice: 50,
    discountedPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });

  useEffect(() => {
    const fetchListing = async () => {
      const listingId = paramas.listingId;
      const res = await fetch(`/api/listing/get/${listingId}`);
      const data = await res.json();
      setFormData(data);
      if (data.success === false) {
        console.log(data.message);
        return;
      }
    };
    fetchListing();
  }, []);

  return (
    <main className="p-3 max-w-3xl mx-auto">
      <h1 className="text-center my-7 font-semibold text-3xl">
        Update Listing
      </h1>

      <form
        onSubmit={(e) =>
          handleSubmit({
            e,
            formData,
            currentUser,
            setError,
            setLoading,
            navigate,
            apiUrl: `/api/listing/update/${paramas.listingId}`,
          })
        }
        className="flex flex-col sm:flex-row gap-6"
      >
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            className="border border-slate-300 bg-white p-3 rounded-lg hover:bg-gray-50"
            id="name"
            maxLength={60}
            minLength={8}
            required
            placeholder="Name"
            onChange={(e) => handleChange(e, formData, setFormData)}
            value={formData.name}
          />

          <textarea
            className="border border-slate-300 bg-white p-3 rounded-lg hover:bg-gray-50"
            id="description"
            required
            placeholder="Description"
            onChange={(e) => handleChange(e, formData, setFormData)}
            value={formData.description}
          />

          <input
            type="text"
            className="border border-slate-300 bg-white p-3 rounded-lg hover:bg-gray-50"
            id="address"
            required
            placeholder="Address"
            onChange={(e) => handleChange(e, formData, setFormData)}
            value={formData.address}
          />

          <div className="flex gap-8 flex-wrap">
            <div className="flex gap-2">
              <input
                onChange={(e) => handleChange(e, formData, setFormData)}
                checked={formData.type === "sale"}
                type="checkbox"
                id="sale"
                className="w-5"
              />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input
                onChange={(e) => handleChange(e, formData, setFormData)}
                checked={formData.type === "rent"}
                type="checkbox"
                id="rent"
                className="w-5"
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                onChange={(e) => handleChange(e, formData, setFormData)}
                checked={formData.parking}
                type="checkbox"
                id="parking"
                className="w-5"
              />
              <span>Parking</span>
            </div>
            <div className="flex gap-2">
              <input
                onChange={(e) => handleChange(e, formData, setFormData)}
                checked={formData.furnished}
                type="checkbox"
                id="furnished"
                className="w-5"
              />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input
                onChange={(e) => handleChange(e, formData, setFormData)}
                checked={formData.offer}
                type="checkbox"
                id="offer"
                className="w-5"
              />
              <span>Offers</span>
            </div>
          </div>

          <div className="flex gap-8 flex-wrap">
            <div className="flex gap-2 items-center">
              <input
                className="bg-white p-3 border border-gray-300 rounded-lg hover:bg-gray-50"
                type="number"
                id="bedroom"
                min={1}
                max={10}
                required
                onChange={(e) => handleChange(e, formData, setFormData)}
                value={formData.bedroom}
              />
              <p>Beds</p>
            </div>

            <div className="flex gap-2 items-center">
              <input
                className="bg-white p-3 border border-gray-300 rounded-lg hover:bg-gray-50"
                type="number"
                id="bathroom"
                min={1}
                max={10}
                required
                onChange={(e) => handleChange(e, formData, setFormData)}
                value={formData.bathroom}
              />
              <p>Baths</p>
            </div>

            <div className="flex gap-2 items-center">
              <input
                className="hover:bg-gray-50 bg-white p-3 border border-gray-300 rounded-lg"
                type="number"
                id="regularPrice"
                min={50}
                max={1000000000}
                required
                onChange={(e) => handleChange(e, formData, setFormData)}
                value={formData.regularPrice}
              />
              <div>
                <p>Regular Price</p>
                <span>($ / month)</span>
              </div>
            </div>

            {formData.offer && (
              <div className="flex gap-2 items-center">
                <input
                  className="hover:bg-gray-50 bg-white p-3 border border-gray-300 rounded-lg"
                  type="number"
                  id="discountedPrice"
                  min={0}
                  max={1000000000}
                  required
                  onChange={(e) => handleChange(e, formData, setFormData)}
                  value={formData.discountedPrice}
                />
                <div>
                  <p>Discounted Price</p>
                  <span>($ / month)</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gray-600 ml-2">
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className="flex flex-wrap w-full  gap-6">
            <input
              onChange={(e) => setImages(e.target.files)}
              className="bg-white hover:bg-gray-50 p-3 border rounded-lg border-gray-300"
              id="images"
              accept="image/*"
              multiple
              type="file"
            />
            <button
              type="button"
              disabled={uploading}
              className="border border-green-600 uppercase hover:shadow-lg p-3 text-green-600 rounded-lg disabled:opacity-60"
              onClick={() =>
                handleImageSubmit({
                  images,
                  formData,
                  setFormData,
                  setUploading,
                  setImageUploadError,
                })
              }
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
          {imageUploadError && (
            <p className="text-red-600">{imageUploadError}</p>
          )}

          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={url}
                className="flex justify-between p-4 border items-center border-gray-300 rounded-lg"
              >
                <img
                  src={url}
                  alt="listing image"
                  className="w-40 h-40 object-contain rounded-lg"
                />
                <button
                  onClick={() =>
                    handleRemoveImage(formData, index, setFormData)
                  }
                  type="button"
                  className="text-red-700 uppercase px-4 py-1 bg-red-50 rounded-sm border"
                >
                  Delete
                </button>
              </div>
            ))}

          <button
            disabled={loading || uploading}
            className="bg-slate-700 p-3 text-white rounded-lg uppercase hover:opacity-80 disabled:opacity-60"
          >
            {loading ? "Updating..." : "Update Listing"}
          </button>

          {error && <p className="text-red-700 text-sm">{error}</p>}
        </div>
      </form>
    </main>
  );
}
