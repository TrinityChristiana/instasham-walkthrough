import React from 'react';
import ProfileInfo from '../components/ProfileInfo';
import AppNavbar from '../components/Navbar';
import PostDetailsCard from '../components/PostDetailsCard';
import './App.scss';
import POSTJSON from '../sample_json/posts.json';
import USERJSON from '../sample_json/users.json';
import UserList from '../components/UsersList';
import PostGrid from '../components/PostGrid';

function App() {
  return (
    <>
      <div className='app-container'>
        <h2>UserList</h2>
        <UserList userList={Object.values(USERJSON)} />
        <h2>ProfileInfo</h2>
        <ProfileInfo postsCount={10} followerCount={10} followingCount={10} fullName='test' bio='asdasdasdasd' isUser={false} />
        <h2>PostDetailsCard</h2>
        <PostDetailsCard postInfo={Object.values(POSTJSON)[0]} />
        <h2>PostGrid</h2>
        <PostGrid posts={Object.values(POSTJSON)} />
      </div>
      <AppNavbar userInfo={{ username: 'asd' }} />
    </>
  );
}

export default App;
