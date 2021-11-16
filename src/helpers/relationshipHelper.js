const getFollowersByUid = (uid) => new Promise((resolve) => {
  // TODO: Get array of all the followers based on uid
  console.warn(uid);
  resolve([]);
});

const getFollowingByUid = (uid) => new Promise((resolve) => {
  // TODO: Get array of all the following based on uid
  console.warn(uid);
  resolve([]);
});

const getIsFollowing = (userId) => new Promise((resolve) => {
  // TODO: Should return firebaseKey of relationship if current user follows userId and false if not
  console.warn(userId);
  resolve(!!(Math.floor(Math.random() * 2) % 2));
});

const unfollowUser = (relationshipId) => new Promise((resolve) => {
  // TODO: unfollow user based on relationshipId
  resolve(relationshipId);
});

const followUser = (userId) => new Promise((resolve) => {
  // TODO: Create relationship based on passed in userId
  resolve({ userId });
});

export {
  getFollowersByUid,
  getFollowingByUid,
  getIsFollowing,
  unfollowUser,
  followUser,
};
