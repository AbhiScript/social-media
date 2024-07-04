import { useContext } from "react";
import { AppContext } from "./AppContext"; // Use named import

// Define the useFormLogic custom hook
export function useFormLogic() {
  const { state, dispatch } = useContext(AppContext); // Get state and dispatch from context
  const { formData, errors } = state;

  // Handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch({ type: "SET_FORM_DATA", payload: { [name]: value } });
  };

  // Validate form inputs
  const validate = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    dispatch({ type: "SET_ERRORS", payload: newErrors });
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      // Simulate an async operation like form submission
      setTimeout(() => {
        alert(JSON.stringify(formData, null, 2));
      }, 400);
    }
  };

  return { formData, errors, handleChange, handleSubmit };
}
