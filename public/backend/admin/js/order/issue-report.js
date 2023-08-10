if ($('.btn-solved-item').length) {
    $('.btn-solved-item').on('click', function () {
        let ids = $(this).attr('data-id');
        let btnId = $(this).attr('data-btn-id');
        let url = $(this).attr('data-url');
        let checkoutObj = $(this);
        confirmSolved(checkoutObj,btnId, url, ids);
    });
}

function confirmSolved(checkoutObj,btnId,url,ids)
{
    $.confirm({
        width: 'auto',
        title: checkoutObj.attr('data-title'),
        content: checkoutObj.attr('data-message'),
        type: 'red',
        typeAnimated: true,
        buttons: {
            tryAgain: {
                text: checkoutObj.attr('data-btn-confirm'),
                btnClass: 'btn-red',
                action: function () {
                    let ajaxOption = {
                        url: url,
                        type: 'POST',
                        data: {
                            'id': ids,
                        },
                        success: function (result) {
                            if (result.code === 0) {
                                //error
                                clientPopupMsg(TITLE, result.message)
                                return;
                            }

                            clientPopupMsgWithRedirectUrlForSolved(TITLE, result.message)
                        },
                        error: function (result) {
                            clientPopupMsg(TITLE, result.responseJSON.message);
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
    })
}

function clientPopupMsgWithRedirectUrlForSolved(title, msg) {
    return $.confirm({
        title: title,
        content: msg,
        buttons: {
            ok: function () {
                window.location.reload();
            }
        }
    });
}