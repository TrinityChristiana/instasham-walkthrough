import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Loader } from 'react-feather';
import { useHistory } from 'react-router-dom';
import { Button } from 'reactstrap';
import {
  followUser,
  getFollowersByUid,
  getFollowingByUid,
  getIsFollowing,
  unfollowUser
} from '../helpers/relationshipHelper';
import { getCurrentUsersUid } from '../helpers/userHelper';
import UserListModal from './UserListModal';

const ProfileInfo = ({
  onUpdate,
  postsCount,
  followerCount,
  followingCount,
  profileImage,
  fullName,
  bio,
  isUser,
  uid,
}) => {
  const history = useHistory();

  const [showModal, setShowModal] = useState(false);
  const [userList, setUserList] = useState([]);
  const [isFollowingUser, setIsFollowingUser] = useState(null);

  const isLoggedInUser = getCurrentUsersUid() === uid;

  // Opens modal with followers
  const openFollowersModal = () => followerCount
    && getFollowersByUid(uid).then((followers) => {
      setUserList(followers);
      setShowModal(true);
    });

  // Opens modal with following
  const openFollowingModal = () => followingCount
    && getFollowingByUid(uid).then((following) => {
      setUserList(following);
      setShowModal(true);
    });

  const closeUserListModal = () => {
    setShowModal(false);
    setUserList([]);
  };

  useEffect(() => {
    // Makes sure modal is closed if going to another profile from user modal
    closeUserListModal();
    // When this componsnt unmounts, the user modal will close
    return () => closeUserListModal();
  }, []);

  useEffect(() => {
    // Checks to see if current user's following state has changes
    getIsFollowing(uid).then(setIsFollowingUser);
  }, [uid, followerCount, followingCount]);

  // Handles following and unfollowing user
  const handleFollowing = (startFollowingUser = true) => {
    // This tells component to load the loader
    setIsFollowingUser(null);
    if (startFollowingUser) {
      followUser(uid).then(onUpdate);
    } else {
      unfollowUser(isFollowingUser).then(onUpdate);
    }
  };

  const InfoButton = () => {
    let text = '';
    let onClick = () => '';

    if (isUser) {
      // If current user is looking at their profile
      text = 'Settings';
      onClick = () => history.push('/settings');
    } else if (isFollowingUser !== null) {
      if (isFollowingUser) {
        text = 'Unfollow';
        onClick = () => handleFollowing(false);
      } else {
        text = 'Follow';
        onClick = () => handleFollowing();
      }
    } else {
      // If component is still checking to see the following state
      text = <Loader />;
    }

    return (
      <Button
        onClick={onClick}
        className='profile-info-button'
      >
        {text}
      </Button>
    );
  };

  return (
    <div className='profile-info'>
      <UserListModal
        headingText={`People ${isLoggedInUser ? 'You' : fullName} Follow${isLoggedInUser ? '' : 's'}`}
        closeUserListModal={closeUserListModal}
        emptyMessage='No Users fit this criteria'
        userList={userList}
        showModal={showModal}
      />
      <div className='profile-info-visuals'>
        <div className='profile-info-visuals-photo-container'>
          <div
            style={{
              backgroundImage: `url(${profileImage || 'https://redzonekickboxing.com/wp-content/uploads/2017/04/default-image.jpg'})`
            }}
            className='profile-info-visuals-photo'
          ></div>
        </div>
        <div className='profile-info-visuals-counts'>
          <div className='profile-info-visuals-counts-posts'>
            <div>{postsCount}</div> <div className='profile-info-visuals-counts-text'>Posts</div>
          </div>
          <div className='profile-info-visuals-counts-followers '>
            <div>{followerCount}</div>{' '}
            <div className='profile-info-visuals-counts-text'>
              {' '}
              <span
                className='as-link'
                onClick={openFollowersModal}
              >
                Followers
              </span>
            </div>
          </div>
          <div className='profile-info-visuals-counts-following'>
            <div>{followingCount}</div>{' '}
            <div className='profile-info-visuals-counts-text'>
              <span
                className='as-link'
                onClick={openFollowingModal}
              >
                Following
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className='profile-info-description'>
        <div className='profile-info-description-name'>{fullName}</div>
        <div className='profile-info-description-bio'>{bio}</div>
      </div>
      <div className='profile-info-button-container'>
        <InfoButton />
      </div>
    </div>
  );
};

ProfileInfo.propTypes = {
  onUpdate: PropTypes.func,
  postsCount: PropTypes.number,
  followerCount: PropTypes.number,
  followingCount: PropTypes.number,
  profileImage: PropTypes.number,
  fullName: PropTypes.string,
  bio: PropTypes.string,
  isUser: PropTypes.bool,
  uid: PropTypes.number,
};

export default ProfileInfo;
