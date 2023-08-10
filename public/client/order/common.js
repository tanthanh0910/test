const MAX_INPUT_QTY = 9999;
const MIN_INPUT_QTY = 0;
const LANG_CHINA = "zh_CN";
const LANG_EN = "en";
const PRODUCT_SESSION_KEY = "products";
const DEFAULT_QUANTITY = 1;
const QUANTITY_TYPE_STEP = "step";
const QUANTITY_TYPE_FORCE = "force";

const session = new Session();
if (!session.get(PRODUCT_SESSION_KEY)) {
    session.set(PRODUCT_SESSION_KEY, []);
}

//input-integer.js
$(".quantity").inputFilter(function (value) {
    return /^\d*$/.test(value); // Allow digits only, using a RegExp
});
//end input-integer.js

//function area
function findProductById(productId, productList) {
    if (!productList) {
        return null;
    }

    let len = productList.length;
    if (!len) {
        return null;
    }

    for (const prop in productList) {
        if (parseInt(productList[prop].id) === parseInt(productId)) {
            return productList[prop];
        }
    }

    return null;
}

function getTotalQuantityOfProducts(productList) {
    let totalQty = 0;
    if (!productList) {
        return totalQty;
    }

    let len = productList.length;
    if (!len) {
        return totalQty;
    }

    for (const prop in productList) {
        totalQty += parseInt(productList[prop].quantity);
    }

    return totalQty;
}

function getTotalPriceOfProducts(productList) {
    let totalPrice = 0;
    if (!productList) {
        return totalPrice;
    }

    let len = productList.length;
    if (!len) {
        return totalPrice;
    }

    for (const prop in productList) {
        totalPrice +=
            parseFloat(productList[prop].quantity) *
            parseFloat(productList[prop].price);
    }

    return totalPrice;
}

function getTotalPriceOfProductById(productId, productList) {
    let item = findProductById(productId, productList);
    if (!item) {
        return 0;
    }

    return parseFloat(item.price) * parseFloat(item.quantity);
}

function updateCartItemTotalQty() {
    let total = getTotalQuantityOfProducts(session.get(PRODUCT_SESSION_KEY));
    if (total > 9) {
        total = "9+";
    }
    $("#total-number").html(total);
}

function refreshQuantityOfProducts(productId, productList, quantity) {
    if (!findProductById(productId, productList)) {
        return productList;
    }

    for (const prop in productList) {
        if (parseInt(productList[prop].id) == parseInt(productId)) {
            productList[prop].quantity = parseInt(quantity);
        }
    }

    return productList;
}

function removeProductSessionItem(productId, productList) {
    if (!findProductById(productId, productList)) {
        return productList;
    }

    for (const prop in productList) {
        if (productList[prop].id == productId) {
            productList.splice(prop, 1);
        }
    }

    if (!productList.length) {
        return [];
    }

    return productList;
}

function updateQtyOfProductSession(
    objectElementClickAction,
    quantity,
    type = QUANTITY_TYPE_STEP
) {
    let productId = objectElementClickAction.attr("data-product-id");
    let productImage = objectElementClickAction.attr("data-product-image");
    let productNameEn = objectElementClickAction.attr("data-product-name");
    let productNameZhCn = objectElementClickAction.attr(
        "data-product-name_zh_cn"
    );
    let productPrice = parseFloat(
        objectElementClickAction.attr("data-product-price")
    );
    let productQtyInputElementSelector = $(`#product-${productId}-quantity`);

    let findProduct = findProductById(
        productId,
        session.get(PRODUCT_SESSION_KEY)
    );

    if (!findProduct) {
        let defaultQty = DEFAULT_QUANTITY;
        if (type === QUANTITY_TYPE_FORCE) {
            defaultQty = quantity;
        }

        let item = {
            id: productId,
            image: productImage,
            name_en: productNameEn,
            name_zh_cn: productNameZhCn,
            price: productPrice,
            quantity: defaultQty,
        };
        productQtyInputElementSelector.val(defaultQty);

        let list = session.get(PRODUCT_SESSION_KEY);
        if (!list) {
            list = [];
        }
        list.push(item);

        session.set(PRODUCT_SESSION_KEY, list);
        return;
    }

    let productsUpdatedQtyById = null;

    if (type === QUANTITY_TYPE_STEP) {
        productsUpdatedQtyById = refreshQuantityOfProducts(
            productId,
            session.get(PRODUCT_SESSION_KEY),
            findProduct.quantity + quantity
        );
        productQtyInputElementSelector.val(findProduct.quantity + quantity);
    }

    if (type === QUANTITY_TYPE_FORCE) {
        productsUpdatedQtyById = refreshQuantityOfProducts(
            productId,
            session.get(PRODUCT_SESSION_KEY),
            quantity
        );
        productQtyInputElementSelector.val(quantity);
    }

    session.set(PRODUCT_SESSION_KEY, productsUpdatedQtyById);
}

//end function area

$(".plus-quantity").on("click", function () {
    let quantity = parseInt(
        this.parentNode.querySelector("input[type=text]").value
    );
    let newQty = quantity + 1;

    if (newQty >= MAX_INPUT_QTY) {
        let changedQty = Math.floor(newQty / 10);
        this.parentNode.querySelector("input[type=text]").value = changedQty;
        updateQtyOfProductSession($(this), changedQty, QUANTITY_TYPE_FORCE);
        updateCartItemTotalQty();
        return;
    }
    animateBadget();

    updateQtyOfProductSession($(this), newQty, QUANTITY_TYPE_FORCE);
    updateCartItemTotalQty();
});

$(".minus-quantity").on("click", function () {
    let quantity = parseInt(
        this.parentNode.querySelector("input[type=text]").value
    );
    let newQty = quantity - 1;

    if (newQty <= MIN_INPUT_QTY) {
        this.parentNode.querySelector("input[type=text]").value = quantity;
        updateQtyOfProductSession($(this), MIN_INPUT_QTY, QUANTITY_TYPE_FORCE);
        $(this).parent().addClass("hide");
        $(this).parent().parent().find(".btn-add").addClass("show");

        let list = session.get(PRODUCT_SESSION_KEY);
        list = removeProductSessionItem($(this).attr("data-product-id"), list);
        session.set(PRODUCT_SESSION_KEY, list);
        updateCartItemTotalQty();
        return;
    }
    animateBadget(-1);

    updateQtyOfProductSession($(this), newQty, QUANTITY_TYPE_FORCE);
    updateCartItemTotalQty();
});

$(".quantity").on("input", function () {
    let quantity = parseInt(this.value);

    if (isNaN(quantity)) {
        this.value = MIN_INPUT_QTY;
        updateQtyOfProductSession($(this), MIN_INPUT_QTY, QUANTITY_TYPE_FORCE);

        let list = session.get(PRODUCT_SESSION_KEY);
        list = removeProductSessionItem($(this).attr('data-product-id'), list);
        session.set(PRODUCT_SESSION_KEY, list);
        updateCartItemTotalQty();
        return;
    }

    if (quantity <= MIN_INPUT_QTY) {
        this.value = MIN_INPUT_QTY;
        $(this).parent().addClass("hide");
        $(this).parent().parent().find(".btn-add").addClass("show");

        let list = session.get(PRODUCT_SESSION_KEY);
        list = removeProductSessionItem($(this).attr("data-product-id"), list);
        session.set(PRODUCT_SESSION_KEY, list);
        updateCartItemTotalQty();
        return;
    }

    if (quantity >= MAX_INPUT_QTY) {
        let changedQty = Math.floor(quantity / 10);
        this.value = changedQty;
        updateQtyOfProductSession($(this), changedQty, QUANTITY_TYPE_FORCE);
        updateCartItemTotalQty();
        return;
    }

    animateBadget();
    updateQtyOfProductSession($(this), quantity, QUANTITY_TYPE_FORCE);
    updateCartItemTotalQty();
});

function animateBadget(dir) {
    gsap
        .timeline()
        .fromTo(
            $(".img-cart"),
            {
                y: () => (dir === -1 ? 0 : -80),
                opacity: 1,
            },
            {
                y: () => (dir === -1 ? -80 : 0),
                duration: 0.5,
                opacity: 1,
                ease: dir === -1 ? Expo.easeIn : Expo.easeOut,
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
