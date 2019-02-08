
class UniversalDropdown extends Dropdown {
    constructor(button, dropdown, classActiveButton) {
        super();

        this._init(button, dropdown, classActiveButton);
        this._initEventHandlers();
    };

    _init(button, dropdown, classActiveButton) {
        this.classButton = button;
        this.classDropdown = dropdown;
        this.$btn = $(button);
        this.$dropdown = $(dropdown);

        this.focusBtnClass = classActiveButton;
    };

    _initEventHandlers() {
        $(this.classButton).on('click', (e) => {
            console.log($(e.target).closest(this.classDropdown).length);
            if (!$(e.target).closest(this.classDropdown).length) {
                this._toggle(e);
            }
        });
        $(document).on('click', (e) => {
            console.log($(e.target).closest(this.classButton).length);
            if (this.active && !$(e.target).closest(this.classButton).length) {
                this._hide(e);
            };
        });
    };

    _toggle() {
        this._showStatus(this.active);
        console.log('тоглим');
        this.$dropdown.fadeToggle();
        this.$btn.toggleClass(this.focusBtnClass);
        if (this.active === false) {
            this.active = true;
        } else {
            this.active = false;
        };
        this._showStatus(this.active);
    };
    
    _hide() {
        this._showStatus(this.active);
        console.log('закрываем');
        this.$dropdown.fadeOut();
        this.$btn.removeClass(this.focusBtnClass);
        this.active = false;
        this._showStatus(this.active);
    };

    _showStatus(status) {
        if (status === true) {
            console.log('открыто');
        } else {
            console.log('закрыто');
        };
    };
};

class CartDropdown {
    constructor() {

    };
};