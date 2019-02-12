$(document).ready(() => {
    new BrowseDropdown();
    new UniversalDropdown('.img-cart', '.cart', 'cart__focus', '.add');

    let cart = new Cart('getCart.json');
    $('.cart').on('click', '.cart__delete-btn', e => {
        e.preventDefault();
        cart.remove(e.currentTarget);
    });

    $(document).on('scroll', () => {
        if ($(document).scrollTop() > 0) {
            $('.header').addClass('header___min');
        } else {
            $('.header').removeClass('header___min');
        }
    });
});