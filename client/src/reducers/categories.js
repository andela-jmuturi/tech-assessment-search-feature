import { combineReducers } from 'redux';

import * as actionTypes from '../constants';

export function categories(state = [], action) {
  switch (action.type) {
    case actionTypes.FETCH_CATEGORIES_SUCCESS:
      return action.categories;

    case actionTypes.CREATE_CATEGORY_REQUEST:
      // Perform an optimistic update
      return [
        ...state,
        action.category,
      ];

    case actionTypes.CREATE_CATEGORY_SUCCESS:
      // Rollback the optimistic update and accept server data instead.
      return [
        ...state.slice(0, state.length - 1),
        action.category,
      ];

    case actionTypes.CREATE_CATEGORY_FAILURE:
      // Rollback the optimistic update.
      return state.slice(0, state.length - 1);

    default:
      return state;
  }
}

export function isFetching(state = false, action) {
  switch (action.type) {
    case actionTypes.FETCH_CATEGORIES_REQUEST:
      return true;
    case actionTypes.FETCH_CATEGORIES_SUCCESS:
    case actionTypes.FETCH_CATEGORIES_FAILURE:
      return false;
    default:
      return state;
  }
}

export default combineReducers({
  categories,
  isFetching,
});
