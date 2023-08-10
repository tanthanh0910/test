$('.update-invoices-billing-organization').on('change', function () {
    let value = $(this).val();
    let url = $(this).attr('data-url');
    let _this = $(this);
    $.confirm({
        width: 'auto',
        title: _this.attr('data-title'),
        content: _this.attr('data-message'),
        type: 'red',
        typeAnimated: true,
        buttons: {
            tryAgain: {
                text: _this.attr('data-btn-confirm'),
                btnClass: 'btn-red',
                action: function () {
                    let ajaxOption = {
                        url: url,
                        type: 'POST',
                        data: {
                            'billing_organization': value,
                        },
                        success: function (result) {
                            if (result.code === 1) {
                                clientPopupMsg(_this.attr('data-title'), result.message)
                                return;
                            }

                        },
                        error: function (result) {
                            clientPopupMsg(_this.attr('data-title'), result.responseJSON.message);
                        }
                    };
                    $.ajax(ajaxOption);
                }
            },
            close: {
                text: _this.attr('data-btn-cancel'),
                action: function () {
                }
            },
        }
    });
});