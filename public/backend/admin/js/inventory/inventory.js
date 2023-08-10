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

function renderNumber()
{
    if ($('.number-stt-inventories')) {
        let number = 1;
        $('.number-stt-inventories').filter(function () {
            $(this).html(`${number}`);
            number++;
        })
    }
}
function inventoryInfoItemHtml() {
    let randomId = makeId(15);
    const d = new Date()
    return `
            <tr id="${randomId}">
                <td hidden align="center">
                    <input id="products-${randomId}-product-name-hidden" name="products[${randomId}][product_name]" type="text">
                </td>
                <td class="number-stt-inventories">
                    <div>1</div>
                </td>
                <td>
                    <select data-value-id="${randomId}" id="products-${randomId}-product-name" class="form-control select2Inventory product_name_id" style="width: max-content"  name="products[${randomId}][product_id]">
                        <option value="" selected>Select Product Name</option>
                    </select>
                </td>
                <td class="child_product_name_id">
<!--                    <span id="formula-${randomId}-productId">0</span>-->
                    <input readonly id="products-${randomId}-productId" name="products[${randomId}][code]" type="text" class="form-control" placeholder="Product ID" >
                </td>
                <td>
                    <input id="products-${randomId}-manufacture-date" style="width: max-content" name="products[${randomId}][manufacture_date]" value="${d.toLocaleDateString('en-CA')}" type="date" class="form-control" placeholder="Manufacture Date" >
                </td>
                <td>
                    <input readonly id="products-${randomId}-batch-no"  name="products[${randomId}][batch_no]" type="text" class="form-control" placeholder="Batch No" >
                </td>
                <td>
                    <input name="products[${randomId}][quantity]" type="number" class="form-control" placeholder="Quantity" >
                </td>
                <td>
<!--                    <span id="formula-${randomId}-uom">0</span>-->
                    <input id="products-${randomId}-uom" readonly  name="products[${randomId}][uom]" type="text" class="form-control" placeholder="uom" >
                </td>
                <td align="center">
                    <button type="button" class="btn btn-sm btn-danger remove-inventory-info" data-row-id="#${randomId}"><i class="fa fa-trash"></i></button></td>
            </tr>
        `;
}

$('.remove-inventory-info').click(function () {
    let rowId = $(this).attr('data-row-id');
    $(rowId).remove();
    renderNumber()
});
if ($('.product_name_ids').length > 0) {

    $(".product_name_ids").change(function () {
        var dataValueId = $(this).attr('data-value-id');
        if ($(this).val() > 0) {
            $.ajax(getAppointmentAjaxOption($(this).val(),dataValueId));
        }
    });
    function getAppointmentAjaxOption(id,dataValueId) {
        return {
            url: `/admin/products/get-list-product-id/${id}`,
            type: 'GET',
            data: {},
            success: function (result) {
                if (typeof result !== 'undefined') {
                    $(`#products-${dataValueId}-productIds`).val(result.code)
                    $(`#products-${dataValueId}-uoms`).val(result.uom.name)
                }
                $(`#products-${dataValueId}-product-name-hiddens`).val($(`#products-${dataValueId}-product-names option:selected`).text())
                let manufacture_date = $(`#products-${dataValueId}-manufacture-dates`).val();

                let today = new Date();
                let dd = today.getDate();

                let mm = today.getMonth()+1;
                const yyyy = today.getFullYear();
                if(dd<10)
                {
                    dd=`0${dd}`;
                }

                if(mm<10)
                {
                    mm=`0${mm}`;
                }
                format = `${yyyy}-${mm}-${dd}`;
                today = `${result.code}${yyyy}${mm}${dd}`;

                $(`#products-${dataValueId}-manufacture-dates`).change(function () {

                    let chooseDate =  new Date($(this).val());
                    let dd = chooseDate.getDate();

                    let mm = chooseDate.getMonth()+1;
                    const yyyy = chooseDate.getFullYear();
                    if(dd<10)
                    {
                        dd=`0${dd}`;
                    }

                    if(mm<10)
                    {
                        mm=`0${mm}`;
                    }
                    today = `${result.code}${yyyy}${mm}${dd}`;

                    $(`#products-${dataValueId}-batch-nos`).val(today)
                });

                if(manufacture_date == format)
                {
                    $(`#products-${dataValueId}-batch-nos`).val(today)
                }
            },
            error: function (result) {
                console.log(result);
            }
        };
    }
}
$('.select2Inventorys').select2({
    ajax: {
        url: 'admin/products/select2/get-list-product',
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
        //     return {
        //         search: params.term,
        //         page: params.page || 1
        //     }
        // },
        // processResults: function (data, params) {
        //     params.page = params.page || 1;
        //     return {
        //         results: data.results,
        //         pagination: {
        //             more: (params.page * 2) < data.count_filtered
        //         }
        //     };
        // }
    },
    "language": {
        "noResults": function(){
            return "No results";
        }
    },
});

$('.add-more-inventory-info').click(function () {
    let htmlItem = inventoryInfoItemHtml();
    $("#inventory-info-body").append(htmlItem);
    renderNumber()
    $(".remove-inventory-info").unbind("click");
    $(".remove-inventory-info").bind("click", function () {
        let rowId = $(this).attr('data-row-id');
        $(rowId).remove();
        renderNumber()
    });

    $('.select2Inventory').select2({
        ajax: {
            url: 'admin/products/select2/get-list-product',
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
        },
        "language": {
            "noResults": function(){
                return "No results";
            }
        },
    });

    if ($('.product_name_id').length > 0) {

        $(".product_name_id").change(function () {
            var dataValueId = $(this).attr('data-value-id');

            if ($(this).val() > 0) {
                $.ajax(getAppointmentAjaxOption($(this).val(),dataValueId));
            }
        });
        function getAppointmentAjaxOption(id,dataValueId) {
            return {
                url: `/admin/products/get-list-product-id/${id}`,
                type: 'GET',
                data: {},
                success: function (result) {
                    if (typeof result !== 'undefined') {
                        $(`#products-${dataValueId}-productId`).val(result.code)
                        $(`#products-${dataValueId}-uom`).val(result.uom.name)
                    }

                    $(`#products-${dataValueId}-product-name-hidden`).val($(`#products-${dataValueId}-product-name option:selected`).text())
                    let manufacture_date = $(`#products-${dataValueId}-manufacture-date`).val();

                    let today = new Date();
                    let dd = today.getDate();

                    let mm = today.getMonth()+1;
                    const yyyy = today.getFullYear();
                    if(dd<10)
                    {
                        dd=`0${dd}`;
                    }

                    if(mm<10)
                    {
                        mm=`0${mm}`;
                    }
                    format = `${yyyy}-${mm}-${dd}`;
                    today = `${result.code}${yyyy}${mm}${dd}`;

                    $(`#products-${dataValueId}-manufacture-date`).change(function () {

                        let chooseDate =  new Date($(this).val());
                        let dd = chooseDate.getDate();

                        let mm = chooseDate.getMonth()+1;
                        const yyyy = chooseDate.getFullYear();
                        if(dd<10)
                        {
                            dd=`0${dd}`;
                        }

                        if(mm<10)
                        {
                            mm=`0${mm}`;
                        }
                        today = `${result.code}${yyyy}${mm}${dd}`;

                        $(`#products-${dataValueId}-batch-no`).val(today)
                    });

                    if(manufacture_date == format)
                    {
                        $(`#products-${dataValueId}-batch-no`).val(today)
                    }
                },
                error: function (result) {
                    console.log(result);
                }
            };
        }
    }
});
