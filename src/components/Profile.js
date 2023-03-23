import React from "react";
import { useParams } from 'react-router-dom';

const Profile = () => {
  const params = useParams();
  const { userId } = params;

  return <h1>Hello from User Profile {userId}!</h1>
}

export default Profile;