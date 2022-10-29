// Node Modules
import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
// Utilities
import Auth from '../utils/auth';
import { QUERY_USERS, QUERY_USER, QUERY_ME } from '../utils/queries';
// Components
import UserList from '../components/UserList';
import Highscores from '../components/Highscores';

const Profile = () => {
  const { id } = useParams();

  // Get current user
  const { loading, data, error } = useQuery(id ? QUERY_USER : QUERY_ME, {
    variables: { id },
  });

  // Get a list of all users
  const { usersLoading, data: usersData } = useQuery(QUERY_USERS);

  const user = data?.me || data?.user || {};
  console.log("HERE IS THE USER DATA: ", user);
  const users = usersData?.users || [];

  if (error) console.log(error);

  // redirect to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data._id === id) {
    return <Navigate to="/me" replace />;
  }

  if (loading) {
    return <h4>Loading...</h4>;
  }

  if (!user?.username) {
    return (
      <h4 className='mt-5'>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  const renderUserList = () => {
    if (usersLoading) return null;
    // Only renders users who's profile we're not currently viewing
    const notMeUsers = users.filter(o => o._id !== user._id);
    return <UserList users={notMeUsers} title="User List" />;
  };

  const renderCurrentUserInfo = () => {
    if (id) return null;

    return (

      <div className="container mt-4">
        <div className="row d-flex justify-content-center">
          <ul className="d-flex flex-column align-items-center list-unstyled shadow-lg p-3 mb-5 bg-body rounded" style={{"width": "50%", background: "linear-gradient(0deg, rgba(5,188,224,1) 3%, rgba(131,75,21,1) 79%)" }}>
          <li style={{fontSize: 22, color: "#FAD6A5"}}>USERNAME</li>
          <p style={{fontSize: 22, color: "#FAD6A5"}}>{user.username}</p>
          <li style={{fontSize: 22, color: "#FAD6A5"}}>EMAIL</li>
          <p style={{fontSize: 22, color: "#FAD6A5"}}>{user.email}</p>
         
          {/* linear-gradient(0deg, rgba(5,221,224,1) 20%, rgba(253,187,45,1) 95%) #062C30*/}
          
        </ul>
        </div>
        
      </div>

    );
  }

  return (
    <div>
      <div className="mt-4">
        <h2 className="text-center" style={{color: "#874e16"}}>
          Viewing {id ? `${user.username}'s` : 'your'} profile.
        </h2>
        {renderCurrentUserInfo()}
        {/* {renderUserList()} */}
        {user.highscores?.length > 0 && <Highscores highscores={user.highscores} />}
      </div>
    </div>
  );
};

export default Profile;
