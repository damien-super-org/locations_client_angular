// client epics goes here
import { HttpService } from '../../../../../midgard/modules/http/http.service';
import { ofType } from 'redux-observable';
import { switchMap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  createClientCommit, createClientFail, deleteClientCommit, deleteClientFail,
  loadOneClientFail, loadClientsCommit,
  updateClientCommit, updateClientFail, loadClientsFail
} from './blueprint-client.actions';
import { environment } from '../../../../../environments/environment';
import { reduxObservable } from '../../../../../midgard/modules/store/index';
import { Action } from '../../../../../midgard/state/action.type';
import {
  CREATE_CLIENT, DELETE_CLIENT, LOAD_ALL_CLIENTS, LOAD_ONE_CLIENT, loadOneClientCommit,
  UPDATE_CLIENT
} from './blueprint-client.actions';
import { Injectable } from '@angular/core';

@Injectable()
export class ClientEpics {
  /**
   * this is here to handle asynchronous actions and will be triggered when LOAD_DATA_CLIENTS action is dispatched
   * @param {Observable} action$ - the current action
   */
  loadAllClientsEpic = action$ => {
    return action$.pipe(
      ofType(LOAD_ALL_CLIENTS),
      switchMap((action: any) => {
        return this.httpService.makeRequest('get', `${environment.API_URL}/client`, {}, true).pipe(
          // If successful, dispatch success action with result
          map(res => loadClientsCommit(res.data)),
          // If request fails, dispatch failed action
          catchError((error) => of(loadClientsFail(error)))
        );
      })
    );
  }

  /**
   * this is here to handle asynchronous actions and will be triggered when LOAD_ONE_CLIENT action is dispatched
   * @param {Observable} action$ - the current action
   */
  loadOneClientEpic = action$ => {
    return action$.pipe(
      reduxObservable.ofType(LOAD_ONE_CLIENT),
      switchMap((action: Action) => {
        return this.httpService.makeRequest('get', `${environment.API_URL}/client/${action.id}/`, {}, true).pipe(
          // If successful, dispatch success action with result
          map((res: Action) => loadOneClientCommit(res.data)),
          // If request fails, dispatch failed action
          catchError((error) => of(loadOneClientFail(error)))
        );
      })
    );
  };

  /**
   * this is here to handle asynchronous actions and will be triggered when CREATE_CLIENT action is dispatched
   * @param {Observable} action$ - the current action
   */
  createClientEpic = action$ => {
    return action$.pipe(
      reduxObservable.ofType(CREATE_CLIENT),
      switchMap((action: Action) => {
        return this.httpService.makeRequest('post', `${environment.API_URL}/client/`, action.data, true).pipe(
          // If successful, dispatch success action with result
          map((res: Action) => createClientCommit(res.data, action.index)),
          // If request fails, dispatch failed action
          catchError((error) => of(createClientFail(error)))
        );
      })
    );
  }

  /**
   * this is here to handle asynchronous actions and will be triggered when UPDATE_CLIENT action is dispatched
   * @param {Observable} action$ - the current action
   */
  updateClientEpic = action$ => {
    return action$.pipe(
      reduxObservable.ofType(UPDATE_CLIENT),
      switchMap((action: Action) => {
        const payload = {...action.data};
        delete payload['id']; // remove id from payload because we already send it in the url
        return this.httpService.makeRequest('patch', `${environment.API_URL}/client/${action.data.id}/`, payload, true).pipe(
          // If successful, dispatch success action with result
          map((res: Action) => updateClientCommit(res.data)),
          // If request fails, dispatch failed action
          catchError((error) => of(updateClientFail(error)))
        );
      })
    );
  }

  /**
   * this is here to handle asynchronous actions and will be triggered when DELETE_CLIENT action is dispatched
   * @param {Observable} action$ - the current action
   */
  deleteClientEpic = action$ => {
    return action$.pipe(
      reduxObservable.ofType(DELETE_CLIENT),
      switchMap((action: Action) => {
        return this.httpService.makeRequest('delete', `${environment.API_URL}/client/${action.data.id}/`, {},  true).pipe(
          // If successful, dispatch success action with result
          map(res => deleteClientCommit(action.data)),
          // If request fails, dispatch failed action
          catchError((error) => of(deleteClientFail(error)))
        );
      })
    );
  }

  constructor(
    private httpService: HttpService
  ) {
    return reduxObservable.combineEpics(
      this.loadAllClientsEpic,
      this.loadOneClientEpic,
      this.updateClientEpic,
      this.deleteClientEpic,
      this.createClientEpic,
    );
  }
}
