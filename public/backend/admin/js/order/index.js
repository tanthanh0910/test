/**
 * Function area
 */
function getTotalCheckedAcknowledge() {
    let totalChecked = 0;
    $('.acknowledge-checkbox-item').map(function () {
        let checked = $(this).is(":checked");
        if (checked) {
            totalChecked++;
        }
    });

    return totalChecked;
}

function hideOrShowAcknowledgeBtn() {
    let totalChecked = getTotalCheckedAcknowledge();
    if (totalChecked <= 0) {
        $('#acknowledge-submit').hide();
        return;
    }

    $('#acknowledge-submit').show();
}

function getTotalInputCheckElement() {
    let totalItem = 0;
    $('.acknowledge-checkbox-item').map(function () {
        totalItem++;
    })
    return totalItem;
}

function getCheckedItemsData() {
    let ids = [];
    $('.acknowledge-checkbox-item').map(function () {
        let checked = $(this).is(":checked");
        if (checked) {
            ids.push({'id': parseInt($(this).val())})
        }
    });

    return ids;
}

function onLoadingButton(id) {
    if (id == '.btn-loading-process') {
        return;
    }
    let $this = $(`#${id}`);
    $this.button('loading');
    $this.attr("disabled", true);
}

function offLoadingButton(id) {
    if (id == '.btn-loading-process') {
        return;
    }
    let $this = $(`#${id}`);
    $this.button('reset');
    $this.attr("disabled", false);
}

//comment
function confirmAcknowledge(checkoutObj, btnId, url, ids) {

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
                    onLoadingButton(btnId);
                    let ajaxOption = {
                        url: url,
                        type: 'POST',
                        data: {
                            'orders_ids': ids,
                        },
                        beforeSend: function () {
                            onLoadingButton(btnId);
                        },
                        success: function (result) {
                            offLoadingButton(btnId);
                            if (result.code === 0) {
                                //error
                                clientPopupMsg(TITLE, result.message)
                                return;
                            }

                            clientPopupMsgWithRedirectUrl(TITLE, result.message, window.location.href)
                        },
                        error: function (result) {
                            offLoadingButton(btnId);
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
    });
}

/**
 * End function area
 */


//<!--Call function-->
hideOrShowAcknowledgeBtn();

//<!--end call function-->

//<!---Object event-->
if ($('.acknowledge-checkbox-item').length) {
    $('.acknowledge-checkbox-item').on('click', function () {
        hideOrShowAcknowledgeBtn();
        let totalChecked = getTotalCheckedAcknowledge();
        let totalInput = getTotalInputCheckElement();

        if (totalInput > totalChecked) {
            $('#acknowledge-all').prop('checked', false);
        }


        if (!(totalInput - totalChecked) && totalChecked > 0) {
            $('#acknowledge-all').prop('checked', true);
        }


    });
}

if ($('#acknowledge-all').length) {
    $('#acknowledge-all').on('click', function () {
        let checked = $(this).is(":checked");
        if (!checked) {
            $('.acknowledge-checkbox-item').map(function () {
                $(this).prop('checked', false);
            });
            hideOrShowAcknowledgeBtn();
            return;
        }

        $('.acknowledge-checkbox-item').map(function () {
            $(this).prop('checked', true)
        });
        hideOrShowAcknowledgeBtn();
    });
}

if ($('#acknowledge-submit').length) {
    $('#acknowledge-submit').on('click', function () {
        let ids = getCheckedItemsData();
        let checkoutObj = $(this);
        let btnId = checkoutObj.attr('data-btn-id');
        let url = checkoutObj.attr('data-url');
        confirmAcknowledge(checkoutObj, btnId, url, ids);
    });
}

if ($('.btn-acknowledge-item').length) {
    $('.btn-acknowledge-item').on('click', function () {
        let ids = [{id: $(this).attr('data-id')}];
        let checkoutObj = $(this);
        let btnId = checkoutObj.attr('data-btn-id');
        let url = checkoutObj.attr('data-url');
        confirmAcknowledge(checkoutObj, btnId, url, ids);
    });
}


//<!--End object event-->