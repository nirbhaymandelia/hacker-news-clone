import React from 'react';
import PropTypes from 'prop-types';
import BodyCopy from '../../core/BodyCopy/BodyCopy';

function CommentMeta({ commentCount, className }) {
  return (
    <div className={`sub-text ${className}`}>
      <BodyCopy type="secondary">{commentCount} comments</BodyCopy>
    </div>
  );
}

CommentMeta.propTypes = {
  commentCount: PropTypes.number.isRequired,
  className: PropTypes.string,
};

CommentMeta.defaultProps = {
  className: 'pb1 pl1 md-pb1',
};

export default CommentMeta;
