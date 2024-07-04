import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "./AppContext";

export function useFormLogic() {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(AppContext);
  const { formData, errors, token } = state;
  const userData = state.userData;

  useEffect(() => {
    // Fetch token from local storage and set it in the state
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      dispatch({ type: "SET_TOKEN", payload: savedToken });
    }

    // Fetch user data from session storage and set it in the state
    const savedUserData = sessionStorage.getItem("userData");
    if (savedUserData) {
      dispatch({ type: "SET_USER_DATA", payload: JSON.parse(savedUserData) });
    }
  }, [dispatch]);

  useEffect(() => {
    // If token exists, make a GET request to set the token
    async function setToken() {
      if (token) {
        try {
          await fetch("http://localhost:7700/login/setToken", {
            method: "GET",
            headers: {
              Authorization: `${token}`,
            },
          });
        } catch (error) {
          console.log(error);
        }
      }
    }
    setToken();
  }, [token]);

  // Handle form input changes and dispatch an action to update form data
  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch({ type: "SET_FORM_DATA", payload: { [name]: value } });
  };

  // Validate the form data and set any validation errors in the state
  const validate = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid";
    }
    if (!formData.password) newErrors.password = "Password is required";
    dispatch({ type: "SET_ERRORS", payload: newErrors });
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    try {
      const response = await fetch("http://localhost:7700/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        // Save token and user data to local storage and session storage
        localStorage.setItem("token", data.token);
        sessionStorage.setItem("userData", JSON.stringify(data.fetchedData));
        // Dispatch actions to update state with token and user data
        dispatch({ type: "SET_TOKEN", payload: data.token });
        dispatch({ type: "SET_USER_DATA", payload: data.fetchedData });
        // Navigate to the profile page after successful login
        navigate("/profilePage");
      } else {
        const errorText = await response.text();
        alert(errorText);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { formData, errors, handleChange, handleSubmit, userData };
}
