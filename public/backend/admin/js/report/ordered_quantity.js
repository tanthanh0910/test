
$(document).ready(function () {

    $("#btn-export-product-sales-excel").on("click", function () {
        const dateFromInput = $("input[name=date_from]").val();
        const dateToInput = $("input[name=date_to]").val();
        let factoryId = $("#factory option:selected").val();

        let urlObject = new URL(defaultUrlObject);

        urlObject.searchParams.append('date_from', dateFromInput);
        urlObject.searchParams.append('date_to', dateToInput);
        if (typeof factoryId !== 'undefined') {
            urlObject.searchParams.append('factory_id', factoryId);
        }

        urlObject.searchParams.append('export_excel', 1);
        window.open(urlObject.href, '_blank').focus();
    });
})