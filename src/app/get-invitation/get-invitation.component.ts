import { Component, OnInit, Input } from '@angular/core';
import { Event } from '../events/event.model';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-get-invitation',
  templateUrl: './get-invitation.component.html',
  styleUrls: ['./get-invitation.component.scss'],
})
export class GetInvitationComponent implements OnInit {
  @Input() eventInvitation: Event;

  constructor(
    private ctrlModal: ModalController
  ) { }

  ngOnInit() {}

  onConfirmInvitation() {
    this.ctrlModal.dismiss({message: 'convite adquirido'}, 'confirmed');
  }

  onCancel() {
    this.ctrlModal.dismiss(null, 'cancel');
  }
}
