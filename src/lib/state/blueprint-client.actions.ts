// define the client actions here

// Load All
import {Client} from './blueprint-client.model';

export const LOAD_ALL_CLIENTS = 'LOAD_ALL_CLIENTS';
export const LOAD_ALL_CLIENTS_COMMIT = 'LOAD_ALL_CLIENTS_COMMIT';
export const LOAD_ALL_CLIENTS_FAIL = 'LOAD_ALL_CLIENTS_FAIL';

// Load One
export const LOAD_ONE_CLIENT = 'LOAD_ONE_CLIENT';
export const LOAD_ONE_CLIENT_COMMIT = 'LOAD_ONE_CLIENT_COMMIT';
export const LOAD_ONE_CLIENT_FAIL = 'LOAD_ONE_CLIENT_FAIL';

// Create
export const CREATE_CLIENT = 'CREATE_CLIENT';
export const CREATE_CLIENT_COMMIT = 'CREATE_CLIENT_COMMIT';
export const CREATE_CLIENT_FAIL = 'CREATE_CLIENT_FAIL';

// Update
export const UPDATE_CLIENT = 'UPDATE_CLIENT';
export const UPDATE_CLIENT_COMMIT = 'UPDATE_CLIENT_COMMIT';
export const UPDATE_CLIENT_FAIL = 'UPDATE_CLIENT_FAIL';

// Delete
export const DELETE_CLIENT = 'DELETE_CLIENT';
export const DELETE_CLIENT_COMMIT = 'DELETE_CLIENT_COMMIT';
export const DELETE_CLIENT_FAIL = 'DELETE_CLIENT_FAIL';


export function loadClients() {
  return {
    type: LOAD_ALL_CLIENTS,
  };
}

export function loadClientsCommit(data: Client[]) {
  return {
    type: LOAD_ALL_CLIENTS_COMMIT,
    data
  };
}

export function loadClientsFail(error) {
  return {
    type: LOAD_ALL_CLIENTS_FAIL,
    error
  };
}

export function loadOneClient(id: string) {
  return {
    type: LOAD_ONE_CLIENT,
    id
  };
}

export function loadOneClientCommit(data: Client) {
  return {
    type: LOAD_ONE_CLIENT_COMMIT,
    data
  };
}

export function loadOneClientFail(error) {
  return {
    type: LOAD_ONE_CLIENT_FAIL,
    error
  };
}

export function createClient(data: Client) {
  return {
    type: CREATE_CLIENT,
    data,
  };
}

export function createClientCommit(data: Client, index?: number) {
  return {
    type: CREATE_CLIENT_COMMIT,
    data,
    index
  };
}

export function createClientFail(error) {
  return {
    type: CREATE_CLIENT_FAIL,
    error
  };
}

export function updateClient(data) {
  return {
    type: UPDATE_CLIENT,
    data
  };
}

export function updateClientCommit(data: Client) {
  return {
    type: UPDATE_CLIENT_COMMIT,
    data
  };
}

export function updateClientFail(error) {
  return {
    type: UPDATE_CLIENT_FAIL,
    error
  };
}

export function deleteClient(data: Client) {
  return {
    type: DELETE_CLIENT,
    data
  };
}

export function deleteClientCommit(data: Client) {
  return {
    type: DELETE_CLIENT_COMMIT,
    data,
  };
}

export function deleteClientFail(error) {
  return {
    type: DELETE_CLIENT_FAIL,
    error
  };
}

