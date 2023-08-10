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
function inventoryInfoItemHtml() {
    let nowDate  = (new Date()).toISOString().split('T')[0];
    let randomId = makeId(15);
    return `
            <tr id="${randomId}">
                <td>
                    <select class="form-control select2Material" style="width: max-content"  name="formula[${randomId}][material]">
                        <option value="" selected>Select Material</option>
                    </select>
                </td>
                <td>
                    <input name="formula[${randomId}][quantity]" style="width: max-content" type="text" class="form-control" placeholder="Quantity" >
                </td>
                <td>
                    <select class="form-control select2Uom" style="width: max-content"  name="formula[${randomId}][uom]">
                        <option value="" selected>Select UOM</option>
                    </select>
                </td>
                <td align="center">
                    <button type="button" class="btn btn-sm btn-danger remove-inventory-info" data-row-id="#${randomId}"><i class="fa fa-trash"></i></button></td>
            </tr>
        `;
}


$('.remove-inventory-info').click(function () {
    let rowId = $(this).attr('data-row-id');
    $(rowId).remove();
});

$('.add-more-inventory-info').click(function () {
    let htmlItem = inventoryInfoItemHtml();
    $("#inventory-info-body").append(htmlItem);

    $(".remove-inventory-info").unbind("click");
    $(".remove-inventory-info").bind("click", function () {
        let rowId = $(this).attr('data-row-id');
        $(rowId).remove();
    });

    $('.select2Material').select2({
        ajax: {
            url: 'admin/products/select2-material/get-material',
            dataType: 'json',
            data: function (params) {
                var query = {
                    search: params.term,
                    page: params.page || 1
                }

                // Query parameters will be ?search=[term]&page=[page]
                return query;
            }
            /*data: function (params) {
                console.log(params)
                return {
                    search: params.term,
                    page: params.page || 1
                }
            },
            processResults: function (data, params) {
                params.page = params.page || 1;

                return {
                    results: data.results,
                    pagination: {
                        more: (params.page * 2) < data.count_filtered
                    }
                };
            }*/
        }
    });
    $('.select2Uom').select2({
        ajax: {
            url: 'admin/products/select2-uom/get-product',
            dataType: 'json',
            data: function (params) {
                var query = {
                    search: params.term,
                    page: params.page || 1
                }

                // Query parameters will be ?search=[term]&page=[page]
                return query;
            }
            // data: function (params) {
            //     console.log(params)
            //     return {
            //         search: params.term,
            //         page: params.page || 1
            //     }
            // },
            // processResults: function (data, params) {
            //     params.page = params.page || 1;
            //
            //     return {
            //         results: data.results,
            //         pagination: {
            //             more: (params.page * 2) < data.count_filtered
            //         }
            //     };
            // }
        }
    });
});