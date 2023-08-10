/**
 * use
 * client/input-integer.js
 * client/session.js
 * client/order/common.js
 */

function onLoadProduct() {
    let list = session.get(PRODUCT_SESSION_KEY);
    updateCartItemTotalQty();

    const tl = gsap.timeline();

    $(".number-input").map(function () {
        let productId = parseInt($(this).attr("data-product-id"));
        let product = findProductById(productId, list);
        let quantity = 1;
        if (!product) {
            $(this).addClass("hide");
        } else {
            quantity = product.quantity;
            $(this).removeClass("hide");
        }
        $(`#product-${productId}-quantity`).val(quantity);
    });

    $(".btn-add").map(function () {
        let productId = parseInt($(this).attr("data-product-id"));
        let product = findProductById(productId, list);
        let quantity = 1;

        if (!product) {
            $(this).addClass("show");
            $(this).removeClass("hide");
        } else {
            $(this).removeClass("show");
            $(this).addClass("hide");

            quantity = product.quantity;
        }

        $(this).on("click", async () => {
            await animateButton.bind(this)();

            $(this).removeClass("show");
            $(this).addClass("hide");
            $(this).parent().find(".number-input").removeClass("hide");

            animateBadgetDef();

            updateQtyOfProductSession($(this.children[0]), 1, QUANTITY_TYPE_STEP);
            updateCartItemTotalQty();
        });

        $(`#product-${productId}-quantity`).val(quantity);
    });
}

function animateBadgetDef() {
    gsap
        .timeline()
        .fromTo(
            $(".img-cart"),
            {
                y: "-80px",
                opacity: 0,
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.5,
                ease: Expo.easeOut,
            }
        )
        .to($(".img-cart"), {
            opacity: 0,
            duration: 0.2,
        })
        .fromTo(
            $("#total-number"),
            {
                scale: 1.2,
            },
            {
                scale: 1,
                duration: 0.2,
                ease: Back.easeInOut,
            },
            "+=0.2"
        );
}

async function animateButton() {
    await gsap
        .timeline()
        .set(this, {pointerEvents: "none"})
        .fromTo(
            this.children[0].children[0],
            {
                scale: 1.2,
            },
            {
                duration: 0.2,
                scale: 1,
                yoyo: true,
                ease: Back.easeIn,
            }
        )
        .to(
            this.children[0].children[0],
            // {
            //   y: 0,
            // },
            {
                y: "200%",
                duration: 0.2,
                yoyo: true,
                ease: Expo.easeIn,
            }
        )
        .set(this.children[0].children[0], {y: "-200%"})
        .to(
            this.children[0].children[0],
            // {
            //   y: "-200%",
            //   duration: 0.4,
            //   yoyo: true,
            //   ease: Expo.easeIn,
            // },
            {
                y: 0,
            }
        )
        .set(this, {pointerEvents: "all"});
}
