import React from 'react';

const SubpagesLinks = props => (
<ul>
    <li>
      <a
        onClick={() => props.handlePageChange("Works")}
      >
        My Works
      </a>
    </li>
    <li>
      <a
        onClick={() => props.handlePageChange("Workspace")}
      >
        Workspace
      </a>
    </li>
    <li>
      <a
        onClick={() => props.handlePageChange("Profile Picture")}
      >
        Profile Picture
      </a>
    </li>

</ul>
);

export default SubpagesLinks;

