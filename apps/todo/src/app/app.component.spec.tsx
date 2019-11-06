import React from 'react';
import { render } from '@testing-library/react';

import App from './app.component';

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<App />);

    expect(baseElement).toBeTruthy();
  });

  it('should have a greeting as the title', () => {
    const { getByText } = render(<App />);

    expect(getByText('Welcome to todo!')).toBeTruthy();
  });
});
