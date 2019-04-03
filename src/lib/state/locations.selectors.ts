// here you can define memoized state selectors for the client
import { reselect } from '@midgard/modules/store/index';
import { LocationState } from './locations.reducer';

const getLocations = state => state.locationsReducer;

/**
 * selector that selects the current client state
 * @returns {MemoizedSelector<any, any>}
 */
export const getLocationsState = reselect.createSelector(
  getClients,
  (locationState: LocationState) => {
    if (locationState) {
      return locationState;
    }
  }
);
