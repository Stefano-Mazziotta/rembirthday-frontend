import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  CelebrantDto,
  CreateCelebrantDto,
} from '../../../../shared/interfaces/CelebrantDto';
import { CelebrantService } from '../../services/celebrant.service';
import { ResponseApiCreateEntity } from '../../../../shared/interfaces/ResponseApi';

@Component({
  selector: 'create-celebrant-dialog',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-celebrant-dialog.component.html',
  styleUrl: './create-celebrant-dialog.component.css',
})
export class CreateCelebrantDialogComponent {
  @Input() isVisible: boolean = false;
  @Output() onClose = new EventEmitter();

  celebrantForm = new FormGroup({
    name: new FormControl(''),
    surname: new FormControl(''),
    birthdate: new FormControl(''),
    // relationship: new FormControl
  });

  constructor(private _celebrantService: CelebrantService) {}

  closeDialog() {
    this.isVisible = false;
    this.onClose.emit();
  }

  confirmDialog() {
    // Handle confirmation logic here
    this.closeDialog();
  }

  public createCelebrantSubmit() {
    const { celebrantForm } = this;
    const celebrant: CreateCelebrantDto = {
      name: celebrantForm.value.name ?? '',
      surname: celebrantForm.value.surname ?? '',
      birthday: celebrantForm.value.birthdate ?? '',
      relationship_id: 3,
    };

    this._celebrantService.createCelebrant(celebrant).subscribe({
      next: (response: ResponseApiCreateEntity<CelebrantDto>) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
