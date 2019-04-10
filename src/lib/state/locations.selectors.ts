// here you can define memoized state selectors for the client
import { reselect } from '@midgard/modules/store/index';
import { LocationState } from './locations.reducer';

const getLocations = state => state.locationsReducer;

/**
 * selector that selects the current client state
 * @returns {MemoizedSelector<any, any>}
 */
export const getLocationsState = reselect.createSelector(
  getLocations,
  (locationState: LocationState) => {
    if (locationState) {
      return locationState;
    }
  }
);

/**
 * selector to get list of locations
 */
export const getAllLocations = reselect.createSelector(
  getLocations,
  (locations) => {
    if (locations) {
      return locations.data.results;
    }
  }
);

/**
 * selector to check if the data is loaded
 */
export const getLocationsLoaded = reselect.createSelector(
  getLocations,
  (locations) => {
    if (locations) {
      return locations.loaded;
    }
  }
);
