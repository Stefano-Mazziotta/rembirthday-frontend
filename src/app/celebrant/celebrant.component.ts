import { Component, Input } from '@angular/core';
import { CelebrantDto } from '../../shared/interfaces/CelebrantDto';

@Component({
  selector: 'celebrant',
  standalone: true,
  imports: [],
  templateUrl: './celebrant.component.html',
  styleUrl: './celebrant.component.css',
})
export class CelebrantComponent {
  @Input() celebrant: CelebrantDto | null = null;
  showTooltip: boolean = false;
  constructor() {}
}
