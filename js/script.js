(function(){
    var name = ['Amazon','Americanas', 'Walmart']
    for(let i = 0; i<=name.length;i++){
        $.ajax({
            method: 'GET',
            url: 'https://api.api-ninjas.com/v1/logo?name=' + name[i],
            headers: { 'X-Api-Key': 'yXKWXkW34lAM1lOw0wVd8A==Jfu1rmMzChv3Hxf4'},
            contentType: 'application/json',
            success: function(img) {
                criaTile(img);
            },
            error: function ajaxError(jqXHR) {
                console.error('Error: ', jqXHR.responseText);
            }
        });
    }
})();

function criaTile(imag){
    var a = document.createElement("a");
    a.href = "/html/dashboard.html";

    var img = document.createElement("img");
    img.src = imag[0].image

    a.appendChild(img);
    document.querySelector("main").appendChild(a);
}

