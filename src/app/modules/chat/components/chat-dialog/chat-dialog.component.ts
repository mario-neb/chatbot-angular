import { Component, OnInit } from '@angular/core';

import 'rxjs/add/operator/scan';
import { ChatService, Message } from '../../chat.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.scss']
})
export class ChatDialogComponent implements OnInit {

  messages: Observable<Message[]>;
  formValue: string;

  constructor(public chat: ChatService) { }

  ngOnInit() {
    // appends to array after each new message is added to feedSource
    this.messages = this.chat.conversation.asObservable()
      .scan((acc, val) => acc.concat(val));
  }

  sendMessage() {
    this.chat.converse(this.formValue);
    this.formValue = '';
  }
}
