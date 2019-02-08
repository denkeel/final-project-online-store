class PageCart {
    constructor(source, container = '.cart-page') {
        this.source = source;
        this.container = container;
        this.countGoods = 0; // Общее кол-во товаров в корзине
        this.amount = 0; // Общая стоимость товаров в корзине
        this.cartItems = []; //Массив для хранения товаров
        this._init(this.source);
    }
    _init(source) {
        //this._render();
        fetch(source)
            .then(result => result.json())
            .then(data => {
                for (let product of data.contents) {
                    this.cartItems.push(product);
                    this._renderItem(product);
                }
                this.countGoods = data.countGoods;
                this.amount = data.amount;
                this._renderSum();
            });
    }
    _renderItem(product, aNew) {
        let $table = $(this.container).find('tbody');

        let $row = $('<tr/>', {
            class: 'row-cart',
            'data-product': product.id_product
        });

        let $col1 = $('<td/>', {
            class: 'col-item'
        });
        $col1.appendTo($row);

        let $productDetailsWrap = $('<div/>', {
            class: 'product-details'
        });
        $productDetailsWrap.appendTo($col1);

        let $imgWrap = $('<div>', {
            class: 'img-wrap'
        });
        let $img = $('<img>', {
            src: product.img,
            alt: ""
        });
        $img.appendTo($imgWrap);

        let $text = $('<div>', {
            class: 'text'
        });

        $text.append(`<h5>${product.product_name}</h5>`);
        $text.append(`<h6>Color: <div class="gray"> Red</div></h6>`);
        $text.append(`<h6>Size: <div class="gray"> Xll</div></h6>`);

        $productDetailsWrap.append($imgWrap);
        $productDetailsWrap.append($text);

        let $col2 = $('<td/>', {
            class: 'col-item'
        })

        $col2.append(`<div class="price">$${product.price}</div>
        </td>`);

        $col2.appendTo($row);

        let $col3 = $('<td/>', {
            class: 'col-item'
        });
        let $wrapInput = $('<div>', {
            class: 'flex-input'
        });
        $wrapInput.appendTo($col3)
        let $input = $('<input>', {
            value: product.quantity,
            type: 'number',
            min: 1,
            max: 50
        });
        //$input.on('click', () => this._updateCart(product.id_product));
        $input.on('input', (e) => {
            if (e.target.validity.valid === true) {
                this._updateCart(product.id_product);
                $(e.target).removeClass('red-background');
                $('.big-button').removeClass('big-button___disabled');
                $('.big-button').unbind('click');
            } else {
                $(e.target).addClass('red-background');
                $('.big-button').addClass('big-button___disabled');
                $('.big-button').click(function(event){
                    event.preventDefault();
                });
            }
        });
        $input.appendTo($wrapInput);
        $col3.appendTo($row);

        $row.append(`<td class="col-item"><div class="free">FREE</div></td>`);
        $row.append(`<td class="col-item"> <div class="subtotal">$${product.price * product.quantity}</div> </td>`);

        let $col6 = $('<td>', {
            class: 'col-item'
        });
        let $aWrap = $('<div>', {
            class: 'flex-a'
        });
        $aWrap.appendTo($col6);
        let $btnDelete = $('<a>', {
            href: 'javascript:void(0)',
            class: 'button-delete'
        })
        $btnDelete.append('<i class="fas fa-times-circle"></i>');
        $btnDelete.on('click', () => {
            this.removeAll(product.id_product);
        });
        $btnDelete.appendTo($aWrap);
        $col6.appendTo($row);

        $table.append($row);

        if (aNew) {
            $row.hide();
            $row.fadeOut();
            $row.fadeIn('300');
        }
    }
    _renderSum() {
        $('.pad-pink').text(`$${this.amount.toFixed(1)}`);
        $('.pad').text(`$${this.amount.toFixed(1)}`);
        if (this.amount == '0') {
            $(this.container).find('.cart-page__empty').fadeIn('fast');
        } else {
            $(this.container).find('.cart-page__empty').fadeOut('fast');
        }
    }
    _updateCart(id) {
        let $container = $(`tr[data-product=${id}]`);
        let theProduct = this.cartItems.find(product => product.id_product === id);
        let qtyWas = theProduct.quantity;
        //console.log(theProduct);
        let $input = $container.find('input');
        let qtyIs = $input.val();
        theProduct.quantity = $input.val();
        //console.log(id);
        $container.find('.subtotal').text(`$${theProduct.price * theProduct.quantity}`);

        let qtyDiff = qtyIs - qtyWas;
        this.amount += qtyDiff * theProduct.price;
        this._renderSum();
    }
    removeAll(productId) {
        let $container = $(`tr[data-product=${productId}]`);
        $container.find('td').fadeOut('300');
        let $undo = $('<td>', {
            class: 'cart-page__undo',
            colspan: 6,
            text: 'Undo.'
        });
        setTimeout(() => {
            $undo.appendTo($container);
        }, 400);
        let undo = false;
        $undo.on('click', () => {
            $container.find('td').fadeIn('300');
            $undo.remove();
            undo = true;
        });

        setTimeout(() => {
            if (undo === false)
                this._deleteItem(productId, $container);
        }, 4000);
    }
    _deleteItem(productId, $container) {
        let theProduct = this.cartItems.find(product => product.id_product === productId);

        this.amount -= theProduct.price * theProduct.quantity;
        this.countGoods -= theProduct.quantity;
        let indexToRemove = this.cartItems.findIndex(product => product.id_product === productId);
        this.cartItems.splice(indexToRemove, 1);

        this._renderSum();
        //TO-DO : beatiful animation
        //$container.find('td').slideUp();
        $container.slideUp('medium');

    }
}