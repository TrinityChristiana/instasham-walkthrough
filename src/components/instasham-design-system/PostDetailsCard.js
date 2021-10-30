import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Heart, MoreHorizontal } from 'react-feather';
import { useHistory, useLocation } from 'react-router-dom';
import { ListGroup, ListGroupItem, UncontrolledPopover } from 'reactstrap';
import {
  heartPost,
  unheartPost,
  userLikesPost,
} from '../../helpers/heartHelper';
import { deletePost } from '../../helpers/postHelper';
import { getCurrentUsersUid, getUserByUid } from '../../helpers/userHelper';

const PostDetailCard = ({
  postInfo,
  withBorder = false,
  onUpdate = () => '',
}) => {
  const location = useLocation();
  const history = useHistory();

  const [postUserInfo, setPostUserInfo] = useState({});
  const [heartInfo, setHeartInfo] = useState(false);

  const goToProfile = () => {
    const profilePath = `/sham/${postUserInfo.username}`;
    if (location.pathname !== profilePath) {
      history.push(profilePath);
    }
  };

  const getHeartInfo = () => userLikesPost(postInfo.firebaseKey).then(setHeartInfo);

  const handleHeart = () => {
    if (heartInfo) {
      const info = heartInfo;
      setHeartInfo(false);
      if (info.hearted) {
        unheartPost(info.heartId).then(() => {
          getHeartInfo();
        });
      } else {
        heartPost(postInfo.firebaseKey).then(() => {
          getHeartInfo();
        });
      }
    }
  };

  useEffect(() => {
    if (postInfo.firebaseKey) {
      getUserByUid(postInfo.userId).then(setPostUserInfo);
      getHeartInfo();
    }
    // eslint-disable-next-line
  }, [postInfo]);

  return (
    <>
      <div
        id={postInfo.firebaseKey}
        className={`details-card ${
          withBorder ? 'details-card-withborder' : ''
        }`}
      >
        <div className="details-card-user">
          <UserInfo goToProfile={goToProfile} postUserInfo={postUserInfo} />
          <UserActions
            postInfo={postInfo}
            onUpdate={onUpdate}
            history={history}
          />
        </div>
        <div
          className="details-card-post-photo"
          style={{ backgroundImage: `url(${postInfo.photoUrl})` }}
        />
        <PostDetails
          handleClick={goToProfile}
          username={postUserInfo.username}
          postInfo={postInfo}
          heartInfo={heartInfo}
          handleHeart={handleHeart}
        />
      </div>
    </>
  );
};

PostDetailCard.propTypes = {
  postInfo: PropTypes.shape({
    firebaseKey: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    photoUrl: PropTypes.string.isRequired,
    datePublished: PropTypes.string.isRequired,
  }),
  withBorder: PropTypes.bool,
  onUpdate: PropTypes.func,
};

PostDetailCard.defaultProps = {
  postInfo: undefined,
  withBorder: false,
  onUpdate: () => '',
};

const UserInfo = ({ goToProfile, postUserInfo }) => (
  <div
    onClick={goToProfile}
    className="details-card-user-info"
    aria-hidden="true"
  >
    <div className="details-card-user-info-avatar-container">
      <div
        className="details-card-user-info-avatar"
        style={{ backgroundImage: `url(${postUserInfo.profileImage})` }}
      />
    </div>
    <div className="details-card-user-info-username">
      {postUserInfo.username}
    </div>
  </div>
);

UserInfo.propTypes = {
  goToProfile: PropTypes.func.isRequired,
  postUserInfo: PropTypes.shape({
    profileImage: PropTypes.string,
    username: PropTypes.string,
  }),
};

UserInfo.defaultProps = {
  postUserInfo: undefined,
};

const UserActions = ({ postInfo, history, onUpdate }) => {
  const handleDelete = () => {
    deletePost(postInfo.firebaseKey).then(() => onUpdate(postInfo.userId));
  };

  const handleEdit = () => {
    history.push(`/edit/${postInfo.firebaseKey}`);
  };

  return (
    <div className="details-card-user-actions">
      {postInfo.userId === getCurrentUsersUid() && (
        <>
          <MoreHorizontal
            id={`More--${postInfo.firebaseKey}`}
            className="as-link details-card-user-actions-icon"
          />{' '}
          <UncontrolledPopover
            trigger="focus"
            placement="bottom"
            target={`More--${postInfo.firebaseKey}`}
          >
            <ListGroup>
              <ListGroupItem onClick={handleEdit} className="as-link">
                Edit
              </ListGroupItem>
              <ListGroupItem
                onClick={handleDelete}
                className="as-link text-danger"
              >
                Delete
              </ListGroupItem>
            </ListGroup>
          </UncontrolledPopover>
        </>
      )}
    </div>
  );
};

UserActions.propTypes = {
  postInfo: PropTypes.shape({
    firebaseKey: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
  }),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  onUpdate: PropTypes.func,
};

UserActions.defaultProps = {
  onUpdate: undefined,
  postInfo: undefined,
};

const PostDetails = ({
  handleClick,
  username,
  postInfo,
  handleHeart,
  heartInfo,
}) => (
  <>
    <div className="details-card-post-info">
      <div className="details-card-post-info-heart">
        <Heart
          onClick={handleHeart}
          className={`details-card-post-info-heart-icon ${
            heartInfo.hearted ? 'hearted' : ''
          }`}
        />{' '}
        {`${heartInfo.total ?? '?'} like${heartInfo.total !== 1 ? 's' : ''}`}
      </div>
      <div className="details-card-post-info-time">
        {moment(postInfo.datePublished).local().fromNow()}
      </div>
    </div>
    <div className="details-card-post-text">
      <span
        onClick={handleClick}
        className="details-card-post-text-username"
        aria-hidden="true"
      >
        {username}
      </span>
      <span className="details-card-post-text-caption">{postInfo.caption}</span>
    </div>
  </>
);

PostDetails.propTypes = {
  heartInfo: PropTypes.oneOfType([
    PropTypes.shape({
      total: PropTypes.number.isRequired,
      hearted: PropTypes.bool.isRequired,
    }),
    PropTypes.bool,
  ]),
  postInfo: PropTypes.shape({
    datePublished: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
  }),
  username: PropTypes.string,
  handleClick: PropTypes.func,
  handleHeart: PropTypes.func.isRequired,
};

PostDetails.defaultProps = {
  handleClick: undefined,
  username: undefined,
  postInfo: undefined,
  heartInfo: undefined,
};

export default PostDetailCard;
