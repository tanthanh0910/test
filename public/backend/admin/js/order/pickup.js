//<!--Function area->
function renderProductInfo(detail) {
    if (!detail) {
        $('#product-name').html('');
        $('#product-required-qty').html('');
        return;
    }
    $('#product-name').html(detail.final_name);
    $('#product-required-qty').html(detail.quantity);
    $('#required-quantity-input').val(detail.quantity);
}

function renderSuggestedProducts(products) {

    if (!products || !products.length) {
        $('#suggested-products').html(`
            <tr>
                <td colspan="2"><a target="_blank" href="${window.ADD_INVENTORY_STOCK_URL}">${window.NO_SUGGESTED_PRODUCT}</a></td>
            </tr>
        `);
        return;
    }
    let html = '';
    $.each(products, function (index, item) {
        let template = `<tr>
                    <td align="left">${item.batch_no} <button class="btn btn-primary btn-sm btn-copy-batch-no" data-batch-no="${item.batch_no}"><i class="fa fa-copy"></i></button></td>
                    <td align="center">${item.available_quantity}</td>
                </tr>`;
        html += template;

    });

    $('#suggested-products').html(html);
    offCopyBatchNoEvent();
    onCopyBatchNoEvent();

}

function onCopyBatchNoEvent() {
    $('.btn-copy-batch-no').on('click', function () {
        renderBatchNoRowData($(this).attr('data-batch-no'), false);
        // navigator.clipboard.writeText($(this).attr('data-batch-no'));
    });
}

function offCopyBatchNoEvent() {
    $('.btn-copy-batch-no').off('click');
}

function onDeleteBatchNoEvent() {
    $('.btn-remove-batch-no').on('click', function () {
        let rowId = $(this).attr('data-row-id');
        $(`#batch-no-row-${rowId}`).remove();
        renderTotalQty();
    });
}

function offDeleteBatchNoEvent() {
    $('.btn-remove-batch-no').off('click');
}

function onInputQtyEvent() {
    $('.batch-no-qty').on('input', function () {
        renderTotalQty();
    });
}

function offInputQtyEvent() {
    $('.batch-no-qty').off('input');
}

function renderTotalQty() {
    let qty = 0;
    $(".batch-no-rows").map(function (key, value) {
        let rowId = $(this).attr('data-row-id');
        qty += parseInt($(`#batch-no-qty-${rowId}`).val())

    });
    $('#total-quantity').val($.number(qty))
}

function renderBatchNoRowData(batchNo, isScan = false) {

    let found = false;
    let defaultQty = parseInt($('#required-quantity-input').val());

    if (batchNo && $(".batch-no-rows").length > 0) {
        $(".batch-no-rows").map(function (key, value) {
            let rowId = $(this).attr('data-row-id');
            let alreadyBatchNo = $(`#batch-no-text-${rowId}`).val();
            if (alreadyBatchNo == batchNo) {
                let oldQty = parseInt($(`#batch-no-qty-${rowId}`).val());
                oldQty = oldQty + defaultQty;
                $(`#batch-no-qty-${rowId}`).val(oldQty);
                found = true;
            }
        });
        renderTotalQty();
    }

    if (found) {
        return;
    }

    let scanAction = isScan ? TRANS_SCAN : '';
    let randomId = makeId();

    let html = `
        <tr id="batch-no-row-${randomId}" class="batch-no-rows" data-row-id="${randomId}">
            <td align="center" class="text-warning strong-text">${scanAction}</td>
            <td align="left">
                <input type="text" maxlength="100" class="form-control batch-no-text" data-row-id="${randomId}" id="batch-no-text-${randomId}"  value="${batchNo}">
                <span style="color: red; font-weight: bolder" id="error_inventory_details_${randomId}_batch_no"> </span>
            </td>
            <td align="left">
                <input type="text" maxlength="10" class="form-control batch-no-qty" data-row-id="${randomId}"  id="batch-no-qty-${randomId}" value="${defaultQty}">
                <span style="color: red; font-weight: bolder" id="error_inventory_details_${randomId}_quantity"> </span>
            </td>
            <td align="center">
                <button data-row-id="${randomId}" class="btn btn-danger btn-remove-batch-no"><i class="fa fa-trash"></i></button>
            </td>
        </tr>
    `;
    $('#pickup-row-data').append(html);

    offDeleteBatchNoEvent();
    onDeleteBatchNoEvent();

    offInputQtyEvent();
    onInputQtyEvent();

    onFilterInputProductItems();

    renderTotalQty();
}

function onFilterInputProductItems() {
    $(".batch-no-qty").inputFilter(function (value) {
        return /^\d*$/.test(value);    // Allow digits only, using a RegExp
    });
}

function getBatchNoItemsDetail() {
    let batchNoArr = [];

    $(".batch-no-rows").map(function (key, value) {
        let rowId = $(this).attr('data-row-id');
        let batchNoSelector = $(`#batch-no-text-${rowId}`);
        let qtySelector = $(`#batch-no-qty-${rowId}`);


        let batchNo = batchNoSelector.val();
        let qty = parseInt(qtySelector.val());

        batchNoArr.push({
            'index': key,
            'row_id': rowId,
            'batch_no': batchNo,
            'quantity': qty,
        });
    })

    return batchNoArr;
}

function getBatchNoItemsOfOrderDetailRow(orderDetailId) {
    let batchNoArr = [];
    let rowDataSelector = $(`#table-pickup-item-${orderDetailId}`);
    rowDataSelector.find('tbody tr').each(function () {
        let batchNo = $(this).find('.select2-pickup').val();
        let qty = parseInt($(this).find('.batch-no-qty').val());
        batchNoArr.push({
            'batch_no': batchNo,
            'quantity': qty,
        })
    })

    return batchNoArr;
}


function clearError(inventoryDetails) {
    $(`#error_inventory_details`).html("");
    $.each(inventoryDetails, function (k, v) {
        let keyArr = [
            [`#error_inventory_details_${v.row_id}_batch_no`],
            [`#error_inventory_details_${v.row_id}_quantity`],
        ];
        $.each(keyArr, function (index, data) {
            $(data[0]).html("")
        });

    });
}

function showError(inventoryDetails, errors) {


    $.each(errors, function (errorKey, value) {
        $(`#error_${errorKey}`).html(value[0]);
        $.each(inventoryDetails, function (k, v) {

            /**
             *
             * res: products.0.product_id, expect id as: error_products_${v.randomId}_product_id
             */
            let keyArr = [
                [`inventory_details.${k}.batch_no`, `#error_inventory_details_${v.row_id}_batch_no`],
                [`inventory_details.${k}.quantity`, `#error_inventory_details_${v.row_id}_quantity`],
            ];
            $.each(keyArr, function (index, data) {
                if (errorKey == data[0]) {
                    $(data[1]).html(value[0])
                }
            });

        });
    });
}

function showUniqueBatchNo(batchNoRes, msg) {
    $(".batch-no-rows").map(function (key, value) {
        let rowId = $(this).attr('data-row-id');
        let batchNoSelector = $(`#batch-no-text-${rowId}`);


        let batchNo = batchNoSelector.val();
        if (batchNo == batchNoRes) {
            $(`#error_inventory_details_${rowId}_batch_no`).html(msg)
        }
    })
}

function showUniqueBatchNoOfOrderDetail(orderDetailId, batchNoRes, msg) {
    let rowDataSelector = $(`#table-pickup-item-${orderDetailId}`);
    rowDataSelector.find('tbody tr').each(function () {
        let batchNo = $(this).find('.select2-pickup').val();
        if (batchNo == batchNoRes) {
            $(this).find(`#error-batch-no-${orderDetailId}`).html(msg.replace('Batch No: ', ''));
        }
    })
}

function clearShowUniqueBatchNoOfOrderDetail(orderDetailId) {
    let rowDataSelector = $(`#table-pickup-item-${orderDetailId}`);
    rowDataSelector.find('tbody tr').each(function () {
        $(this).find(`#error-batch-no-${orderDetailId}`).html("");
    })
}

function offDeleteRowBatchNoEvent() {
    $('.btn-remove-batch-no').off('click');
}
function onDeleteRowBatchNoEvent() {
    $('.btn-remove-batch-no').on('click', function () {
        $(this).parent().parent().remove();
    });
}


//<!--End function area-->


//<!--Binding event-->
onCopyBatchNoEvent();
onDeleteBatchNoEvent();
onFilterInputProductItems();
onDeleteRowBatchNoEvent();

$('.btn-add-batch-no').on('click', function () {
    renderBatchNoRowData('', false)
});

// btn-copy-batch-no

$('.confirm-product-item').on('click', function () {
    let url = $(this).attr('data-url');
    let pickupUrl = $(this).attr('data-pickup-product-url');
    let ajaxOption = {
        url: url,
        type: 'GET',
        success: function (result) {

            if (result.code === 0) {
                //error
                clientPopupMsg(TITLE, result.message)
                return;
            }

            renderProductInfo(result.data.detail);
            renderSuggestedProducts(result.data.products);
            $('#total-quantity').val(0);
            $('#pickup-row-data').html('');
            $('#pickup-url').val(pickupUrl);
            $('#modal-pickup').modal('show');
            console.log("show data in here");
        },
        error: function (result) {
            clientPopupMsg(TITLE, result.responseJSON.message)

        }
    };
    $.ajax(ajaxOption);

});

//old function will be removed
// $('#btn-pickup-product').on('click', function () {
//     console.log("Don't use it one");return
//     let checkoutObj = $(this);
//     let url = $('#pickup-url').val();
//     let method = 'POST';
//
//     $.confirm({
//         width: 'auto',
//         title: checkoutObj.attr('data-title'),
//         content: checkoutObj.attr('data-msg'),
//         type: 'red',
//         typeAnimated: true,
//         buttons: {
//             tryAgain: {
//                 text: checkoutObj.attr('data-btn-confirm'),
//                 btnClass: 'btn-red',
//                 action: function () {
//                     let inventoryDetails = getBatchNoItemsDetail();
//
//                     let ajaxOption = {
//                         url: url,
//                         type: method,
//                         data: {
//                             'inventory_details': inventoryDetails
//                         },
//                         success: function (result) {
//                             clearError(inventoryDetails);
//                             if (result.code === 0) {
//                                 //error
//                                 clientPopupMsg(TITLE, result.message)
//                                 if (result.data.type == 'unique_batch_no') {
//                                     showUniqueBatchNo(result.data.batch_no, result.message)
//                                 }
//                                 return;
//                             }
//
//                             clientPopupMsgWithRedirectUrl(TITLE, result.message, $('#orders-pickup-url').val());
//                         },
//                         error: function (result) {
//                             if (result.status && result.status == 401) {
//                                 clientPopupMsg(TITLE, result.responseJSON.message);
//                                 return;
//                             }
//
//
//                             clientPopupMsg(TITLE, TRANS_ERROR_VALIDATE);
//                             clearError(inventoryDetails);
//                             showError(inventoryDetails, result.responseJSON.errors)
//
//                         }
//                     };
//                     $.ajax(ajaxOption);
//                 }
//             },
//             close: {
//                 text: checkoutObj.attr('data-btn-cancel'),
//                 action: function () {
//                 }
//             },
//         }
//     });
//
// });

//old function  => will be removed
// $('.auto-confirm-product-item').on('click', function () {
//     console.log("Don't use it two");return
//     let checkoutObj = $(this);
//     let url = $(this).attr('data-auto-pickup-product-url');
//     let method = 'POST';
//     $.confirm({
//         width: 'auto',
//         title: checkoutObj.attr('data-title'),
//         content: checkoutObj.attr('data-msg'),
//         type: 'red',
//         typeAnimated: true,
//         buttons: {
//             tryAgain: {
//                 text: checkoutObj.attr('data-btn-confirm'),
//                 btnClass: 'btn-red',
//                 action: function () {
//
//                     let ajaxOption = {
//                         url: url,
//                         type: method,
//                         data: {
//                         },
//                         success: function (result) {
//
//                             if (result.code === 0) {
//                                 //error
//                                 clientPopupMsg(TITLE, result.message)
//                                 return;
//                             }
//
//                             clientPopupMsgWithRedirectUrl(TITLE, result.message, checkoutObj.attr('data-url'));
//                         },
//                         error: function (result) {
//                             if (result.status && result.status == 401) {
//                                 clientPopupMsg(TITLE, result.responseJSON.message);
//                                 return;
//                             }
//
//                         }
//                     };
//                     $.ajax(ajaxOption);
//                 }
//             },
//             close: {
//                 text: checkoutObj.attr('data-btn-cancel'),
//                 action: function () {
//                 }
//             },
//         }
//     });
// })

//auto pickup product
$('.confirm-product').on('click', function () {
    let checkoutObj = $(this);
    let orderDetailId = checkoutObj.attr('data-detail-id');
    let url = checkoutObj.attr('data-pickup-product-url');
    let method = 'POST';

    $.confirm({
        width: 'auto',
        title: checkoutObj.attr('data-title'),
        content: checkoutObj.attr('data-msg'),
        type: 'red',
        typeAnimated: true,
        buttons: {
            tryAgain: {
                text: checkoutObj.attr('data-btn-confirm'),
                btnClass: 'btn-red',
                action: function () {
                    let inventoryDetails = getBatchNoItemsOfOrderDetailRow(orderDetailId); //[{'batch_no' : 'xxx', 'quantity' : 10}]
                    let ajaxOption = {
                        url: url,
                        type: method,
                        data: {
                            'inventory_details': inventoryDetails
                        },
                        success: function (result) {
                            clearShowUniqueBatchNoOfOrderDetail(orderDetailId);
                            if (result.code === 0) {
                                //error
                                clientPopupMsg(TITLE, result.message)
                                if (result.data.type == 'unique_batch_no') {
                                    showUniqueBatchNoOfOrderDetail(orderDetailId, result.data.batch_no, result.message)
                                }
                                return;
                            }
                            window.location.reload($('#orders-pickup-url').val());

                            // clientPopupMsgWithRedirectUrl(TITLE, result.message, $('#orders-pickup-url').val());
                        },
                        error: function (result) {
                            clearShowUniqueBatchNoOfOrderDetail(orderDetailId);
                            if (result.status && result.status == 401) {
                                clientPopupMsg(TITLE, result.responseJSON.message);
                                return;
                            }

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

$('.select2-pickup').select2({width: "100%"});

$('.btn-add-more-row').on('click', function () {
    let orderDetailId = $(this).attr('data-order-detail-id');
    let tableElement = $(`#table-pickup-item-${orderDetailId}`);
    let batchNoInfoUrl = $(this).attr('data-batch-no-info');
    let requiredQty = parseInt($(`#row-quantity-required-${orderDetailId}`).attr('data-quantity'));

    let template = `
        <tr class="row-data" data-order-detail-id="${orderDetailId}">
            <td style="text-align: center">
                <select name="" id="" class="select2-pickup">
                    
                </select>
                <span id="error-batch-no-${orderDetailId}" style="color: red"></span>
            </td>
            <td style="text-align: center"><input type="number" min="0" value="0" class="form-control batch-no-qty"></td>
            <td style="text-align: center">
                <button type="button" class="btn btn-danger btn-remove-batch-no"><i class="fa fa-minus"></i></button></td>
        </tr>
    `;

    $(`#table-pickup-item-${orderDetailId} tbody`).append(template)
    offDeleteRowBatchNoEvent();
    onDeleteRowBatchNoEvent();

    $('.select2-pickup').select2({
        ajax: {
            url: batchNoInfoUrl,
            dataType: 'json',
            data: function (params) {
                return {
                    search: params.term,
                    page: params.page || 1
                }
            }
        },
        "language": {
            "noResults": function(){
                return "No results";
            }
        },
        width: "100%"
    });

})

//disable when no inventory avaible
if ($('.disable-confirm-button').length > 0) {
    $('.disable-confirm-button').each(function () {
        let detailId = $(this).attr('data-order-detail-id');console.log(detailId);
        let hideBtnSelector = $(`#btn-confirm-${detailId}`);
        hideBtnSelector.remove();
    });
}

//<!--End binding event-->