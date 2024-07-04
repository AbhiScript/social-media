import PropTypes from "prop-types";
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";

function PostCard({ post }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const handleCardClick = () => {
    setSelectedPost(post);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPost(null);
  };

  const imageURL = post.image.startsWith("/assets/")
    ? `http://localhost:7700${post.image}`
    : post.image;

  return (
    <>
      <div className="col" onClick={handleCardClick}>
        <div className="card h-100">
          <img
            src={imageURL}
            className="card-img-top"
            alt={post.title || "Image"}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/assets/default-image.png"; // Fallback image
            }}
          />
          <div className="card-body">
            <h5 className="card-title">{post.title}</h5>
          </div>
        </div>
      </div>

      {selectedPost && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedPost.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img
              src={imageURL}
              className="img-fluid"
              alt={selectedPost.title || "Image"}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/assets/default-image.png"; // Fallback image
              }}
            />
            <h5 className="mt-3">
              Posted By: {selectedPost.email || "Unknown"}
            </h5>
            <p>{selectedPost.caption}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}

PostCard.propTypes = {
  post: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    email: PropTypes.string,
    caption: PropTypes.string,
  }).isRequired,
};

export default PostCard;
