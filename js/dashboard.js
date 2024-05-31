
(function(){
    var name = [
        'Gold Futures',
        'Soybean Oil Futures',
        'Wheat Futures',
        'Platinum',
        'Micro Silver Futures',
        'Lean Hogs Futures',
        'Corn Futures',
        'Aluminum Futures',
        'Soybean Meal Futures']
    
    for(let i = 0; i<=name.length;i++){
        $.ajax({
            method: 'GET',
            url: 'https://api.api-ninjas.com/v1/commodityprice?name=' + name[i],
            headers: { 'X-Api-Key': 'yXKWXkW34lAM1lOw0wVd8A==Jfu1rmMzChv3Hxf4' },
            contentType: 'application/json',
            success: function (result) {
               console.log(result)
               listarProduto(result);
            },
            error: function ajaxError(jqXHR) {
                console.error('Error: ', jqXHR.responseText);
            }
        });
    }
})();

function listarProduto(prod){
    const nome = prod.name;
    const preco = prod.price;

    let tr = document.createElement("tr");
    
    let tdNome = document.createElement("td");
    tdNome.textContent = nome;

    let tdPreco = document.createElement("td");
    tdPreco.textContent = preco;

    tr.appendChild(tdNome);
    tr.appendChild(tdPreco)
    document.querySelector("tbody").appendChild(tr);
};
