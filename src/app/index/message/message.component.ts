import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import {MessageService} from "../../shared/services/message.service";
import {ToastrService} from "../../shared/services/toastr.service";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit, OnDestroy {

  private _mesSub: Subscription;

  constructor(
    private messageService: MessageService,
    private toastrService : ToastrService
  ) { }

  ngOnInit() {
    console.log("MessageComponent ngOnInit");
    this._mesSub = this.messageService.currentMessage.subscribe(
      message => this.toastrService.info("Przyszła wiadomość!",message.content)
    );
  }

  ngOnDestroy() {
    console.log("MessageComponent ngOnDestroy");
    this._mesSub.unsubscribe();
  }

}
