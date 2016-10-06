import Constants from '../constants';

const initialState = {
  connectedUsers: [],
  channel: null,
  fetching: true,
};

export default function reducer(state = initialState, action = {}) {
  switch(action.type) {
    case Constants.CURRENT_BOARD_FETCHING:
      return { ...state, fetching: true };

    case Constants.CURRENT_BOARD_CONNECTED_USERS:
      return { ...state, connectedUsers: action.users };

    case Constants.BOARDS_SET_CURRENT_BOARD:
      return { ...state, fetching: false, ...action.board };

    case Constants.CURRENT_BOARD_CONNECTED_TO_CHANNEL:
      return { ...state, channel: action.channel };

    case Constants.CURRENT_BOARD_MEMBER_ADDED:
      const { members } = state;
      members.push(action.user);
      return { ...state, members: members, showUsersForm: false };

    default:
      return state;
  }
}