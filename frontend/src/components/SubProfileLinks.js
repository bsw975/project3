import React from 'react';

const SubProfileLinks = props => (
  <div>
    <p>
      <a
        onClick={() => props.handlePageChange("FriendList")}
      >
        <strong>See Friends List</strong>
      </a>
    </p>
    <p>
      <a
        onClick={() => props.handlePageChange("Change Picture")}
      >
        <strong>Change Picture</strong>
      </a>
    </p>
  </div>
);

export default SubProfileLinks;

