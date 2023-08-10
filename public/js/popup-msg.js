function popupMsg(msg, reloadCurrentPage = false) {
    if (reloadCurrentPage) {
        return $.confirm({
            title: 'Alert',
            content: msg,
            buttons: {
                ok: function () {
                    window.location.reload();
                }
            }
        });
    }

    return $.alert({
        title: 'Alert',
        content: msg,
    });
}


function popupMsgWithRedirectUrl(msg, url) {
    return $.confirm({
        title: 'Alert',
        content: msg,
        buttons: {
            ok: function () {
                window.location.replace(url);
            }
        }
    });
}