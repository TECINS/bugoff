import { Injectable } from '@angular/core';
import { connect } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor() { }
  getSocketConnection(): SocketIOClient.Socket {
    return connect('https://api-bugoff.herokuapp.com/');
  }
}
