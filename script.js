const stock_products = [
    {
        id: 1,
        name: "Samsung Galaxy M15",
        brand: "Samsung",
        image: "https://m.media-amazon.com/images/I/81BTRVfsuFL._SX679_.jpg",
        mrp: 16999,
        price: 14799,
        ram: "6 GB",
        internal: "128 GB"
    },
    {
        id: 2,
        name: "Apple iPhone 13",
        brand: "Apple",
        image: "https://m.media-amazon.com/images/I/61VuVU94RnL._SL1500_.jpg",
        mrp: 59900,
        price: 51900,
        ram: "6 GB",
        internal: "128 GB"
    },
    {
        id: 3,
        name: "realme narzo N53",
        brand: "realme",
        image: "https://m.media-amazon.com/images/I/71DSxfKzkJL._SL1500_.jpg",
        mrp: 10999,
        price: 8999,
        ram: "4 GB",
        internal: "64 GB"
    },
    {
        id: 4,
        name: "Redmi 13c",
        brand: "Redmi",
        image: "https://m.media-amazon.com/images/I/71d1ytcCntL._SL1500_.jpg",
        mrp: 13999,
        price: 8499,
        ram: "6 GB",
        internal: "128 GB"
    },
    {
        id: 5,
        name: "OnePlus 12R",
        brand: "OnePlus",
        image: "https://m.media-amazon.com/images/I/71XNeka-BRL._SL1500_.jpg",
        mrp: 42799,
        price: 39999,
        ram: "8 GB",
        internal: "128 GB"
    },
    {
        id: 6,
        name: "Oppo A79 5G",
        brand: "Oppo",
        image: "https://m.media-amazon.com/images/I/81fNK5+o63L._SL1500_.jpg",
        mrp: 22000,
        price: 17499,
        ram: "6 GB",
        internal: "128 GB"
    },
    {
        id: 7,
        name: "Nokia G42 5G",
        brand: "Nolia",
        image: "https://m.media-amazon.com/images/I/714-klcm1rL._SL1500_.jpg",
        mrp: 15999,
        price: 12599,
        ram: "6 GB",
        internal: "128 GB"
    },
    {
        id: 8,
        name: "Redmi 13C",
        brand: "Redmi",
        image: "https://m.media-amazon.com/images/I/813ZN8Pj-HL._SL1500_.jpg",
        mrp: 11999,
        price: 7699,
        ram: "4 GB",
        internal: "128 GB"
    },
];

const productSection = document.getElementById("productPage");
const btnCart = document.getElementById("btnCart");
const myModal = new bootstrap.Modal("#myModal");
const cartCount = document.querySelector(".cart-count");
const modalDiv = document.getElementById("myModal");
const tbody = document.getElementById("tbody");


let cartItems = [];

function loadStockProducts() {
    let output = "";
    stock_products.forEach((product) => {
        output += `<div class="col">
        <div class="card h-100">
            <img class="card-img-top" src="${product.image}" alt="" height="300px" width="200px" />

            <div class="card-body p-4">
                <div class="text-center">
                    <h5>"${product.name}"</h5>
                    <span class="text-muted"><b>Brand</b> "${product.brand}"</span>
                    <span class="text-muted d-block"><b>Storage</b> "${product.ram} / ${product.internal}"</span>
                    <span class="text-muted text-decoration-line-through">"${product.mrp}"</span>
                    <span class="fw-bold text-success"> "${product.price}"</span>
                </div>
            </div>
            <div class="card-footer p-4 bg-transparent border-top-0">
                <div class="text-center"><button class="btn btn-primary btnProduct" data-id="${product.id}"><i class="bi bi-cart-fill"></i> Add to Cart</button></div></div>
            </div>
        </div>
        `;
    });
    productSection.innerHTML = output;
    //Add product Button code

    const productBtns = document.querySelectorAll(".btnProduct");
    productBtns.forEach((btn) => {
        btn.addEventListener("click", addToCart)
    });
}

loadStockProducts();

btnCart.addEventListener("click",function() {
    myModal.show();
});

function addToCart() {
    this.disabled = true;
    this.innerHTML = `<i class="bi bi-cart-fill"></i> Added to Cart`;
    const pid = this.dataset.id;
    const product_details = stock_products.filter((product) => product.id == pid)[0];
    const product = {
        ...product_details,
        quantity: 1,
        amount: product_details.price,
    };
    cartItems.push(product);
    cartCount.textContent = cartItems.length;
    updateTotal();
}

modalDiv.addEventListener("show.bs.modal", () =>{
    let output = ``;
    cartItems.forEach((product) => {
        output += `
        <tr>
        <td><img src="${product.image}" claas="img-fluid" width="100px"></td>;
        </td>
        <td>${product.name}</td>
        <td>${product.price.toFixed(2)}</td>
        <td><input type="number" style="width:80px" class="form-control txtQty" value="${product.quantity}" min=1 data-id="${product.id}"></td>
        <td>${product.amount.toFixed(2)}</td>
        <td><button class="btn btn-danger btn-sm btnDelete" data-id="${product.id}"><i class="bi bi-trash"></i></button></td>
        </tr>`;
    })
    tbody.innerHTML = output;

    const removeBtns = document.querySelectorAll(".btnDelete");
    removeBtns.forEach((btn) => {
        btn.addEventListener("click",removeFromCart);
    });

    const txtQty = document.querySelectorAll(".txtQty");
    txtQty.forEach((txt) => {
        txt.addEventListener("change", updateQry);
    });

});

function removeFromCart() {
    const id = this.dataset.id;
    const tr = this.closest("tr");
    cartItems = cartItems.filter((product) => product.id != id);
    tr.remove();
    updateTotal();
}

function updateQry() {
    const id = this.dataset.id;
    const newQty = this.value;
    const amountTd = this.parentElement.nextElementSibling;
    const productIndex = cartItems.findIndex((product) => product.id == id);
    cartItems[productIndex].quantity = newQty;
    cartItems[productIndex].amount = newQty * cartItems[productIndex].price;
    amountTd.textContent = (newQty * cartItems[productIndex].price).toFixed(2);
    updateTotal();
}

    modalDiv.addEventListener("hide.bs.modal", () =>{
        cartCount.textContent = cartItems.length;

        //Check Products Button
        const productBtns = document.querySelectorAll(".btnProduct");

        productBtns.forEach((btn) => {
            const pid = btn.dataset.id;
            if(!isIdPresent(pid)) {
                btn.disabled = false;
                btn.innerHTML = `<i class="bi bi-cart-fill"></i> Add to Cart`;
            }
        })
    });

function updateTotal() {
    let totalAmount = 0;
    cartItems.forEach((product) => {
        totalAmount += product.amount;
    });

    const totalTd = document.querySelector(".total");
    totalTd.textContent = `Total Rs : ${totalAmount.toFixed(2)}`;
}

const isIdPresent = (id) => {
    for (const product of cartItems) {
        if(product.id == id) {
            return true;
        }
    }
    return false;
}
