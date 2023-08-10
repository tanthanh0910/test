$('.select2').select2({
    "language": {
        "noResults": function(){
            return "No results";
        }
    },
    width: '100%',
    allowClear: false,
    height: '100%',
});