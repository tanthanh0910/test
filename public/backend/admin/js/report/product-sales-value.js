$(document).ready(function () {

    $("#btn-export-product-sales-excel").on("click", function () {
        const dateFromInput = $("input[name=dateForm]").val();
        const dateToInput = $("input[name=dateTo]").val();
        let productId = $("#product_id option:selected").val();

        let urlObject = new URL(defaultUrlObject);

        urlObject.searchParams.append('dateForm', dateFromInput);
        urlObject.searchParams.append('dateTo', dateToInput);
        if (typeof productId !== 'undefined') {
            urlObject.searchParams.append('product_id', productId);
        }

        urlObject.searchParams.append('export_excel', 1);
        window.open(urlObject.href, '_blank').focus();
    });
})