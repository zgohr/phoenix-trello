import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import ReactGravatar from 'react-gravatar';
import PageClick from 'react-page-click';
import { push } from 'react-router-redux';

import SessionActions from '../actions/sessions';
import HeaderActions from '../actions/header';

class Header extends React.Component {
  _handleBoardsClick(e) {
    e.preventDefault();

    const { dispatch } = this.props;
    const { ownedBoards } = this.props.boards;

    if (ownedBoards.length != 0) {
      dispatch(HeaderActions.showBoards(true));
    } else {
      dispatch(push('/'));
    }
  }

  _renderBoards() {
    const { dispatch, currentBoard, socket, header } = this.props;

    if (!header.showBoards) return false;

    const { ownedBoards } = this.props.boards;

    // TODO
  }

  _renderCurrentUser() {
    const { currentUser } = this.props;

    if (!currentUser) {
      return false;
    }

    const fullName = [currentUser.first_name, currentUser.last_name].join(' ');

    return (
      <a className="current-user">
        <ReactGravatar email={currentUser.email} https /> {fullName}
      </a>
    );
  }

  _renderSignOutLink() {
    if (!this.props.currentUser) {
      return false;
    }

    return (
      <a href="#" onClick={::this._handleSignOutClick}><i className="fa fa-sign-out" /> Sign out</a>
    )
  }

  _handleSignOutClick(e) {
    e.preventDefault();
    this.props.dispatch(SessionActions.signOut());
  }

  render() {
    return (
      <header className="main-header">
        <nav id="boards_nav">
          <ul>
            <li>
              <a href="#" onClick={::this._handleBoardsClick}><i className="fa fa-columns"/> Boards</a>
              {::this._renderBoards()}
            </li>
          </ul>
        </nav>
        <Link to='/'>
          <span className='logo'/>
        </Link>
        <nav className="right">
          <ul>
            <li>
              {this._renderCurrentUser()}
            </li>
            <li>
              {this._renderSignOutLink()}
            </li>
          </ul>
        </nav>
      </header>
    )
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.session.currentUser,
  socket: state.session.socket,
  boards: state.boards,
  currentBoard: state.currentBoard,
  header: state.header,
});

export default connect(mapStateToProps)(Header);