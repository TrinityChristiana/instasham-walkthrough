import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const UserListCard = ({ userInfo, onUserClick }) => (
  <Link
    onClick={onUserClick}
    to={`/sham/${userInfo.username}`}
  >
    <div className='user-list-card'>
      <div className='user-list-card-image' style={{ width: 100, height: 100, backgroundImage: `url(${userInfo.profileImage})` }}></div>
      <div className='user-list-card-text'>
        <div className='user-list-card-text-username'>{userInfo.username}</div>
        <div className='user-list-card-text-fullname'>{userInfo.fullName}</div>
      </div>
    </div>
  </Link>
);

UserListCard.propTypes = {
  userInfo: PropTypes.object,
  onUserClick: PropTypes.func
};

const UserList = ({ userList, onUserClick, emptyMessage }) => (
  <div className='user-list'>
    {userList.map((userInfo) => (
      <UserListCard
        key={userInfo.uid}
        onUserClick={onUserClick}
        userInfo={userInfo}
      />
    ))}
    {!userList.length && <h2 className='d-flex justify-content-center p-5'>{emptyMessage || 'There are no users with that name or username'} </h2>}
  </div>
);

UserList.propTypes = {
  userList: PropTypes.array,
  onUserClick: PropTypes.func,
  emptyMessage: PropTypes.string
};

export default UserList;
