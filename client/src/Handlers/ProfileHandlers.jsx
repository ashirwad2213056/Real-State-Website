// handlers/profileHandlers.js

import { app } from "../firebase.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserFailure,
  signOutUserStart,
  signOutUserSuccess,
} from "../redux/User/userSlice.js";

// All useState definitions
export const initialStates = {
  file: undefined,
  filePercent: 0,
  fileUploadError: false,
  formData: {},
  updateSuccess: false,
  showListingError: false,
  userListings: [],
};

// Handle file upload
export const handleFileUpload = async (file, setFilePercent, setFileUploadError, setFormData, formData) => {
  const storage = getStorage(app);
  const fileName = new Date().getTime() + file.name;
  const storageRef = ref(storage, fileName);
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setFilePercent(Math.round(progress));
    },
    () => {
      setFileUploadError(true);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setFormData({ ...formData, avatar: downloadURL });
      });
    }
  );
};

// Handle form submission (profile update)
export const handleSubmit = async (e, formData, currentUser, dispatch, setUpdateSuccess) => {
  e.preventDefault();
  if (!currentUser || !currentUser._id) return;

  try {
    dispatch(updateUserStart());
    const res = await fetch(`/api/user/update/${currentUser._id}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (data.success === false) {
      dispatch(updateUserFailure(data.message));
      return;
    }
    dispatch(updateUserSuccess(data));
    setUpdateSuccess(true);
  } catch (error) {
    dispatch(updateUserFailure(error.message));
  }
};

// Handle delete user
export const handleDeleteUser = async (currentUser, dispatch, navigate) => {
  // if (!currentUser || !currentUser._id) return;
  try {
    dispatch(deleteUserStart());
    const res = await fetch(`/api/user/delete/${currentUser._id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (data.success === false) {
      dispatch(deleteUserFailure(data.message));
      return;
    }
    dispatch(deleteUserSuccess(data));
    navigate("/sign-in");
  } catch (error) {
    dispatch(deleteUserFailure(error.message));
  }
};

// Handle sign out
export const handleSignOut = async (dispatch, navigate) => {
  try {
    dispatch(signOutUserStart());
    const res = await fetch("/api/auth/signout", {});
    const data = await res.json();
    if (data.success === false) {
      dispatch(signOutUserFailure(data.message));
      return;
    }
    dispatch(signOutUserSuccess(data));
    navigate("/sign-in");
  } catch (error) {
    dispatch(signOutUserFailure(error.message));
  }
};

// Handle showing user listings
export const handleShowListing = async (currentUser, setShowListingError, setUserListings) => {
  // if (!currentUser || !currentUser._id) return;
  try {
    setShowListingError(false);
    const res = await fetch(`/api/user/listings/${currentUser._id}`);
    const data = await res.json();
    if (data.success === false) {
      setShowListingError(data.message);
      return;
    }
    setUserListings(data);
  } catch (error) {
    setShowListingError(true);
  }
};

// Handle delete a specific listing
export const handleDeleteListing = async (listingId, setUserListings) => {
  try {
    const res = await fetch(`/api/listing/delete/${listingId}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (data.success === false) {
      console.log(data.message);
      return;
    }
    setUserListings((prev) => prev.filter((listing) => listing._id !== listingId));
  } catch (error) {
    console.log("Error deleting listing:", error);
  }
};


