$(document).ready(() => {
    $('.search__dropdown-button').on('click', (e) => {
        console.log('clock');
        $('.search__dropdown').fadeToggle();
        $(e.currentTarget).toggleClass('focus');
        $(e.currentTarget).find('.fa-caret-down').toggleClass('rotate');
    });
});