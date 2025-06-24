import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-confirm-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css'],
  imports: [CommonModule, DeleteModalComponent]
})
export class DeleteModalComponent{
  
  @Input() isOpen: boolean = false; // Controla se o modal está aberto
  @Output() onClose = new EventEmitter<void>(); // Evento para fechar o modal
  @Output() onConfirm = new EventEmitter<void>(); // Evento para confirmar a exclusão

  closeModal(): void {
    this.isOpen = false;
    this.onClose.emit(); // Emite o evento para fechar o modal
  }

  confirmDelete(): void {
    this.onConfirm.emit(); // Emite o evento de confirmação
    this.closeModal(); // Fecha o modal
  }
}
