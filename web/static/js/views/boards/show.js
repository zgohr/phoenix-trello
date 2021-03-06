import React, { PropTypes } from 'react';
import { connect }  from 'react-redux';

import Actions from '../../actions/current_board';
import Constants from '../../constants';
import { setDocumentTitle } from '../../utils';
import BoardMembers from '../../components/boards/members';

class BoardsShowView extends React.Component {
  componentDidMount() {
    const { socket } = this.props;

    if (!socket) {
      return false;
    }

    this.props.dispatch(Actions.connectToChannel(socket, this.props.params.id));
  }

  componentWillUpdate(nextProps, nextState) {
    const { socket } = this.props;
    const { currentBoard } = nextProps;

    if (currentBoard.name !== undefined) setDocumentTitle(currentBoard.name);

    if (socket) {
      return false;
    }

    this.props.dispatch(Actions.connectToChannel(nextProps.socket, this.props.params.id));
  }

  componentWillUnmount() {
    const { dispatch, currentBoard } = this.props;

    this.props.dispatch(Actions.leaveChannel(currentBoard.channel));
  }

  _renderMembers() {
    const { connectedUsers, showUsersForm, channel, error } = this.props.currentBoard;
    const { dispatch } = this.props;
    const members = this.props.currentBoard.members;
    const currentUserIsOwner = this.props.currentBoard.user.id === this.props.currentUser.id;

    return (
      <BoardMembers
        dispatch={dispatch}
        channel={channel}
        currentUserIsOwner={currentUserIsOwner}
        members={members}
        connectedUsers={connectedUsers}
        error={error}
        show={showUsersForm}
      />
    );
  }

  render() {
    const { fetching, name } = this.props.currentBoard;

    if (fetching) return (
      <div className="view-container boards show">
        <i className="fa fa-spinner fa-spin" />
      </div>
    );

    return (
      <div className="view-container boards show">
        <header className="view-header">
          <h3>{name}</h3>
          {::this._renderMembers()}
        </header>
        <div className="canvas-wrapper">
          <div className="canvas">
            <div className="lists-wrapper">
              TODO
            </div>
          </div>
        </div>
        {this.props.children}
      </div>
    )

  }
}

const mapStateToProps = (state) => ({
  currentBoard: state.currentBoard,
  socket: state.session.socket,
  currentUser: state.session.currentUser,
});

export default connect(mapStateToProps)(BoardsShowView);