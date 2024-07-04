import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "./AppContext";

export function SignUpFormLogic() {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(AppContext);
  const { formData, errors } = state;

  const handleChange = (event) => {
    const { name, value } = event.targer;
    dispatch({ type: "SET_FORM_DATA", payload: { [name]: value } });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid";
    }
    if (!formData.password) newErrors.password = "Password is required";
    dispatch({ type: "SET_ERRORS", payload: newErrors });
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;
    try {
      const response = await fetch("http://localhost:7700/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log("Form is submitted");
        navigate("/");
      } else {
        const errorText = await response.text();
        console.log(errorText);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { formData, errors, handleChange, handleSubmit };
}
