// here you can define the client reducer
import { addAll, deleteOne, upsertOne } from '../../../../../midgard/modules/store/reducer.utils';
import {
  CREATE_CLIENT_COMMIT, DELETE_CLIENT_COMMIT, LOAD_ALL_CLIENTS_COMMIT, LOAD_ONE_CLIENT_COMMIT,
  UPDATE_CLIENT_COMMIT
} from './blueprint-client.actions';
import {Client} from './blueprint-client.model';

export interface ClientState {
  data: Client[];
  loaded: false;
  created: false;
  updated: false;
  deleted: false;
}
const initialState: ClientState = {
  data: [],
  loaded: false,
  created: false,
  updated: false,
  deleted: false
};

export function clientReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_ALL_CLIENTS_COMMIT:
      return addAll(state, action);
    case LOAD_ONE_CLIENT_COMMIT:
      return upsertOne(state, action, 'uuid');
    case CREATE_CLIENT_COMMIT:
      return upsertOne(state, action, 'uuid');
    case UPDATE_CLIENT_COMMIT:
      return upsertOne(state, action, 'uuid');
    case DELETE_CLIENT_COMMIT:
      return deleteOne(state, action, 'uuid');
    default:
      return state;
  }
}
