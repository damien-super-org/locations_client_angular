// here you can define memoized state selectors for the client
import { reselect } from '../../../../../midgard/modules/store/index';
import { ClientState } from './blueprint-client.reducer';

const getClients = state => state.clientsReducer;

/**
 * selector that selects the current client state
 * @returns {MemoizedSelector<any, any>}
 */
export const getClientState = reselect.createSelector(
  getClients,
  (clientState: ClientState) => {
    if (clientState) {
      return clientState;
    }
  }
);
