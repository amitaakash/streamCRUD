import * as actionType from '../actions/types';
const INIT_STATE = {
  streams: [],
  stream: null
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case actionType.CREATE_STREAM:
      return { ...state, stream: action.payload };

    case actionType.FETCH_STREAM:
      return { ...state, stream: action.payload };

    case actionType.EDIT_STREAM:
      return { ...state, stream: action.payload };

    case actionType.DELETE_STREAM:
      const filteredStreams = state.streams.filter(
        stream => stream.id !== action.payload
      );
      return { ...state, streams: filteredStreams };
    case actionType.FETCH_STREAMS:
      return { ...state, streams: action.payload };

    default:
      return state;
  }
};
