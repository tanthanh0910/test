function formatNumber(value) {
    return parseFloat(value || 0).toLocaleString('en');
}

function defaultIfNaN(number, defaultValue = 0) {
    if (typeof number !== 'number') {
        number = Number(number);
    }

    return isNaN(number) ? defaultValue : number;
}

function getUrlParams(key = null) {
    const searchParams = new URLSearchParams(window.location.search);

    if (key) {
        return searchParams.get(key);
    }

    let returnObject = {};

    for (let key of searchParams.keys()) {
        returnObject[key] = searchParams.get(key);
    }

    return returnObject;
}

function nl2br (str, is_xhtml) {
    if (typeof str === 'undefined' || str === null) {
        return '';
    }
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
}

function getLabel(value, textConfig = {}, colorConfig = {}) {
    return `<span class="label bg-${colorConfig[value]}">${textConfig[value]}</span>`;
}

// Format number on input
$.fn.formatNumber = function() {
    return this.each(function () {
        // get value
        var name = $(this).attr('name');
        var id = $(this).attr('id');
        var newId = id.replace('[', '\\[').replace(']', '\\]') + '-hidden';
        var old_val = $(this).attr('value');

        // change old element
        $(this).removeAttr('name');
        $(this).attr('type', 'text');
        $(this).attr('autocomplete', 'off');
        $(this).val(function(index, value) {
            var parts = value.toString().split(".");
            parts[0] = parts[0].replace(/[^0-9.]/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return parts.join(".");
        });
        // add new hidden element
        var appendInput = "<input type=\'hidden\' id=\'" + (id + '-hidden') + "\' name=\'" + name + "\'>";
        $(this).parent().append(appendInput);
        $('#'+newId).val(old_val);

        // listen change data
        $(this).on('keyup change', function(){
            $(this).val(function(index, value) {
                var parts = value.toString().split(".");
                parts[0] = parts[0].replace(/[^0-9.]/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                return parts.join(".");
            });
            var amount = $(this).val();
            if(amount != ''){
                amount = parseFloat(amount.replace(/,/g, ''));
            } else {
                amount = '';
            }
            $('#'+newId).val(amount);
        });
    })
};
Vue.component('select2', {
    props: {
        value: {
            required: true,
        },
        options: {
            type: Array,
        },
        placeholder: {
            type: String,
            default:'Select a state'
        },
        notfound: {
            type: String,
            default: 'Not found !',
        },
        search: {
            type: Boolean,
            default: false,
        },
        tags: {
            type: Boolean,
            default: false,
        },
        multiple: {
            type: Boolean,
            default: false,
        },
        change: {
            type: Function,
        },
        allowclear: {
            type: Boolean,
            default: false,
        },
        max: {
            type: Number,
            default: 10,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        readonly: {
            type: Boolean,
            default: false,
        },
        position: {
            type: String,
            default: 'left'
        },
        icon: {
            type: String,
        },
        width: {
            type: String,
            default: 'resolve'
        },
        labels: {
            type: Array,
        },
        maximumselection: {
            type: Number,
            default: 0
        }
    },
    template: '<select class="form-control" ></select>',
    created: function () {
        this.convert();

    },
    mounted: function () {
        var vm = this;
        var config = {
            disabled: this.disabled,
            multiple: this.multiple,
            tags: this.tags,
            minimumResultsForSearch: this.search ? 0 : -1,
            maximumSelectionLength: this.maximumselection,
            allowClear: this.allowclear,
            data: this.data,
            language: {
                noResults: function () {
                    return vm.notfound;
                }
            },
            escapeMarkup: function (markup) {
                return markup;
            }
        };
        if (this.placeholder != undefined) {
            config['placeholder'] = this.placeholder;
        }
        this.config = config;
        this.init();
    },

    data: function () {
        return {
            data: [],
            config: {},
            selected: this.value,
            select2: null,
        }
    },
    methods: {
        convert: function () {
            var vm = this;
            var data = [];
            if (_.isArray(vm.options)) {

                if (vm.labels != undefined && vm.labels.length == 2) {
                    data = vm.options.map(function (item) {
                        var el = {};
                        el['id'] = item[vm.labels[0]];
                        var text = '';
                        if (item.hasOwnProperty(vm.labels[1])) {
                            text = item[vm.labels[1]];
                        }
                        el['text'] = String(text);
                        return el;
                    })
                } else {
                    data = vm.options.map(function (item) {
                        var el = {};
                        el['id'] = item.hasOwnProperty('id') ? item['id'] : '';
                        var text = '';
                        if (item.hasOwnProperty('text')) {
                            text = item['text'];
                        } else if (item.hasOwnProperty('name')) {
                            text = item['name'];
                        } else if (item.hasOwnProperty('code')) {
                            text = item['code'];
                        }
                        el['text'] = String(text);
                        return el;
                    })
                }
            }
            vm.data = data;
        },
        init: function () {
            var vm = this;
            vm.config['data'] = vm.data;
            if (vm.placeholder != undefined && !vm.multiple) {
                $(vm.$el).append("<option></option>")
            }

            if (vm.multiple) {
                vm.select2 = $(vm.$el).select2(vm.config).on('change', function (e) {
                    vm.$emit('input', $(this).val());
                    vm.$emit('change');
                    if (vm.change != undefined && typeof vm.change == 'function') {
                        vm.change();
                    }
                });
            } else {
                vm.select2 = $(vm.$el).select2(vm.config).on({
                    'select2:select': function (e) {
                        vm.$emit('input', e.params.data.id);
                        if (vm.change != undefined && typeof vm.change == 'function') {
                            vm.change();
                        }
                    },'select2:unselecting' : function(e){
                        var data = e.params.data;
                        $(this).data('state', 'unselected');
                        if( data == undefined){
                            vm.$emit('input', '');
                        }
                    },'select2:open' : function(e){
                        if ($(this).data('state') === 'unselected') {
                            $(this).removeData('state');
                            var self = $(this);
                            setTimeout(function() {
                                self.select2('close');
                            }, 1);
                        }
                    }
                });

            }
            if (vm.value != undefined && vm.value != '') {
                vm.select2.val(vm.value).trigger("change.select2");
            } else {
                if (_.find(vm.data, {
                    id: vm.value
                }) == undefined && !vm.multiple) {
                    vm.$emit('input', '');
                }
            }
        },
        destroy: function () {
            if ($(this.$el).data('select2')) {
                this.select2.select2('destroy');
                $(this.$el).empty();
                this.init();

            }
        }
    },
    watch: {
        options: {
            handler : function(){
                this.convert();
                this.destroy();
            },
            deep : true
        },
        multiple: {
            handler : function(){
                this.config.multiple = this.multiple;
                this.destroy();
            },
            deep : true
        },
        placeholder: {
            handler : function(){
                this.config.placeholder = this.placeholder;
                this.destroy();
            },
            deep : true
        },
        'value': function (newval) {
            this.select2.val(newval).trigger('change.select2');

        },
        'disabled': function (newval) {
            $(this.$el).attr('disabled', newval);
        }
    },
    computed: {

    },
});

