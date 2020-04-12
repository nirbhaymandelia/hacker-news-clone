import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

function Page({ children, className, title, metaContent }) {
  return (
    <main id="main" className={className}>
      <Helmet>
        <title>Hacker News | {title}</title>
        <meta name="description" content={metaContent} />
      </Helmet>
      {children}
    </main>
  );
}
Page.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  metaContent: PropTypes.string,
};

Page.defaultProps = {
  title: 'Top Stories',
  metaContent: 'Top stories from hacking and startups world',
  className: 'main',
};

export default Page;
