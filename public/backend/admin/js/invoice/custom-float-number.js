String.prototype.count = function (c) {
    var result = 0, i = 0;
    for (i; i < this.length; i++) if (this[i] == c) result++;
    return result;
};


(function ($) {
    $.fn.inputDoubleFilter = function (inputFilter) {
        return this.on("input keydown keyup mousedown mouseup select contextmenu drop", function () {
            // allows 123. or .123 which are fine for entering on a MySQL decimal() or float() field
            // if more than one dot is detected then erase (or slice) the string till we detect just one dot
            // this is likely the case of a paste with the right click mouse button and then a paste (probably others too), the other situations are handled with keydown, keypress, keyup, etc

            while (($(this).val().split(".").length - 1) > 1) {

                $(this).val($(this).val().slice(0, -1));

                if (($(this).val().split(".").length - 1) > 1) {
                    continue;
                } else {
                    return false;
                }

            }

            var int_num_allow = 13;
            var float_num_allow = 2;

            var iof = $(this).val().indexOf(".");

            if (iof != -1) {

                // this case is a mouse paste (probably also other events) with more numbers before the dot than is allowed
                // the number can't be "sanitized" because we can't "cut" the integer part, so we just empty the element and optionally change the placeholder attribute to something meaningful

                if ($(this).val().substring(0, iof).length > int_num_allow) {
                    $(this).val('');
                    // you can remove the placeholder modification if you like
                    $(this).attr('placeholder', 'invalid number');
                }

                // cut the decimal part

                $(this).val($(this).val().substring(0, iof + float_num_allow + 1));

            } else {

                $(this).val($(this).val().substring(0, int_num_allow));

            }

            //render total amount
            let totalAmount = 0;
            if ($('.items-amount').length && $('#total-due').length) {
                $('.items-amount').map(function () {
                    let itemAmount = parseFloat($(this).val());
                    if (isNaN(itemAmount)) {
                        itemAmount = 0;
                    }

                    totalAmount += itemAmount;
                })

                $('#total-due').html($.number(totalAmount, 2));
            }


            return true;
        });
    };
}(jQuery));