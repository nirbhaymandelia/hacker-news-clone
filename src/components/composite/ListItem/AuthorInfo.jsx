import React from 'react';
import PropTypes from 'prop-types';
import BodyCopy from '../../core/BodyCopy/BodyCopy';
import Link from '../../core/Link/Link';

function AuthorInfo({ author, className }) {
  return (
    <div className={`${className}`}>
      <BodyCopy type="secondary">by </BodyCopy>
      <Link variation="primary-small" href={`\\from?author=${author}`}>
        {author}
      </Link>
    </div>
  );
}

AuthorInfo.propTypes = {
  author: PropTypes.string.isRequired,
  className: PropTypes.string,
};

AuthorInfo.defaultProps = {
  className: 'pl1 pb1 md-pt1',
};

export default AuthorInfo;
