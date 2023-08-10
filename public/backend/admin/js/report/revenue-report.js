$(document).ready(function () {

    $("#btn-export-excel").on("click", function () {
        const dateFromInput = $("input[name=dateForm]").val();
        const dateToInput = $("input[name=dateTo]").val();
        let outletId = $("#outlet_id option:selected").val();

        let urlObject = new URL(defaultUrlObject);

        urlObject.searchParams.append('dateForm', dateFromInput);
        urlObject.searchParams.append('dateTo', dateToInput);
        if (typeof outletId !== 'undefined') {
            urlObject.searchParams.append('outlet_id', outletId);
        }

        urlObject.searchParams.append('export_excel', 1);
        window.open(urlObject.href, '_blank').focus();
    });
})