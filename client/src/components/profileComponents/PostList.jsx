import React from "react";
import styles from "../../styles/CenterButton.module.css";
import classNames from "classnames";
import HomePostList from "./HomePostList";
import PostCard from "./PostCard";
import Profile from "./Profile";
import usePostActions from "../../store/usePostActions";
import { useState } from "react";
import postListStyles from "../../styles/PostList.module.css";

const PostList = () => {
  const {
    userPosts,
    userData,
    handleShowModal,
    handleCloseModal,
    handleImageChange,
    handleInputChange,
    handleSubmit,
    showModal,
    formData,
    state,
  } = usePostActions();

  const [showPost, setShowPost] = useState("home");

  const showHome = () => setShowPost("home");
  const showYourPost = () => setShowPost("yourPost");
  const showProfile = () => setShowPost("profile");

  return (
    <div>
      <div className="btn-group" role="group" aria-label="Navigation buttons">
        <button type="button" className="btn btn-primary" onClick={showHome}>
          <i className="bi bi-house-door-fill"></i> Home
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={showYourPost}
        >
          <i className="bi bi-file-earmark-post-fill"></i> Your Posts
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={showProfile}
        >
          <i className="bi bi-person-circle"></i> Profile
        </button>
      </div>

      <div className={postListStyles.fullHeight}>
        {showPost === "home" ? (
          <HomePostList />
        ) : showPost === "yourPost" ? (
          <>
            <h3>Your Posts</h3>
            <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
              {userPosts && userPosts.length > 0 ? (
                userPosts.map((post) => <PostCard key={post._id} post={post} />)
              ) : (
                <h2>You have not posted any cards...</h2>
              )}
            </div>
            <div className={styles["center-container"]}>
              <button
                type="button"
                className={classNames(
                  "btn",
                  "btn-outline-primary",
                  styles["center-button"]
                )}
                onClick={handleShowModal}
              >
                Add new Card
              </button>
            </div>
          </>
        ) : showPost === "profile" ? (
          <Profile key={userData._id} userData={userData} />
        ) : null}
        {showModal && (
          <>
            <div
              className="modal fade show d-block"
              tabIndex="-1"
              role="dialog"
            >
              <div
                className="modal-dialog modal-dialog-scrollable"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="createPostModal">
                      Create Post
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={handleCloseModal}
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label htmlFor="imageUpload" className="form-label">
                          Upload Image
                        </label>
                        <input
                          type="file"
                          className="form-control"
                          id="imageUpload"
                          onChange={handleImageChange}
                        />
                        {formData.image && (
                          <img
                            src={URL.createObjectURL(formData.image)}
                            alt="Preview"
                            className="img-thumbnail mt-3"
                          />
                        )}
                      </div>
                      <div className="mb-3">
                        <label htmlFor="title" className="form-label">
                          Title
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="title"
                          name="title"
                          value={formData.title}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="caption" className="form-label">
                          Write Caption
                        </label>
                        <textarea
                          className="form-control"
                          id="caption"
                          name="caption"
                          rows="3"
                          value={formData.caption}
                          onChange={handleInputChange}
                        ></textarea>
                      </div>
                      <div className="mb-3">
                        <small className="text-muted">
                          Posted By : {state.userData?.name || "Unknown User"}
                        </small>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={handleCloseModal}
                        >
                          Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">
                          Post
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="modal-backdrop fade show"
              onClick={handleCloseModal}
            ></div>
          </>
        )}
      </div>
    </div>
  );
};

export default PostList;
