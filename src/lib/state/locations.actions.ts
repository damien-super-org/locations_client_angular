// Load All
import {Location} from './location.model';

export const LOAD_ALL_LOCATIONS = 'LOAD_ALL_LOCATIONS';
export const LOAD_ALL_LOCATIONS_COMMIT = 'LOAD_ALL_LOCATIONS_COMMIT';
export const LOAD_ALL_LOCATIONS_FAIL = 'LOAD_ALL_LOCATIONS_FAIL';

// Load One
export const LOAD_ONE_LOCATION = 'LOAD_ONE_LOCATION';
export const LOAD_ONE_LOCATION_COMMIT = 'LOAD_ONE_LOCATION_COMMIT';
export const LOAD_ONE_LOCATION_FAIL = 'LOAD_ONE_LOCATION_FAIL';

// Create
export const CREATE_LOCATION = 'CREATE_LOCATION';
export const CREATE_LOCATION_COMMIT = 'CREATE_LOCATION_COMMIT';
export const CREATE_LOCATION_FAIL = 'CREATE_LOCATION_FAIL';

// Update
export const UPDATE_LOCATION = 'UPDATE_LOCATION';
export const UPDATE_LOCATION_COMMIT = 'UPDATE_LOCATION_COMMIT';
export const UPDATE_LOCATION_FAIL = 'UPDATE_LOCATION_FAIL';

// Delete
export const DELETE_LOCATION = 'DELETE_LOCATION';
export const DELETE_LOCATION_COMMIT = 'DELETE_LOCATION_COMMIT';
export const DELETE_LOCATION_FAIL = 'DELETE_LOCATION_FAIL';


export function loadLocations() {
  return {
    type: LOAD_ALL_LOCATIONS,
  };
}

export function loadLocationsCommit(data: Location[]) {
  return {
    type: LOAD_ALL_LOCATIONS_COMMIT,
    data
  };
}

export function loadLocationsFail(error) {
  return {
    type: LOAD_ALL_LOCATIONS_FAIL,
    error
  };
}

export function loadOneLocation(id: string) {
  return {
    type: LOAD_ONE_LOCATION,
    id
  };
}

export function loadOneLocationCommit(data: Location) {
  return {
    type: LOAD_ONE_LOCATION_COMMIT,
    data
  };
}

export function loadOneLocationFail(error) {
  return {
    type: LOAD_ONE_LOCATION_FAIL,
    error
  };
}

export function createLocation(data: Location) {
  return {
    type: CREATE_LOCATION,
    data,
  };
}

export function createLocationCommit(data: Location, index?: number) {
  return {
    type: CREATE_LOCATION_COMMIT,
    data,
    index
  };
}

export function createLocationFail(error) {
  return {
    type: CREATE_LOCATION_FAIL,
    error
  };
}

export function updateLocation(data) {
  return {
    type: UPDATE_LOCATION,
    data
  };
}

export function updateLocationCommit(data: Location) {
  return {
    type: UPDATE_LOCATION_COMMIT,
    data
  };
}

export function updateLocationFail(error) {
  return {
    type: UPDATE_LOCATION_FAIL,
    error
  };
}

export function deleteLocation(data: Location) {
  return {
    type: DELETE_LOCATION,
    data
  };
}

export function deleteLocationCommit(data: Location) {
  return {
    type: DELETE_LOCATION_COMMIT,
    data,
  };
}

export function deleteLocationFail(error) {
  return {
    type: DELETE_LOCATION_FAIL,
    error
  };
}

