//<!--Function area->

function productItemHtml(randomId) {
    let nowDate = (new Date()).toISOString().split('T')[0];


    return `
            <tr id="${randomId}" data-row-id="${randomId}" class="product-items">
                <td class="sno-number" align="center">
                </td>
                <td data-row-id="${randomId}">
                    <select id="product-select2-${randomId}" data-row-id="${randomId}" class="form-control select2-products" style="width: 100%"  name="product[${randomId}][id]">
                        <option value="" selected></option>
                    </select>
                    <span><strong id="error_products_${randomId}_product_id" style="color: red;"></strong></span>
                </td>
                <td>
                    <input readonly data-row-id="${randomId}" id="product-code-${randomId}" name="product[${randomId}][code]" type="text" class="form-control" placeholder="${TRANS_PRODUCT_ID}" >
                </td>
                <td>
                    <input value="0" style="width: max-content" id="product-price-${randomId}"  data-row-id=${randomId}name="product[${randomId}][price]" type="text" class="form-control product-price" placeholder="${TRANS_PRICE}" >
                    <span><strong id="error_products_${randomId}_price" style="color: red;"></strong></span>
                </td>
                <td>
                    <input value="1" maxlength="6"  data-row-id="${randomId}" id="product-quantity-${randomId}" name="product[${randomId}][quantity]" type="text" class="form-control product-quantity" placeholder="${TRANS_QUANTITY}" >
                    <span><strong id="error_products_${randomId}_quantity" style="color: red;"></strong></span>
                </td>
                <td>
                    <input readonly value="0" data-row-id="${randomId}" id="product-amount-${randomId}" name="product[${randomId}][amount]" type="text" class="form-control product-amount" placeholder="${TRANS_AMOUNT}" >
                    <span><strong id="error_products_${randomId}_amount" style="color: red;"></strong></span>
                </td>
                <td>
                    <input style="width: 100%" id="product-remarks-${randomId}"  data-row-id="${randomId}" name="product[${randomId}][remarks]" type="text" class="form-control" placeholder="${TRANS_REMARKS}" >
                    <span><strong id="error_products_${randomId}_remarks" style="color: red;"></strong></span>
                </td>
                <td align="center">
                    <button type="button" class="btn btn-sm btn-danger remove-product-item" data-row-id="#${randomId}"><i class="fa fa-trash"></i></button></td>
            </tr>
        `;
}

function onRemoveProductItemEvent() {
    $('.remove-product-item').on("click", function () {
        let rowId = $(this).attr('data-row-id');
        $(rowId).remove();
        renderNoNumber();
        renderProductPriceInfo();
    });
}

function offRemoveProductItemEvent() {
    $('.remove-product-item').off("click");
}

function clearProductItemInfo(rowId) {
    $(`#product-code-${rowId}`).val("");
    $(`#product-price-${rowId}`).val("");
    $(`#product-quantity-${rowId}`).val(0);
    $(`#product-amount-${rowId}`).val("");
}

function setProductItemInfo(rowId, dataObject) {
    let defaultQty = 1;
    $(`#product-code-${rowId}`).val(dataObject.code);
    $(`#product-price-${rowId}`).val(dataObject.price);
    $(`#product-quantity-${rowId}`).val(defaultQty);
    $(`#product-amount-${rowId}`).val(parseFloat(dataObject.price) * defaultQty);
}

function onFilterInputProductItems() {
    $(".product-price").inputDoubleFilter(function (value) {
        return /^\d*$/.test(value);    // Allow digits only, using a RegExp
    });
    $(".product-quantity").inputFilter(function (value) {
        return /^\d*$/.test(value);    // Allow digits only, using a RegExp
    });
    $(".product-amount").inputDoubleFilter(function (value) {
        return /^\d*$/.test(value);    // Allow digits only, using a RegExp
    });
}

function renderProductPriceInfo() {
    let totalQty = 0;
    let totalAmount = 0;

    $(".product-items").map(function () {
        let rowId = $(this).attr('data-row-id');
        let priceSelector = $(`#product-price-${rowId}`);
        let qtySelector = $(`#product-quantity-${rowId}`);
        let amountSelector = $(`#product-amount-${rowId}`);

        let qty = parseInt(qtySelector.val());
        let price = parseFloat(priceSelector.val());
        let amount = qty * price;

        totalQty += qty;
        totalAmount += amount;

        amountSelector.val($.number(amount, 2));

    })

    $('#total-qty').val($.number(totalQty, 0));
    $('#total-amount').val($.number(totalAmount, 2));
}

function getProductItemsDetail() {
    let products = [];

    $(".product-items").map(function (key, value) {
        let rowId = $(this).attr('data-row-id');
        let priceSelector = $(`#product-price-${rowId}`);
        let qtySelector = $(`#product-quantity-${rowId}`);
        let amountSelector = $(`#product-amount-${rowId}`);
        let remarksSelector = $(`#product-remarks-${rowId}`);
        let productSelector = $(`#product-select2-${rowId}`);

        let productId = productSelector.val();
        let qty = parseInt(qtySelector.val());
        let price = parseFloat(priceSelector.val());
        let amount = qty * price;

        products.push({
            'index': key,
            'row_id': rowId,
            'product_id': productId,
            'price': price,
            'quantity': qty,
            'amount': amount,
            'remarks': remarksSelector.val()
        });
    })

    return products;
}

function onChangeQtyEvent() {
    $('.product-quantity').on('input', function () {
        renderProductPriceInfo();
    });
}

function offChangeQtyEvent() {
    $('.product-quantity').off('input');
}

function onChangePriceEvent() {
    $('.product-price').on('input', function () {
        renderProductPriceInfo();
    });
}

function offChangePriceEvent() {
    $('.product-price').off('input');
}

function clearError(products) {
    $(`#error_outlet_id`).html("");
    $(`#error_shipping_address`).html("");
    $(`#error_delivery_date`).html("");
    $(`#error_products`).html("");

    $.each(products, function (k, v) {
        let keyArr = [
            [`#error_products_${v.row_id}_product_id`],
            [`#error_products_${v.row_id}_code`],
            [`#error_products_${v.row_id}_price`],
            [`#error_products_${v.row_id}_quantity`],
            [`#error_products_${v.row_id}_amount`],
            [`#error_products_${v.row_id}_amount`],
        ];
        $.each(keyArr, function (index, data) {
            $(data[0]).html("")
        });

    });
}

function showError(products, errors) {

    $.each(errors, function (errorKey, value) {
        $(`#error_${errorKey}`).html(value[0]);
        $.each(products, function (k, v) {

            /**
             *
             * res: products.0.product_id, expect id as: error_products_${v.randomId}_product_id
             */
            let keyArr = [
                [`products.${k}.product_id`, `#error_products_${v.row_id}_product_id`],
                [`products.${k}.code`, `#error_products_${v.row_id}_code`],
                [`products.${k}.price`, `#error_products_${v.row_id}_price`],
                [`products.${k}.quantity`, `#error_products_${v.row_id}_quantity`],
                [`products.${k}.amount`, `#error_products_${v.row_id}_amount`],
                [`products.${k}.remarks`, `#error_products_${v.row_id}_amount`],
            ];
            $.each(keyArr, function (index, data) {
                if (errorKey == data[0]) {
                    $(data[1]).html(value[0])
                }
            });

        });
    });
}


//<!--End function area-->


//<!--Binding event-->
onFilterInputProductItems();
onRemoveProductItemEvent();
onChangeQtyEvent();
onChangePriceEvent();

$('.add-product-item').click(function () {
    let randomId = makeId(15);

    $("#product-item-body").append(productItemHtml(randomId));

    offRemoveProductItemEvent();
    onRemoveProductItemEvent();

    renderNoNumber();
    onFilterInputProductItems();

    offChangePriceEvent();
    onChangePriceEvent();

    offChangeQtyEvent();
    onChangeQtyEvent();

    renderProductPriceInfo();

    $(`#product-select2-${randomId}`).select2({
        ajax: {
            url: '/admin/products/select2/get-product',
            dataType: 'json',
            data: function (params) {
                return query = {
                    search: params.term,
                    page: params.page || 1
                }
            }
        }
    }).on('select2:selecting', function (e) {
        //Call api in here to product info
        let rowId = $(this).parent().attr('data-row-id');
        let productId = e.params.args.data.id;

        let ajaxOption = {
            url: `/admin/products/api/${productId}/show`,
            type: 'GET',
            data: {},
            success: function (result) {


                if (result.code === 0) {
                    clearProductItemInfo();
                    return;
                }
                setProductItemInfo(rowId, result.data)
                renderProductPriceInfo();

            },
            error: function (result) {
                console.log(result.responseJSON.message);
            }
        };
        $.ajax(ajaxOption);


    });
});

$('#outlet-id').on('change', function () {
    let shippingAddress = $('#shipping-address');
    let currentOutletId = parseInt($(this).val());

    if (isNaN(currentOutletId)) {
        shippingAddress.val("");
        return;
    }

    let ajaxOption = {
        url: `/admin/outlets/api/${currentOutletId}/show`,
        type: 'GET',
        data: {},
        success: function (result) {


            if (result.code === 0) {
                shippingAddress.val("");
                return;
            }

            shippingAddress.val(result.data.shipping_address);

            if (result.data.expected_delivery_total_day != '') {
                $('#expected-delivery-date').val(result.data.expected_delivery_date_from_now);
            }


        },
        error: function (result) {
            console.log(result.responseJSON.message);
        }
    };
    $.ajax(ajaxOption);
});

$('#btn-submit').on('click', function () {
    let checkoutObj = $(this);
    let url = checkoutObj.attr('data-url');
    let method = checkoutObj.attr('data-method');
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
                    let outletId = $('#outlet-id').val();
                    let shippingAddress = $('#shipping-address').val();
                    let expectedDeliveryDate = $('#expected-delivery-date').val();
                    let acknowledgeStatus = $('#acknowledge-status').val();
                    let products = getProductItemsDetail();

                    let ajaxOption = {
                        url: url,
                        type: method,
                        data: {
                            'outlet_id': outletId,
                            'shipping_address': shippingAddress,
                            'expected_delivery_date': expectedDeliveryDate,
                            'acknowledge_status': acknowledgeStatus,
                            'products': products
                        },
                        success: function (result) {

                            if (result.code === 0) {
                                //error
                                clientPopupMsg(TITLE, result.message)
                                return;
                            }

                            clientPopupMsgWithRedirectUrl(TITLE, result.message, window.location.href)
                        },
                        error: function (result) {

                            clientPopupMsg(TITLE, TRANS_ERROR_VALIDATE);
                            clearError(products);
                            showError(products, result.responseJSON.errors)

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

});

//<!--End binding event-->