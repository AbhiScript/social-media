import { useContext, useEffect, useState } from "react";
import { PostContext } from "./PostContext";
import { useNavigate } from "react-router-dom";

const usePostActions = () => {
  const { state, dispatch } = useContext(PostContext);
  const [posts, setPosts] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [userData, setUserData] = useState([]);
  const [formData, setFormData] = useState({
    image: null,
    title: "",
    caption: "",
  });
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const emailId = sessionStorage.getItem("userData");
    if (emailId) {
      const userData = JSON.parse(emailId);
      setUserData(userData);
      if (userData?.email) {
        dispatch({ type: "SET_USER_DATA", payload: userData });
      }
    }
  }, [dispatch]);

  useEffect(() => {
    if (state.userData?.email) {
      fetchUserPost(state.userData.email);
    }
  }, [state.userData?.email]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:7700/getAllPost");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPosts();
  }, []);

  const fetchUserPost = async (email) => {
    try {
      const response = await fetch(
        `http://localhost:7700/getUserPost?email=${email}`
      );
      if (!response.ok) throw new Error("Network response was not ok");
      const posts = await response.json();
      setUserPosts(posts);
    } catch (error) {
      console.log(error);
      setUserPosts([]);
    }
  };

  const handleShowModal = () => setShowModal(true);

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({ image: null, title: "", caption: "" });
  };

  const handleImageChange = (e) => {
    const { files } = e.target;
    setFormData({ ...formData, image: files[0] });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("image", formData.image);
    form.append("title", formData.title);
    form.append("caption", formData.caption);
    form.append("email", state.userData.email);
    try {
      const response = await fetch("http://localhost:7700/addCard", {
        method: "POST",
        body: form,
        credentials: "same-origin",
      });
      const data = await response.json();
      alert(data.message);
      handleCloseModal();
      if (state.userData.email) fetchUserPost(state.userData.email);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.setItem("token", "");
    sessionStorage.setItem("userData", "");
    navigate("/");
  };
  return {
    state,
    posts,
    userData,
    userPosts,
    handleShowModal,
    handleCloseModal,
    handleImageChange,
    handleInputChange,
    handleSubmit,
    showModal,
    formData,
    logout,
  };
};

export default usePostActions;
