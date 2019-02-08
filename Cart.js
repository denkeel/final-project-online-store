class Cart {
    constructor(source, container = '.cart') {
        this.source = source;
        this.container = container;
        this.countGoods = 0; // Общее кол-во товаров в корзине
        this.amount = 0; // Общая стоимость товаров в корзине
        this.cartItems = []; //Массив для хранения товаров
        this._init(this.source);
    }
    _render() {
        let $cartItemsDiv = $('<div/>', {
            class: 'cart__items-wrap'
        });
        let $totalAmount = $('<div/>', {
            class: 'cart__summary'
        });

        $totalAmount.append(`<div class="cart__name-total">TOTAL</div>`);
        $totalAmount.append(`<div class="sum-price">$0.0</div>`);
        
        $cartItemsDiv.appendTo($(this.container));
        $totalAmount.appendTo($(this.container));

        let $buttonCheckout = $('<a/>', {
            href: 'checkout.html',
            class: 'cart__button',
            text: 'checkout'
        });
        $buttonCheckout.appendTo($(this.container));

        let $buttonCart = $('<a/>', {
            href: 'cart.html',
            class: 'cart__button',
            text: 'go to cart'
        });
        $buttonCart.appendTo($(this.container));

        let $qtyLabel = $('<div>', {
            class: 'qty-label animated',
            text: ''
        });
        $qtyLabel.hide();

        let $cartImg = $(this.container).closest('.img-cart');

        $qtyLabel.appendTo($cartImg);
    }
    _init(source) {
        this._render();
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
        let $container = $('<div/>', {
            class: 'cart__item',
            'data-product': product.id_product
        });

        let $wrapImg = $('<div/>', {
            class: 'cart__img-wrap'
        })
        $wrapImg.append($('<img/>', {
            class: 'cart__img',
            src: product.img
        }));
        //console.log(product.img);
        $wrapImg.appendTo($container);

        let $cart__text = $('<div/>', {
            class: 'cart__text'
        });
        $cart__text.append(`<p class="cart__item-name">${product.product_name}</p>`);
        $cart__text.append(`<p class="cart__qty-name">${product.quantity} x $${product.price}</p>`);
        $cart__text.appendTo($container);

        let $close__wrap = $('<div/>', {
            class: 'cart__delete-wrap'
        })
        $close__wrap.append(`<a href="#" class="cart__delete-btn" data-id="${product.id_product}"><i class="fas fa-times-circle"></i></a>`);
        $close__wrap.appendTo($container);

        $container.appendTo($('.cart__items-wrap'));
        $('<div class="hr"></div>').appendTo($('.cart__items-wrap'));

        if (aNew) {
            $container.hide();
            $container.fadeOut();
            $container.fadeIn('300');
        }
    }
    _renderSum() {
        //$('.sum-goods').text(`Всего товаров в корзине: ${this.countGoods}`);
        $('.sum-price').text(`$${this.amount.toFixed(1)}`);
        if (this.amount == '0') {
            $(this.container).find('.cart__empty').fadeIn('fast');
        } else {
            $(this.container).find('.cart__empty').fadeOut('fast');
        }
        let $qtyLabel = $(this.container).next();
        $qtyLabel.text(this.countGoods);
        $qtyLabel.removeClass('wobble');
        setTimeout(() => {
            $qtyLabel.addClass('wobble');
        }, 10);
        if (this.countGoods < 1) {
            $qtyLabel.fadeOut('fast');
        } else {
            $qtyLabel.fadeIn('medium');
        }
        //$qtyLabel.slideDown('fast');
        //console.log(this.countGoods);
    }
    _updateCart(product) {
        let $container = $(`div[data-product=${product.id_product}]`);
        $container.find('.cart__qty-name').text(`${product.quantity} x $${product.price}`);
    }
    addProduct(element) {
        let productId = +$(element).data('id');
        let find = this.cartItems.find(product => product.id_product === productId);
        if (find) {
            find.quantity++;
            this.countGoods++;
            this.amount += find.price;
            this._updateCart(find);
        } else {
            let product = {
                id_product: productId,
                product_name: $(element).data('name'),
                price: +$(element).data('price'),
                quantity: 1,
                img: $(element).data('img')
            };
            //console.log(product.img)
            this.cartItems.push(product);
            this.amount += product.price;
            this.countGoods += product.quantity;
            this._renderItem(product, true);
        }
        this._renderSum();
    }
    remove(productToDelete) {
        //Todo: удаление товара
        let productId = +productToDelete.dataset.id;
        let theProduct = this.cartItems.find(product => product.id_product === productId);

        theProduct.quantity--;
        //console.log(theProduct.quantity);
        this.amount -= theProduct.price;
        this.countGoods--;
        //console.log(this.countGoods);

        if (theProduct.quantity > 0) {
            //console.log(true);
            this._updateCart(theProduct);
        } else {
            this._deleteItem(productId);
            //console.log(theProduct);
            //console.log(this.cartItems);
            var indexToRemove = this.cartItems.findIndex(product => product.id_product === productId);
            this.cartItems.splice(indexToRemove, 1);
        }
        this._renderSum();
    }
    _deleteItem(containerId) {
        let $container = $(`div[data-product=${containerId}]`);
        $container.next().remove();
        $container.slideUp('200');
        setTimeout(() => {
            $container.remove()
        }, 2400); //удалаю сам элемент по таймеру когда анимация закончится
        
    }
}