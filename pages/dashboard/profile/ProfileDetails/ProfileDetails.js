import React from 'react';
import CardWrapper, { Avatar, Info } from './ProfileDetails.style';

const ProfileDetails = ({ className, avatar, email, firstName, lastName }) => {
  return (
    <CardWrapper className={`avatar-card ${className ? className : ''}`}>
      {firstName || lastName || email ? (
        <Info className="info">
          {(firstName || lastName) && <h3 className="name">{firstName} {lastName}</h3>}
          {email && <p className="username">{email}</p>}
        </Info>
      ) : (
        ''
      )}
    </CardWrapper>
  );
};

export default ProfileDetails;
