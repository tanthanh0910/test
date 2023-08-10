function clearTextOfApiErrors(formId, prefixErrorSpanContent = "") {
    $(`${formId} input, ${formId} select`).each(
        function (index) {
            let inputName = $(this).attr('name');
            let errorElement = $(`#${prefixErrorSpanContent}${inputName}`);
            if (errorElement.length > 0) {
                $(`#${prefixErrorSpanContent}${inputName} .text-danger`).html("");
            }
        }
    );
}

function showTextOfApiErrors(errors, prefixErrorSpanContent = "") {

    Object.keys(errors).forEach(function (key) {

        let errorElement = $(`#${prefixErrorSpanContent}${key}`);
        if (errorElement.length > 0) {
            $(`#${prefixErrorSpanContent}${key} .text-danger`).html(`[-] ${errors[key]}`);
        }

    });
}

function showTextOfApiErrorInSpecificFormData(errors, formId, prefixErrorSpanContent = "") {

    Object.keys(errors).forEach(function (key) {

        let errorElement = $(`${formId} #${prefixErrorSpanContent}${key}`);
        if (errorElement.length > 0) {
            $(`${formId} #${prefixErrorSpanContent}${key} .text-danger`).html(`[-] ${errors[key]}`);
        }

    });
}

function disableBtn(idName) {
    document.getElementById(idName).disabled = true;
}

function enableBtn(idName) {
    document.getElementById(idName).disabled = false;
}