function clientPopupMsg(title, msg, reloadCurrentPage = false) {
    if (reloadCurrentPage) {
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

    return $.alert({
        title: title,
        content: msg,
    });
}


function clientPopupMsgWithRedirectUrl(title, msg, url) {
    return $.confirm({
        title: title,
        content: msg,
        buttons: {
            ok: function () {
                window.location.replace(url);
            }
        }
    });
}