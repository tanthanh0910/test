function renderNoNumber() {
    let snoNumberSelector = $('.sno-number');
    if (snoNumberSelector.length) {
        let count = 1;
        snoNumberSelector.map(function () {
            $(this).html(`${count}`);
            count++;
        })
    }
}


if ($('#submit-form-btn').length) {

    $("#submit-form-btn").click(function () {
        if (typeof $(this).attr('data-form-id') === 'undefined') {
            alert("data-form-id attribute is required")
            return;
        }

        let formId = $(this).attr('data-form-id');

        if (formId.length === 0) {
            alert("data-form-id attribute value is required")
            return;
        }

        $(formId).submit();
    });

}


function makeId(length = 15) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}





