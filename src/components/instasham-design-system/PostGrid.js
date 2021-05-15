import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';

const PostGrid = ({ posts }) => {
  const history = useHistory();

  return (
    <div className='post-grid'>
      {posts.map((post) => (
        <div
          key={post.firebaseKey}
          className='post-grid-square'
          style={{ backgroundImage: `url(${post.photoUrl})` }}
          onClick={() => history.push(`/posts/${post.firebaseKey}`)}>
        </div>
      ))}
    </div>
  );
};

PostGrid.propTypes = {
  posts: PropTypes.array.isRequired
};

export default PostGrid;
