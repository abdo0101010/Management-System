let title = document.getElementById("title");
let price = document.getElementById("price");
let tax = document.getElementById("tax");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let getogery = document.getElementById("getogery");
let Create = document.getElementById("create");
let mod='create';
let temp;
console.log(title, price, tax, ads, discount, total, count, getogery);
//effect total 
function totall() {
  if (price != "") {
    let tot = +price.value + +tax.value + +ads.value - +discount.value;
    total.innerHTML = tot;
    total.style.background = "green";
    console.log(tot);
  } else {
    total.innerHTML = "";
    total.style.background = "#F95454";
  }
}
let prop;
if (localStorage.product != null) {
  prop = JSON.parse(localStorage.product);
} else {
  prop = [];
}
//add products
Create.onclick = function add() {
  let item = {
    title: title.value,
    price: price.value,
    tax: tax.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    getogery: getogery.value,
  };
  if(mod=='create'){
  if (item.count > 1) {
    for (let i = 0; i < item.count; i++) {
      prop.push(item);
    }
  } else {
    prop.push(item);
  }
}
else{
  prop[temp]=item;
  mod="create";
  count.style.display="inline-block"
  Create.innerHTML="create";
   totall();
  
}
  
  localStorage.setItem("product", JSON.stringify(prop));
  console.log(prop);
  clear();
  show();
};
//clear
function clear() {
  title.value = "";
  price.value = "";
  tax.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  getogery.value = "";
}
//display
function show() {
  let shows = "";
  for (let i = 0; i < prop.length; i++) {
    shows += `         <tr>
                        <td>${i + 1}</td>
                        <td>${prop[i].title}</td>
                        <td>${prop[i].price}</td>
                        <td>${prop[i].tax}</td>
                        <td>${prop[i].ads}</td>
                        <td>${prop[i].discount}</td>
                        <td>${prop[i].total}</td>
                        <td>${prop[i].getogery}</td>
                        <td><button onclick="update(${i})"  id="update">update</button></td>
                        <td><button onclick="remove(${i})" id="delete">delete</button></td>
                    </tr>`;
    console.log(title);
  }
  document.getElementById("tbody").innerHTML = shows;
  
let btnDeleteAll = document.getElementById("btndeleteall");
 if (prop.length > 0) {
   btnDeleteAll.innerHTML = `<button onclick="RemoveAll()" id="DeleteAll">DeleteAll (${prop.length})</button>`;
 } else {
   btnDeleteAll.innerHTML = "";
 }

}
show();
function remove(select) {
  prop.splice(select, 1);
  localStorage.product = JSON.stringify(prop);
  show();
}
function RemoveAll(){
  localStorage.clear();
  prop.splice(0);
  show();
}
function update(index) {
  title.value = prop[index].title;
  price.value=prop[index].price;
  tax.value = prop[index].tax;
  ads.value=prop[index].ads;
  discount.value=prop[index].discount;
  Create.innerHTML = "update";
  count.style.display="none";
   mod = "update";
  temp = index;
}


