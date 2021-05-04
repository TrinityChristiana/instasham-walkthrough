import React from 'react';
import { X } from 'react-feather';
import { Modal } from 'reactstrap';
import PropTypes from 'prop-types';
import UserList from './UsersList';

const UserListModal = ({
  headingText,
  userList,
  showModal,
  closeUserListModal,
  emptyMessage
}) => (
  <div>
    <Modal
      isOpen={showModal}
      toggle={closeUserListModal}
    >
      <div className='d-flex justify-content-end p-2'>
        <X
          onClick={closeUserListModal}
          style={{ cursor: 'pointer' }}
        />
      </div>
      <div>
        <h2 className='d-flex justify-content-center '>{headingText}</h2>
        <UserList
          emptyMessage={emptyMessage}
          onUserClick={closeUserListModal}
          userList={userList}
        />
      </div>
    </Modal>
  </div>
);

UserListModal.propTypes = {
  headingText: PropTypes.string,
  emptyMessage: PropTypes.string,
  userList: PropTypes.array.isRequired,
  showModal: PropTypes.bool.isRequired,
  closeUserListModal: PropTypes.func
};

export default UserListModal;
