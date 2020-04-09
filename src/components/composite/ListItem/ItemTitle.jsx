import React from 'react';
import PropTypes from 'prop-types';
import styles from './itemTitle.module.css';
import BodyCopy from '../../core/BodyCopy/BodyCopy';
import Link from '../../core/Link/Link';

function ItemTitle({ link, title, className }) {
  let fromSite = '';
  let site = '';
  if (link) {
    const siteUrl = new URL(link);
    site = siteUrl.host;
    fromSite = siteUrl.host;
    return (
      <div className={`title ${styles.itemTitle} ${className}`}>
        <Link href={link} variation="primary">
          {title}
        </Link>
        <BodyCopy type="secondary">
          {' ('}
          <Link href={fromSite} variation="secondary-small">
            {site}
          </Link>
          {') '}
        </BodyCopy>
      </div>
    );
  }
  return (
    <div className={`${styles.itemTitle} ${className}`}>
      <BodyCopy type="primary">{title}</BodyCopy>
    </div>
  );
}

ItemTitle.propTypes = {
  link: PropTypes.string,
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
};

ItemTitle.defaultProps = {
  link: '',
  className: '',
};

export default ItemTitle;
