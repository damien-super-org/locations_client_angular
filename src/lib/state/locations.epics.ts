// client epics goes here
import { HttpService } from '../../../../../midgard/modules/http/http.service';
import { ofType } from 'redux-observable';
import { switchMap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  createLocationCommit, createLocationFail, deleteLocationCommit, deleteLocationFail,
  loadOneLocationFail, loadLocationsCommit,
  updateLocationCommit, updateLocationFail, loadLocationsFail
} from './locations.actions';
import { environment } from '../../../../../environments/environment';
import { reduxObservable } from '../../../../../midgard/modules/store/index';
import { Action } from '../../../../../midgard/state/action.type';
import {
  CREATE_LOCATION, DELETE_LOCATION, LOAD_ALL_LOCATIONS, LOAD_ONE_LOCATION, loadOneLocationCommit,
  UPDATE_LOCATION
} from './locations.actions';
import { Injectable } from '@angular/core';

@Injectable()
export class LocationEpics {
  /**
   * this is here to handle asynchronous actions and will be triggered when LOAD_DATA_LOCATIONS action is dispatched
   * @param {Observable} action$ - the current action
   */
  loadAllLocationsEpic = action$ => {
    return action$.pipe(
      ofType(LOAD_ALL_LOCATIONS),
      switchMap((action: any) => {
        return this.httpService.makeRequest('get', `${environment.API_URL}/client`, {}, true).pipe(
          // If successful, dispatch success action with result
          map(res => loadLocationsCommit(res.data)),
          // If request fails, dispatch failed action
          catchError((error) => of(loadLocationsFail(error)))
        );
      })
    );
  }

  /**
   * this is here to handle asynchronous actions and will be triggered when LOAD_ONE_LOCATION action is dispatched
   * @param {Observable} action$ - the current action
   */
  loadOneLocationEpic = action$ => {
    return action$.pipe(
      reduxObservable.ofType(LOAD_ONE_LOCATION),
      switchMap((action: Action) => {
        return this.httpService.makeRequest('get', `${environment.API_URL}/client/${action.id}/`, {}, true).pipe(
          // If successful, dispatch success action with result
          map((res: Action) => loadOneLocationCommit(res.data)),
          // If request fails, dispatch failed action
          catchError((error) => of(loadOneLocationFail(error)))
        );
      })
    );
  };

  /**
   * this is here to handle asynchronous actions and will be triggered when CREATE_LOCATION action is dispatched
   * @param {Observable} action$ - the current action
   */
  createLocationEpic = action$ => {
    return action$.pipe(
      reduxObservable.ofType(CREATE_LOCATION),
      switchMap((action: Action) => {
        return this.httpService.makeRequest('post', `${environment.API_URL}/client/`, action.data, true).pipe(
          // If successful, dispatch success action with result
          map((res: Action) => createLocationCommit(res.data, action.index)),
          // If request fails, dispatch failed action
          catchError((error) => of(createLocationFail(error)))
        );
      })
    );
  }

  /**
   * this is here to handle asynchronous actions and will be triggered when UPDATE_LOCATION action is dispatched
   * @param {Observable} action$ - the current action
   */
  updateLocationEpic = action$ => {
    return action$.pipe(
      reduxObservable.ofType(UPDATE_LOCATION),
      switchMap((action: Action) => {
        const payload = {...action.data};
        delete payload['id']; // remove id from payload because we already send it in the url
        return this.httpService.makeRequest('patch', `${environment.API_URL}/client/${action.data.id}/`, payload, true).pipe(
          // If successful, dispatch success action with result
          map((res: Action) => updateLocationCommit(res.data)),
          // If request fails, dispatch failed action
          catchError((error) => of(updateLocationFail(error)))
        );
      })
    );
  }

  /**
   * this is here to handle asynchronous actions and will be triggered when DELETE_LOCATION action is dispatched
   * @param {Observable} action$ - the current action
   */
  deleteLocationEpic = action$ => {
    return action$.pipe(
      reduxObservable.ofType(DELETE_LOCATION),
      switchMap((action: Action) => {
        return this.httpService.makeRequest('delete', `${environment.API_URL}/client/${action.data.id}/`, {},  true).pipe(
          // If successful, dispatch success action with result
          map(res => deleteLocationCommit(action.data)),
          // If request fails, dispatch failed action
          catchError((error) => of(deleteLocationFail(error)))
        );
      })
    );
  }

  constructor(
    private httpService: HttpService
  ) {
    return reduxObservable.combineEpics(
      this.loadAllLocationsEpic,
      this.loadOneLocationEpic,
      this.updateLocationEpic,
      this.deleteLocationEpic,
      this.createLocationEpic,
    );
  }
}
