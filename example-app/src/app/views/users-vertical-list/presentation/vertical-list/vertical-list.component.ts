import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import {User} from '@app/model';

@Component({
  selector: 'app-vertical-list',
  templateUrl: './vertical-list.component.html',
  styleUrls: ['./vertical-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VerticalListComponent {
  @Input() users: User[] = [];

  @Output()
  userSelected: EventEmitter<User> = new EventEmitter<User>();
}
