import React from 'react';
import store from "../store";

const SubProfileLinks = props => (
  <div>
    <p>
      <a
        onClick={() => props.handlePageChange("FriendList")}
      >
        <strong>See Friends List</strong>
      </a>
    </p>
    {props.id===store.getState().auth.user.id ?
    <p>
      <a
        onClick={() => props.handlePageChange("Change Picture")}
      >
        <strong>Change Picture</strong>
      </a>
    </p>
    :
    null}
  </div>
);

export default SubProfileLinks;

