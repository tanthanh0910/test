//use file:
/**
 * client/input-integer.js
 * client/session.js
 * client/order/common.js
 */

$(".quantity-product-item").inputFilter(function (value) {
    return /^\d*$/.test(value);    // Allow digits only, using a RegExp
});
//end input-integer.js

//function area
/**
 * onload product list in cart management page
 */
function renderCartProductList() {

    let products = session.get(PRODUCT_SESSION_KEY);
    if (!products) {
        let htmlData = `
            <tr><td colspan="5" align="center">...</td></tr>
        `;
        $('#cart-body-data').html(htmlData)
    }

    let htmlResponse = '';
    for (const prop in products) {
        let product = products[prop];
        htmlResponse += productItemHtmlTemplate(product.id, product.image, product.name_en, product.name_zh_cn, product.quantity, product.price);
    }

    $('#cart-body-data').html(htmlResponse);
    updateCartItemTotalQty();
    renderTotalInfo();

    offInputQtyEvent();
    onInputQtyEvent();

}

function formatMoney(number) {
    let dollarUS = Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "SGD",
    });

    return dollarUS.format(number);
}

function renderTotalInfo() {
    let list = session.get(PRODUCT_SESSION_KEY);
    let totalQty = getTotalQuantityOfProducts(list);
    let totalPrice = getTotalPriceOfProducts(list);

    if ($(".total-price").length && IS_OUTLET_OWNER) {
        $(".total-price").map(function () {
            let productId = parseInt($(this).attr('data-product-id'));
            let product = findProductById(productId, list);
            if (product) {
                $(this).html(`<h4>${$.number(product.quantity * product.price, 2)}</h4>`);
            }

        })
    }


    $('#footer-total-quantity').html($.number(totalQty));
    if ($('#footer-total-price').length && IS_OUTLET_OWNER) {
        $('#footer-total-price').html(`${formatMoney(totalPrice)}`);
    }


}

function productItemHtmlTemplate(id, imageUrl, name, name_zh_CN, quantity, price) {
    let finalName = name;
    if (LANG_CHOSEN === LANG_CHINA) {
        finalName = name_zh_CN;
    }

    if (!IS_OUTLET_OWNER) {
        return `
            <tr>
                <td class="left">
                    <div class="icon-menu">
                        <img src="${imageUrl}">
                        <h4>${finalName}</h4>
                    </div>
                </td>
                <td>
                    <div class="number-input">
                        <button class="minus minus-quantity-cart"
                        data-product-id="${id}"
                        data-product-image="${imageUrl}"
                        data-product-name="${name}"
                        data-product-name_zh_CN="${name_zh_CN}"
                        data-product-price="${price}"
                        ></button>
                        
                        <input class="quantity-product-item"
                        min="1" type="text" value="${quantity}"
                        id="product-${id}-quantity"
                        data-product-id="${id}"
                        data-product-image="${imageUrl}"
                        data-product-name="${name}"
                        data-product-name_zh_CN="${name_zh_CN}"
                        data-product-price="${price}"
                        
                         >

                        <button class="plus plus-quantity-cart"
                        data-product-id="${id}"
                        data-product-image="${imageUrl}"
                        data-product-name="${name}"
                        data-product-name_zh_CN="${name_zh_CN}"
                        data-product-price="${price}"
                        ></button>
                    </div>
                </td>
                <td>
                    <img class="delete-product trash-icon" data-product-id="${id}" src="client/img/site_images/cancel.png">
                </td>
            </tr>
        `;
    }

    return `
        <tr>
            <td class="left">
                <div class="icon-menu">
                    <img src="${imageUrl}">
                    <h4>${finalName}</h4>
                </div>
            </td>
            <td><h4>${$.number(price, 2)}</h4></td>
            <td>
                <div class="number-input">
                    <button class="minus minus-quantity-cart"
                    data-product-id="${id}"
                    data-product-image="${imageUrl}"
                    data-product-name="${name}"
                    data-product-name_zh_CN="${name_zh_CN}"
                    data-product-price="${price}"
                    ></button>
                    
                    <input class="quantity-product-item"
                    min="1" type="text" value="${quantity}"
                    id="product-${id}-quantity"
                    data-product-id="${id}"
                    data-product-image="${imageUrl}"
                    data-product-name="${name}"
                    data-product-name_zh_CN="${name_zh_CN}"
                    data-product-price="${price}"
                    
                     >

                    <button class="plus plus-quantity-cart"
                    data-product-id="${id}"
                    data-product-image="${imageUrl}"
                    data-product-name="${name}"
                    data-product-name_zh_CN="${name_zh_CN}"
                    data-product-price="${price}"
                    ></button>
                </div>
            </td>
            <td class="second total-price" data-product-id="${id}"><h4>${formatMoney(price * quantity)}</h4></td>
            <td>
                <img class="delete-product trash-icon" data-product-id="${id}" src="client/img/site_images/cancel.png">
            </td>
        </tr>
    `;


}


function onInputQtyEvent() {

    $('.quantity-product-item').on('input', function () {
        let quantity = parseInt(this.value);


        if (isNaN(quantity)) {
            this.value = MIN_INPUT_QTY;
            updateQtyOfProductSession($(this), MIN_INPUT_QTY, QUANTITY_TYPE_FORCE);

            if (this.value <= MIN_INPUT_QTY) {
                let list = session.get(PRODUCT_SESSION_KEY);
                list = removeProductSessionItem($(this).attr('data-product-id'), list);
                session.set(PRODUCT_SESSION_KEY, list);
            }
            updateCartItemTotalQty();
            renderTotalInfo();
            return;
        }

        if (quantity <= MIN_INPUT_QTY || isNaN(quantity)) {
            this.value = MIN_INPUT_QTY + 1;
            updateQtyOfProductSession($(this), MIN_INPUT_QTY + 1, QUANTITY_TYPE_FORCE);
            updateCartItemTotalQty();
            renderTotalInfo();
            return;
        }

        if (quantity >= MAX_INPUT_QTY) {
            let changedQty = Math.floor(quantity / 10);
            this.value = changedQty;
            updateQtyOfProductSession($(this), changedQty, QUANTITY_TYPE_FORCE);
            updateCartItemTotalQty();
            renderTotalInfo();
            return;
        }

        updateQtyOfProductSession($(this), quantity, QUANTITY_TYPE_FORCE);
        updateCartItemTotalQty();
        renderTotalInfo();

    })


    $('.plus-quantity-cart').on('click', function () {
        let quantity = parseInt(this.parentNode.querySelector('input[type=text]').value);
        let newQty = quantity + 1;
        if (newQty >= MAX_INPUT_QTY) {
            let changedQty = Math.floor(newQty / 10);
            this.parentNode.querySelector('input[type=text]').value = changedQty;
            updateQtyOfProductSession($(this), changedQty, QUANTITY_TYPE_FORCE);
            updateCartItemTotalQty();
            renderTotalInfo();
            return;
        }

        updateQtyOfProductSession($(this), newQty, QUANTITY_TYPE_FORCE);
        updateCartItemTotalQty();
        renderTotalInfo();

    })

    $('.minus-quantity-cart').on('click', function () {
        let currentQuantity = parseInt(this.parentNode.querySelector('input[type=text]').value);
        let newQty = currentQuantity - 1;
        if (newQty <= MIN_INPUT_QTY) {
            let list = session.get(PRODUCT_SESSION_KEY);
            list = removeProductSessionItem($(this).attr('data-product-id'), list);
            session.set(PRODUCT_SESSION_KEY, list);
            updateCartItemTotalQty();
            renderTotalInfo();
            $(this).parent().parent().parent().remove();
            return;
        }

        updateQtyOfProductSession($(this), newQty, QUANTITY_TYPE_FORCE);
        updateCartItemTotalQty();
        renderTotalInfo();

    })

    $('.delete-product').on('click', function () {
        let list = session.get(PRODUCT_SESSION_KEY);
        list = removeProductSessionItem($(this).attr('data-product-id'), list);
        session.set(PRODUCT_SESSION_KEY, list);
        $(this).parent().parent().remove();
        updateCartItemTotalQty();
        renderTotalInfo();
    })
}

function offInputQtyEvent() {
    $('.quantity-product-item').off('input');
    $('.plus-quantity-cart').off('click');
    $('.minus-quantity-cart').off('click');
    $('.delete-product').off('click');
}

function renderHiddenInput(products) {
    let html = '';
    for (const prop in products) {
        html += `
            <input type="hidden" name="products[${prop}][id]" value="${products[prop].id}">
            <input type="hidden" name="products[${prop}][quantity]" value="${products[prop].quantity}">
        `
    }
    $('#submit-data-area').html(html);
}

//end function area

//enable on input element
onInputQtyEvent();


$('.checkout').on('click', function () {
    let products = session.get(PRODUCT_SESSION_KEY);

    let checkoutObj = $(this);
    if (!products.length) {
        return;
    }

    renderHiddenInput(products);
    $.confirm({
        width: 'auto',
        title: checkoutObj.attr('data-title'),
        content: checkoutObj.attr('data-msg'),
        // useBootstrap: false,
        type: 'red',
        typeAnimated: true,
        buttons: {
            tryAgain: {
                text: checkoutObj.attr('data-btn-confirm'),
                btnClass: 'btn-red',
                action: function () {
                    let ajaxOption = {
                        url: '/carts',
                        type: 'POST',
                        data: $('#form-submit-data').serialize(products),
                        success: function (result) {
                            if (result.code === 0) {
                                //error

                                clientPopupMsg(TITLE, result.message)

                                return;
                            }

                            localStorage.removeItem(PRODUCT_SESSION_KEY);
                            clientPopupMsgWithRedirectUrl(TITLE, result.message, "/orders/histories")
                        },
                        error: function (result) {
                            clientPopupMsg(TITLE, result.responseJSON.message)
                        }
                    };
                    $.ajax(ajaxOption);
                }
            },
            close: {
                text: checkoutObj.attr('data-btn-cancel'),
                action: function () {
                }
            },
        }
    });


})



