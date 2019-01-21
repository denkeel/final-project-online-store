class Dropdown {
    constructor() {
        this.active = false;
    }
};

class BrowseDropdown extends Dropdown {
    constructor() {
        super();
        $('.search__dropdown-button').on('click', (e) => {
            this._show(e);
            if (this.active) {
                $('body').on('click', (e) => {
                    this._hide(e);
                });
            }
        });
    }

    _show(e) {
        console.log('clock');
        $('.search__dropdown').fadeIn();
        $(e.currentTarget).addClass('focus');
        $(e.currentTarget).find('.fa-caret-down').addClass('rotate');
        this.active = true;
    }

    _hide(e) {
        console.log('false clock');
        console.log(this.active);
        if (this.active) {
            $('.search__dropdown').fadeOut();
            $(e.currentTarget).removeClass('focus');
            $(e.currentTarget).find('.fa-caret-down').removeClass('rotate');
            super.active = false;
        }
    }
}