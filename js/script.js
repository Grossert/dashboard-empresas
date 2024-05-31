(async function(){
    let name = ['Amazon',
                'Americanas', 
                'Walmart', 
                'Johnson & Johnson', 
                'Coca-Cola', 
                'Natura&Co', 
                'Pepsico', 
                'Kraft Heinz', 
                'Dover'];

    for(let i = 0; i<=name.length;i++){
        try {
            const imag = await fetchLogo(name[i]);
            criaTile(imag);
        } catch (error) {
            console.error('Failed to fetch logo for', name[i]);
        }
    }
})();

async function fetchLogo(nomeEmpresa){
    return new Promise((res, rej) =>{
        $.ajax({
            method: 'GET',
            url: 'https://api.api-ninjas.com/v1/logo?name=' + nomeEmpresa,
            headers: { 'X-Api-Key': 'yXKWXkW34lAM1lOw0wVd8A==Jfu1rmMzChv3Hxf4'},
            contentType: 'application/json',
            success: function(img) {
                res(img);
            },
            error: function ajaxError(jqXHR) {
                console.error('Error: ', jqXHR.responseText);
                rej(jqXHR);
            }
        });
    })
};

function criaTile(imag){
    var a = document.createElement("a");
    a.href = "/html/dashboard.html";

    var img = document.createElement("img");
    img.src = imag[0].image

    var sec = document.createElement("section");
    a.appendChild(img);
    sec.appendChild(a);
    document.querySelector("main").appendChild(sec);
};

