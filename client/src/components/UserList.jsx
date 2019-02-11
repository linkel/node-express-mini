import React from 'react';

const UserList = props => {
    return (
        <div className="user-list">
            {props.users.map(user => {
                return (
                <div className="user" key={user.id}>{user.id} {user.name} {user.bio}</div>
            )})}
        </div>
    )
}

export default UserList;