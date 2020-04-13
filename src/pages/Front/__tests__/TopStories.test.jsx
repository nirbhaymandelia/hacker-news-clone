/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import renderer from 'react-test-renderer';
import { StaticRouter } from 'react-router';
import TopStories from '../TopStories';

describe('TopStories.jsx', () => {
  it('renders correctly', () => {
    const props = {
      items: [],
      fetchTopStories: () => {},
      loader: false,
      current: 0,
      total: 10,
      match: { params: {} },
    };
    const tree = renderer.create(
      <StaticRouter location="someLocation">
        <TopStories {...props} />
      </StaticRouter>
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
