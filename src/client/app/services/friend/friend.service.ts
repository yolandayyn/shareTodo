import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class FriendService{
    constructor(private _http:Http){

    }

    getFriendList(uid) {
      return this._http.get('/api/v2/friends/' + uid)
          .map(res => res.json());
    }

    addFriend(uid, fid) {
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      console.log(uid);
      console.log(fid);
      return this._http.post('/api/v2/addFriend/' + uid + '/' + fid, "", {headers: headers})
          .map(res => res.json());
    }

    delFriend(uid, fid) {
      return this._http.delete('api/v2/deleteFriend/'+ uid + "/" + fid)
          .map(res => res.json());
    }
  }
