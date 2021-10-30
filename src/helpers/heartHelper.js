const userLikesPost = (postId) => new Promise((resolve) => {
  // TODO: get whether or not current user likes post based on postId
  const likes = Math.floor(Math.random() * 1000);
  resolve({
    heartId: `${postId}randomtest`, // Firebase key of relationship if hearted
    total: likes, // How many hearts post has total
    hearted: !!(likes % 2), // boolean on if current user likes post
  });
});

const heartPost = (postID) => new Promise((resolve) => {
  // TODO: Heart Post using passed in postID
  resolve({ postID });
});

const unheartPost = (firebaseKey) => new Promise((resolve) => {
  // TODO: Delete relationship
  resolve({ firebaseKey });
});

export {
  heartPost,
  unheartPost,
  userLikesPost,
};
