function listP() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/products",
        dataType: "json",
        success: function (product) {
            console.log(product);
            let content = "";
            for (let i = 0; i < product.length; i++) {
                content += '<tr>\n' +
                    '        <td>' + product[i].name + '</td>\n' +
                    '        <td>' + product[i].price + '</td>\n' +
                    '        <td>' + product[i].description + '</td>\n' +
                    '        <td>' + product[i].producer + '</td>\n' +
                    '        <td><button type="submit" onclick="deleteProduct(' + product[i].id + ')">DELETE</button></td>\n' +
                    '        <td><button onclick="updateProduct(' + product[i].id + ')">UPDATE</button></td>\n' +
                    '    </tr>';
            }
            document.getElementById("content").innerHTML = content;
        }
    })
}
listP()

function addNewProduct(){
    let name = document.getElementById("name").value;
    let price = document.getElementById("price").value;
    let description = document.getElementById("description").value;
    let producer = document.getElementById("producer").value;
    let newProduce = {
        name: name,
        price: price,
        description: description,
        producer: producer
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type:"POST",
        data: JSON.stringify(newProduce),
        url: "http://localhost:8080/products/create",
        success: listP
    })
}

function deleteProduct(id){
    $.ajax({
        type: "DELETE",
        url: "http://localhost:8080/products/" + id,
        dataType: "json",
        success: listP
    })
}
function updateProduct(id){
    let name = document.getElementById("nameUpdate").value;
    let price = document.getElementById("priceUpdate").value;
    let description = document.getElementById("descriptionUpdate").value;
    let producer = document.getElementById("producerUpdate").value;
    let newProduce = {
        name: name,
        price: price,
        description: description,
        producer: producer
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type:"PUT",
        data: JSON.stringify(newProduce),
        url: "http://localhost:8080/products/" + id,
        success: listP
    })
}