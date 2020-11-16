import * as actionTypes from '../../constants/ActionTypes';

const initialState = {
  user: null,
  isLoading: false,
};

const fetchProfileSuccess = (state, payload) => {
  const updatedState = { ...state };
  updatedState.user = payload;
  updatedState.isLoading = false;
  return updatedState;
};

const deletePost = (state, payload) => {
  const updatedState = { ...state, user: { ...state.user } };
  updatedState.user.Posts = updatedState.user.Posts.filter(
    (post) => post.id !== payload
  );

  console.log(payload);
  console.log(updatedState);
  return updatedState;
};

const ProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PROFILE_SUCCESS:
      return fetchProfileSuccess(state, action.payload);
    case actionTypes.DELETE_POST:
      return deletePost(state, action.payload);
    default:
      return state;
  }
};

export default ProfileReducer;
