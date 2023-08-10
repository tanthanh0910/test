
$(document).ready(function () {

    $("#btn-export-pdf").on("click", function () {
        const dateFromInput = $("input[name=date_from]").val();
        const dateToInput = $("input[name=date_to]").val();
        let factoryId = $("#factory option:selected").val();
        let productId = $("#product option:selected").val();

        let urlObject = new URL(defaultUrlObject);

        urlObject.searchParams.append('date_from', dateFromInput);
        urlObject.searchParams.append('date_to', dateToInput);
        if (typeof factoryId !== 'undefined') {
            urlObject.searchParams.append('factory_id', factoryId);
        }
        if (typeof productId !== 'undefined') {
            urlObject.searchParams.append('product_id', productId);
        }

        urlObject.searchParams.append('export_pdf', 1);
        window.open(urlObject.href, '_blank').focus();
    });
})