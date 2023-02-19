import { render, screen } from '@testing-library/react';
import { ReactAuth } from '.';

describe('<ReactAuth/>', () => {
  it('render', async () => {
    render(<ReactAuth>Hello</ReactAuth>);

    const elem = await screen.findByText('Hello');

    expect(elem.className).toBe('ReactAuth');
  });
});
