class Dropdown {
    constructor() {
        this.active = false;
    }
};

class BrowseDropdown extends Dropdown {
    constructor() {
        super();
        $('.search__dropdown-button').on('click', (e) => {
            this._toggle(e);
        });
        $(document).on('click', (e) => {
            if ($(event.target).closest('.search__dropdown-button').length === 0) {
                this._hide(e);
            };
        });
        //доделал browse
        /*
        $('body').on('click', (e) => {
            if (this.active === true)
                this._hide(e);
        });*/
    };


    _toggle(e) {
        $('.search__dropdown').toggle();
        $(e.currentTarget).toggleClass('focus');
        $(e.currentTarget).find('.fa-caret-down').toggleClass('rotate');
        if (this.active === false) {
            this.active = true;
        } else {
            this.active = false;
        }
    }

    _hide(e) {

        //console.log(this.active);
        if (this.active) {
            $('.search__dropdown').fadeOut();
            $('.header-left').find('.search__dropdown-button').removeClass('focus');
            $('.header-left').find('.fa-caret-down').removeClass('rotate');
            super.active = false;
        }
    }

    _showStatus(status) {
        if (status === true) {
            console.log('открыто');
        } else {
            console.log('закрыто');
        }
    };
}