import * as actionType from './types';
import streams from '../apis/streams';

export const signIn = userId => {
  return {
    type: actionType.SIGN_IN,
    payload: userId
  };
};
export const signOut = () => {
  return {
    type: actionType.SIGN_OUT
  };
};

export const createStream = formValues => async (dispach, getState) => {
  const { userId } = getState().auth;
  const response = await streams.post('/', { ...formValues, userId });
  return dispach({
    type: actionType.CREATE_STREAM,
    payload: response.data
  });
};
export const fetchStream = id => async dispach => {
  const response = await streams.get(`/${id}`);
  return dispach({ type: actionType.FETCH_STREAM, payload: response.data });
};
export const editStream = (id, formValues) => async dispach => {
  const response = await streams.patch(`/${id}`, formValues);
  console.log(response);
  return dispach({ type: actionType.EDIT_STREAM, payload: response.data });
};
export const deleteStream = id => async dispach => {
  await streams.delete(`/${id}`);
  return dispach({ type: actionType.DELETE_STREAM, payload: id });
};
export const fetchStreams = () => async dispach => {
  const response = await streams.get('/');
  //console.log(response);
  return dispach({ type: actionType.FETCH_STREAMS, payload: response.data });
};
