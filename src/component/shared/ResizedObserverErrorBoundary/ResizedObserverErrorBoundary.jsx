import { Component } from 'react';

export class ResizeObserverErrorBoundary extends Component {
  componentDidCatch(error, info) {
    if (error.message === 'ResizeObserver loop completed with undelivered notifications.') {
      // Prevent the error from propagating
      console.warn('Suppressed ResizeObserver error');
    } else {
      // Rethrow other errors
      throw error;
    }
  }

  render() {
    return this.props.children;
  }
}

