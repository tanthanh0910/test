//<!--Declare variable-->
//<!--End declare-->

//<!-- Declare function -->


function invoicesInfoItemHtml() {
    let randomId = makeId(15);

    return `
            <tr id="${randomId}">
                <td class="sno-number" align="center">
                </td>
                <td>
                    <input name="items[${randomId}][description]" type="text" class="form-control" >
                </td>
                <td>
                    <input name="items[${randomId}][amount]" type="text" class="form-control items-amount" value="0" >
                </td>
                <td align="center">
                    <button type="button" class="btn btn-sm btn-danger remove-invoices-info" data-row-id="#${randomId}"><i class="fa fa-trash"></i></button></td>
            </tr>
            `;
}


//input-float.js
$(".items-amount").inputDoubleFilter(function (value) {
    return /^\d*$/.test(value);    // Allow digits only, using a RegExp
});
//input-float.js


//<!--End declare function-->


//<--Declare variable or init function -->
function onDeleteItemEvent() {
    let removeInvoiceSelector = $('.remove-invoices-info');
    removeInvoiceSelector.on("click", function () {
        let rowId = $(this).attr('data-row-id');
        console.log(rowId);
        $(rowId).remove();
        renderNoNumber();
        reCalculatorAmount();
    });
}

function offDeleteItemEvent() {
    let removeInvoiceSelector = $('.remove-invoices-info');
    removeInvoiceSelector.off("click");
}

function reCalculatorAmount() {
    let totalAmount = 0;
    let amountSelector = $('.items-amount');

    amountSelector.map(function () {
        let itemAmount = parseFloat($(this).val());
        if (isNaN(itemAmount)) {
            itemAmount = 0;
        }

        totalAmount += itemAmount;
    })

    $('#total-due').html($.number(totalAmount, 2));
}

function onAmountKeyInput() {
    let amountSelector = $('.items-amount');

    if (amountSelector.length) {
        amountSelector.on("input", function () {
            reCalculatorAmount();
        });

    }
}

function offAmountKeyInput() {
    let amountSelector = $('.items-amount');
    amountSelector.off("input");
}

//<--End Declare variable or init function


//<!--Declare event-->
onDeleteItemEvent();
onAmountKeyInput();
reCalculatorAmount();

$('.add-more-invoices-info').click(function () {
    let htmlItem = invoicesInfoItemHtml();

    $("#inventory-info-body").append(htmlItem);
    renderNoNumber();

    offDeleteItemEvent();
    onDeleteItemEvent();

    offAmountKeyInput();
    onAmountKeyInput();

    reCalculatorAmount();

    $(".items-amount").inputDoubleFilter(function (value) {
        return /^\d*$/.test(value);    // Allow digits only, using a RegExp
    });
});

$('#outlet-id').on('change', function () {
    let billingToSelector = $('#billing-to');
    let billingAddressSelector = $('#billing-address');
    let currentOutletId = parseInt($(this).val());

    if (isNaN(currentOutletId)) {
        billingToSelector.val("");
        billingAddressSelector.val("");
        return;
    }

    let ajaxOption = {
        url: `/admin/outlets/api/${currentOutletId}/show`,
        type: 'GET',
        data: {},
        success: function (result) {


            if (result.code === 0) {
                //error
                console.log(result.message);
                billingToSelector.val("");
                billingAddressSelector.val("");
                return;
            }

            billingToSelector.val(result.data.billing_to);
            billingAddressSelector.val(result.data.billing_address);

        },
        error: function (result) {
            console.log(result.responseJSON.message);
        }
    };
    $.ajax(ajaxOption);
});