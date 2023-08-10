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

            // replace any character that's not a digit or a dot

            $(this).val($(this).val().replace(/[^0-9.]/g, ''));

            // now cut the string with the allowed number for the integer and float parts
            // integer part controlled with the int_num_allow variable
            // float (or decimal) part controlled with the float_num_allow variable

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

            return true;
        });
    };
}(jQuery));