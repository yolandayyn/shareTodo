import { Component, OnInit} from '@angular/core';
import {FriendService} from '../../services/friend/friend.service';
import {Auth} from '../../services/auth/auth.service';

@Component({
    moduleId: module.id,
    selector: 'friend',
    templateUrl: 'friend.component.html'
})

export class FriendComponent {
    email: String;
    friendList: String[];

    constructor(private _friendService: FriendService, private auth: Auth){
        var profile = JSON.parse(localStorage.getItem('profile'));
        this.email = profile.email;
        _friendService.getFriendList(this.email).subscribe(friends => {
          this.friendList = friends.friend;
        });
    }

    addFriend(event, friend) {
      this._friendService.addFriend(this.email, friend.value).subscribe(x => {
        this.friendList.push(friend.value);
      });
    }

    deleteFriend(friend) {
      this._friendService.delFriend(this.email, friend).subscribe(x =>) {
        var idx = this.friendList.indexOf(friend);
        this.friendList.splice(idx, 1);
      }
    }
}
