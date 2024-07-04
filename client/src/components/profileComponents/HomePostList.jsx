import PostCard from "./PostCard";
import usePostActions from "../../store/usePostActions";

const HomePostList = () => {
  const { posts } = usePostActions();
  return (
    <>
      <h3>Home</h3>
      <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
        {posts && posts.length > 0 ? (
          posts.map((post) => <PostCard key={post._id} post={post} />)
        ) : (
          <h2>No post cards have been posted....!!!</h2>
        )}
      </div>
    </>
  );
};

export default HomePostList;
