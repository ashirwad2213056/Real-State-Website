

import { signInFailure, signInStart, signInSuccess } from "../redux/User/userSlice";

export const handleSignInChange = (e, formData, setFormData) => {
  setFormData({
    ...formData,
    [e.target.id]: e.target.value,
  });
};

export const handleSignInSubmit = async (e, formData, dispatch, navigate) => {
  e.preventDefault();
  try {
    dispatch(signInStart());

    const res = await fetch("/api/auth/signin", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.success === false) {
      dispatch(signInFailure(data.message));
      return;
    }

    dispatch(signInSuccess(data));
    navigate("/");
  } catch (error) {
    dispatch(signInFailure(error.message));
  }
};
