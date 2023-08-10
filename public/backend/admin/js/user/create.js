$('#factory').select2({
    "language": {
        "noResults": function(){
            return "No results";
        }
    }
});
$('#outlet').select2({
    "language": {
        "noResults": function(){
            return "No results";
        }
    }
});
let outletSelector = $("#id_outlets");
let factorySelector = $("#id_factory");

let roleSuperAdmin = $("input[name=role_super_admin]").val();
let roleAdmin = $("input[name=role_admin]").val();
let roleOutletStaff = $("input[name=role_outlet_staff]").val();
let roleOutletOwner = $("input[name=role_outlet_owner]").val();
let roleFactoryStaff = $("input[name=role_factory_staff]").val();

$( document ).ready(function() {
   handleSelectExtendFromRole($('#role').val());
});

$('#role').change(function () {
    handleSelectExtendFromRole($(this).val())
});

function showOutlet() {
    outletSelector.css("display", "block");
}

function hideOutlet() {
    outletSelector.css("display", "none");
}

function showFactory() {
    factorySelector.css("display", "block");
}

function hideFactory() {
    factorySelector.css("display", "none");
}

function handleSelectExtendFromRole(roleSelected) {
    hideOutlet();
    hideFactory();
    if (roleSelected == roleOutletStaff || roleSelected == roleOutletOwner) {
        showOutlet();
    }

    if (roleSelected == roleFactoryStaff) {
        showFactory();
    }
}


