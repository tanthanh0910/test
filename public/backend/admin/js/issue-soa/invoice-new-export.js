$('#btn-soa-export-download').on("click", function () {
    let outletId = $("#outlet-id-modal").find(":selected").val();
    let monthAndYear = $('#month-and-year-modal').val();
    let hasError = false;

    $('#error_outlet_id_modal').html('');
    $('#error_month_and_year_modal').html('');

    if (!outletId) {
        $('#error_outlet_id_modal').html(REQUIRED_DATA_MSG);
        hasError = true;
    }


    if (!monthAndYear) {
        $('#error_month_and_year_modal').html(REQUIRED_DATA_MSG);
        hasError = true;
    }

    if (hasError) {
        return;
    }


    let urlRedirect = issueSOABaseUrl;
    urlRedirect = urlRedirect.replace('outletId', outletId)
    urlRedirect = urlRedirect.replace('monthAndYear', monthAndYear)

    let checkBaseUrl = CHECK_BILLING_ORGANIZATION_URL;

    let editInvoiceUrl = EDIT_INVOICE_URL;


    checkBaseUrl = checkBaseUrl.replace('_outletId', outletId)
    checkBaseUrl = checkBaseUrl.replace('_monthAndYear', monthAndYear)
    let _this = $(this)
    let ajaxOption = {
        url: checkBaseUrl,
        type: 'GET',
        success: function (result) {
            if(result.code == 0 && !result.data){
                clientPopupMsg(_this.attr('data-title'), result.message);
                return;
            }

            if (result.code === 0 && result.data.length > 0) {
                let invoices = result.data;
                $("#myModal").modal("show");
                let options = "";
                invoices.forEach((element) => {
                        let invoiceCode = element.invoice_code;
                        let invoiceId = editInvoiceUrl.replace("_invoice",element.invoice_id);
                options += `
                            <tr>
                                <td>${invoiceCode}</td>
                                 <td><a target=”_bank” href="${invoiceId}">${invoiceId}</a></td>
                            </tr>
                            `;
                });
                $('#modal-check-billing-organization').html(options);

                return;
            }

            if (result.code === 1) {
                console.log('message', result.message);
                window.open(urlRedirect, 'SOA');
                // clientPopupMsg(_this.attr('data-title'), result.message)
                return;
            }

        },
        error: function (result) {
            clientPopupMsg(_this.attr('data-title'), result.responseJSON.message);
        }
    };
    $.ajax(ajaxOption);

});