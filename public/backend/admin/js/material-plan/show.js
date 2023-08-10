$('.update-status').on('click', function () {
    let url = $(this).attr('data-href');
    let ajaxOption = {
        url: url,
        type: 'POST',

        success: function (result) {

            if (result.code === 0) {
                //error
                clientPopupMsg(TITLE, result.message)
                return;
            }

            clientPopupMsgWithRedirectUrl(TITLE, result.message, window.location.href)
        },
        error: function (result) {
        }
    };
    $.ajax(ajaxOption);
});