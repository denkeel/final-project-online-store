$(document).ready(() => {
    new BrowseDropdown();
    new UniversalDropdown('.img-cart', '.cart', 'cart__focus');

    let cart = new Cart('getCart.json');

    $('.add').click(e => {
        e.preventDefault();
        cart.addProduct(e.target);
    });

    //Удаление товара
    $('.cart').on('click', '.cart__delete-btn', e => {
        e.preventDefault();
        cart.remove(e.currentTarget);

    });

    //добавляю атрибуты к кнопкам c данными из тегов html
    $('.item-box').each((index, box) => {
        //console.log(box);
        let $btn = $(box).find('.add');
        let $img = $(box).find('img');
        let $price = $(box).find('h5');
        $btn.attr("data-id", index);
        $btn.attr("data-price", $price.text().match(/\d+/));
        $btn.attr("data-name", 'MANGO PEOPLE T-SHIRT');
        $btn.attr("data-img", $img.attr('src'));
    });
    $(document).on('scroll', () => {
        if ($(document).scrollTop() > 0) {
            $('.header').addClass('header___min');
        } else {
            $('.header').removeClass('header___min');
        }
    });
    
});

// Непонятно нужно ли мне теперь для каждого элемента, для которого я хочу создать логику
// создавать свой класс?
// Или куда пихать все эти обработчики событий?
