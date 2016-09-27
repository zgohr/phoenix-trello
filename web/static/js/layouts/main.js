import React from 'react';

export default class MainLayout extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}