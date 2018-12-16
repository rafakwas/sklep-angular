import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import {Message} from "../models/message";

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  currentMessage  = this.socket.fromEvent<Message>('message');
  constructor(private socket: Socket) { }
}
