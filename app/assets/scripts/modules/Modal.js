export class Modal {
    constructor() {
        this.openModalButtons = document.querySelectorAll('.open-modal');
        this.closeModalButton = document.querySelector('.modal__close');
        this.modal =
            document.querySelector(".modal");
        this.loadEvents();
    }

    openModal() {
        this.modal.classList.add('modal--is-visible');
        return false;
    }

    closeModal() {
        this.modal.classList.remove('modal--is-visible');
    }

    loadEvents() {
        this.closeModalButton.addEventListener('click', this.closeModal.bind(this));

        this.openModalButtons.forEach(button => {
          button.addEventListener('click', this.openModal.bind(this))
        });
        document.addEventListener('keyup',this.keyPressHandler.bind(this));
   }

    keyPressHandler(e) {
        if (e.keyCode === 27) {
            this.closeModal();
        }
    }

}