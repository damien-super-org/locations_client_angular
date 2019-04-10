// here you can define the client reducer
import { addAll, deleteOne, upsertOne } from '@midgard/modules/store/reducer.utils';
import {
  CREATE_LOCATION_COMMIT, DELETE_LOCATION_COMMIT, LOAD_ALL_LOCATIONS_COMMIT, LOAD_ONE_LOCATION_COMMIT,
  UPDATE_LOCATION_COMMIT
} from './locations.actions';
import {Location} from './location.model';

export interface LocationState {
  data: Location[];
  loaded: false;
  created: false;
  updated: false;
  deleted: false;
}
const initialState: LocationState = {
  data: [],
  loaded: false,
  created: false,
  updated: false,
  deleted: false
};

export function locationsReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_ALL_LOCATIONS_COMMIT:
      return addAll(state, action);
    case LOAD_ONE_LOCATION_COMMIT:
      return upsertOne(state, action, 'uuid', 'results');
    case CREATE_LOCATION_COMMIT:
      return upsertOne(state, action, 'uuid', 'results');
    case UPDATE_LOCATION_COMMIT:
      return upsertOne(state, action, 'uuid', 'results');
    case DELETE_LOCATION_COMMIT:
      return deleteOne(state, action, 'uuid', 'results' );
    default:
      return state;
  }
}
