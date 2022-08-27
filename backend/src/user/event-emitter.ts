import { Injectable } from '@nestjs/common';
import { EventEmitter } from 'events';

@Injectable()
export class EventEmit extends EventEmitter {
  log = (message: string) => {
    console.log(message);
    this.emit('log-event', { id: 1, text: 'TEST EVENT!!!' });
  };

  getUserEvent = async () => {
    this.emit('getUser', 'c5ac3f49-8584-43d7-b376-6667faf93149');
  };
}
