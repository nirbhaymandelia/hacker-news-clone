import React from 'react';
import PropTypes from 'prop-types';

function Vote({ voteLink }) {
  return (
    <div valign="top" className="votelinks">
      <center>
        <a id="up_22808208" href={voteLink}>
          <div className="votearrow" title="upvote" />
        </a>
      </center>
    </div>
  );
}

Vote.propTypes = {
  voteLink: PropTypes.string.isRequired,
};

export default Vote;
