import React from 'react';
import { connect } from 'react-redux';
// import classnames from 'classnames';

import { setDocumentTitle } from '../../utils';
// import Actions from '../../actions/boards';
// import BoardCard from '../../components/boards/card';
// import BoardForm from '../../components/boards/form';

class HomeIndexView extends React.Component {
  componentDidMount() {
    setDocumentTitle('Boards')
  }

  render() {
    return (
      <div className="view-container boards index">
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  []
};

export default connect(mapStateToProps)(HomeIndexView);