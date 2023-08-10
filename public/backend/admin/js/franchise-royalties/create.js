$('.cash_grab_pay').on('input', function () {
    let valCashGrabPay = $('#cash_grab_pay').val();
    let valueRoyaltiesBased= $('#value_royalties_based').val();
    let amountCashGrabPay = Number(valCashGrabPay * (valueRoyaltiesBased / 100));
    $('#amount_royalties_based').val(round(amountCashGrabPay,2));

    let amountRoyaltiesBased = $('#amount_royalties_based').val();
    let amountLoyaltyCard = $('#amount_loyalty_card').val();
    let amountRoyaltiesBasedOnRedeem = $('#amount_royalties_based_on_redeem').val();
    let amountTopUp = $('#amount_top_up').val();
    AmountToPay(Number(amountRoyaltiesBased),Number(amountLoyaltyCard),Number(amountRoyaltiesBasedOnRedeem),Number(amountTopUp))

});

$('.value_royalties_based').on('input', function () {
    let valCashGrabPay = $('#cash_grab_pay').val();
    let valueRoyaltiesBased= $('#value_royalties_based').val();
    let amountCashGrabPay = Number(valCashGrabPay * (valueRoyaltiesBased / 100));
    $('#amount_royalties_based').val(round(amountCashGrabPay,2));

    let amountRoyaltiesBased = $('#amount_royalties_based').val();
    let amountLoyaltyCard = $('#amount_loyalty_card').val();
    let amountRoyaltiesBasedOnRedeem = $('#amount_royalties_based_on_redeem').val();
    let amountTopUp = $('#amount_top_up').val();
    AmountToPay(Number(amountRoyaltiesBased),Number(amountLoyaltyCard),Number(amountRoyaltiesBasedOnRedeem),Number(amountTopUp))
});

$('.redeem').on('input', function () {
    let valRedeem = $('#redeem').val();
    let valueRoyaltiesBased= $('#value_royalties_based_on_redeem').val();
    let amountRedeem = Number(valRedeem * (valueRoyaltiesBased / 100));
    $('#amount_royalties_based_on_redeem').val(round(amountRedeem,2));
    $('#amount_loyalty_card').val(valRedeem);


    let amountRoyaltiesBased = $('#amount_royalties_based').val();
    let amountLoyaltyCard = $('#amount_loyalty_card').val();
    let amountRoyaltiesBasedOnRedeem = $('#amount_royalties_based_on_redeem').val();
    let amountTopUp = $('#amount_top_up').val();
    AmountToPay(Number(amountRoyaltiesBased),Number(amountLoyaltyCard),Number(amountRoyaltiesBasedOnRedeem),Number(amountTopUp))
});


$('.value_royalties_based_on_redeem').on('input', function () {
    let valRedeem = $('#redeem').val();
    let valueRoyaltiesBasedOnRedeem= $('#value_royalties_based_on_redeem').val();
    let amountCashGrabPay = Number(valRedeem * (valueRoyaltiesBasedOnRedeem / 100));
    $('#amount_royalties_based_on_redeem').val(round(amountCashGrabPay,2));

    let amountRoyaltiesBased = $('#amount_royalties_based').val();
    let amountLoyaltyCard = $('#amount_loyalty_card').val();
    let amountRoyaltiesBasedOnRedeem = $('#amount_royalties_based_on_redeem').val();
    let amountTopUp = $('#amount_top_up').val();
    AmountToPay(Number(amountRoyaltiesBased),Number(amountLoyaltyCard),Number(amountRoyaltiesBasedOnRedeem),Number(amountTopUp))
});

$(".top_up").on('input', function () {
    let valTopUp = $('#id_top_up').val();
    let valActualBirthdayRedeem = $('#actual_birthday_redeem').val();
    let amountTopUpAndActualBirthdayRedeem = Number(valTopUp - valActualBirthdayRedeem).toFixed(2);
    $('#amount_top_up').val(amountTopUpAndActualBirthdayRedeem);


    let amountRoyaltiesBased = $('#amount_royalties_based').val();
    let amountLoyaltyCard = $('#amount_loyalty_card').val();
    let amountRoyaltiesBasedOnRedeem = $('#amount_royalties_based_on_redeem').val();
    let amountTopUp = $('#amount_top_up').val();
    AmountToPay(Number(amountRoyaltiesBased),Number(amountLoyaltyCard),Number(amountRoyaltiesBasedOnRedeem),Number(amountTopUp))

});

$(".actual_birthday_redeem").on('input', function () {
    let valTopUp = $('#id_top_up').val();
    let valActualBirthdayRedeem = $('#actual_birthday_redeem').val();
    let amountTopUpAndActualBirthdayRedeem = Number(valTopUp - valActualBirthdayRedeem);
    $('#amount_top_up').val(round(amountTopUpAndActualBirthdayRedeem,2));


    let amountRoyaltiesBased = $('#amount_royalties_based').val();
    let amountLoyaltyCard = $('#amount_loyalty_card').val();
    let amountRoyaltiesBasedOnRedeem = $('#amount_royalties_based_on_redeem').val();
    let amountTopUp = $('#amount_top_up').val();
    AmountToPay(Number(amountRoyaltiesBased),Number(amountLoyaltyCard),Number(amountRoyaltiesBasedOnRedeem),Number(amountTopUp))

});

function AmountToPay(amountRoyaltiesBased,amountLoyaltyCard,amountRoyaltiesBasedOnRedeem,amountTopUp){
    let total = Number((amountRoyaltiesBased + amountRoyaltiesBasedOnRedeem + amountTopUp) - amountLoyaltyCard);
    $('#amount_to_pay').val(round(total,2));
}

function round(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}


