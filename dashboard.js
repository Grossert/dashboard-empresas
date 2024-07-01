google.charts.load('current', { 'packages': ['gauge', 'corechart', 'line','geochart'] });
google.charts.setOnLoadCallback(medidorSatisfacao);
google.charts.setOnLoadCallback(grafPizzaMaisVendidos);
google.charts.setOnLoadCallback(grafLinhaReceita);
google.charts.setOnLoadCallback(grafBarraReceita);
google.charts.setOnLoadCallback(grafGeograf);


function medidorSatisfacao() {
    let data = google.visualization.arrayToDataTable([
        ['Label', 'Value'],
        ['Satisfação', 80]
    ]);
    let options = {
        width: 400,
        height: 300,
        redFrom: 0, redTo: 30,
        yellowFrom: 30, yellowTo: 70,
        greenFrom: 70, greenTo: 100,
        minorTicks: 5
    };
    let chart = new google.visualization.Gauge(document.getElementById('indiceSatisfacao'));
    chart.draw(data, options);

    setInterval(function () {
        data.setValue(0, 1, 40 + Math.round(60 * Math.random()));
        chart.draw(data, options);
    }, 13000);
    setInterval(function () {
        data.setValue(1, 1, 40 + Math.round(60 * Math.random()));
        chart.draw(data, options);
    }, 5000);
    setInterval(function () {
        data.setValue(2, 1, 60 + Math.round(20 * Math.random()));
        chart.draw(data, options);
    }, 26000);
}

function grafPizzaMaisVendidos(prod) {
    let data = google.visualization.arrayToDataTable([
        ['Task', 'Hours per Day'],
        [prod[0].name, prod[0].price,],
        [prod[1].name, prod[1].price,],
        [prod[2].name, prod[2].price,],
        [prod[3].name, prod[3].price,],
        [prod[4].name, prod[4].price,]
    ]);

    let options = {
        pieHole: 0.4,
        backgroundColor: { fill: 'transparent' },
        titleTextStyle: {
            color: 'white',
            fontName: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'
        },
        legend: { position: 'none' },
        width: 400,
        height: 300
    };

    let chart = new google.visualization.PieChart(document.getElementById('grafPizVendidos'));
    chart.draw(data, options);
}

function grafLinhaReceita() {
    var data = new google.visualization.DataTable();
    data.addColumn('number',);
    data.addColumn('number');

    data.addRows([
        [1, 154000],
        [2, 250000],
        [3, 284000],
        [4, 305000],
        [5, 360000],
        [6, 501000]
    ]);

    var options = {

        backgroundColor: 'transparent',
        legend: { position: 'none' },
        width: 220,
        height: 220,
        colors: ['green'],
        hAxis: {
            textStyle: { color: 'white' },
            gridlines: { color: 'white' }
        },
        vAxis: {
            textStyle: { color: 'white' },
            gridlines: { color: 'white' }
        }

    };

    var chart = new google.visualization.LineChart(document.getElementById('grafLinha'));
    chart.draw(data, options);
}

function grafBarraReceita(prod) {
    var data = google.visualization.arrayToDataTable([
        [prod[0].name, prod[1].name, prod[2].name, prod[3].name, prod[4].name, { role: 'annotation' } ],
        [prod[0].price, prod[1].price, prod[2].price, prod[3].price, prod[4].price, ''],
      ]);

      var options = {
        backgroundColor: 'transparent',
        width: 220,
        height: 100,
        legend: { position: 'none'},
        bar: { groupWidth: '75%' },
        annotations: { textStyle: { color: 'white' } }, // Define o estilo do texto das anotações como branco
        hAxis: { textStyle: { color: 'white' } }, // Define o estilo do texto do eixo horizontal como branco
        vAxis: { textStyle: { color: 'white' } } ,
        isStacked: true
      };
    var chart = new google.visualization.BarChart(document.getElementById("grafBarra"));
    chart.draw(data, options);
}

function grafGeograf() {
    var data = google.visualization.arrayToDataTable([
      ['Country', 'Popularity'],
      ['Uruguay', 300],
      ['Argentina', 500],
      ['Brazil', 900]
    ]);

    var options = {
        backgroundColor: 'transparent',
        region: '005',
        width: 500,
        height: 230

    };

    var chart = new google.visualization.GeoChart(document.getElementById('grafGeografia'));
    chart.draw(data, options);
  }

(function () {
    let name = [
        'Gold Futures',
        'Platinum',
        'Lean Hogs Futures',
        'Corn Futures',
        'Aluminum Futures']

    let prod = [];
    for (let i = 0; i < name.length; i++) {
        $.ajax({
            method: 'GET',
            url: 'https://api.api-ninjas.com/v1/commodityprice?name=' + name[i],
            headers: { 'X-Api-Key': 'yXKWXkW34lAM1lOw0wVd8A==Jfu1rmMzChv3Hxf4' },
            contentType: 'application/json',
            success: function (result) {
                if (result.length !== 0) {
                    listarProduto(result);
                }
                prod.push(result);
                if (prod.length === name.length) {
                    grafPizzaMaisVendidos(prod);
                    grafBarraReceita(prod);
                }
            },
            error: function ajaxError(jqXHR) {
                console.error('Error: ', jqXHR.responseText);
            }
        });
    }
})();

function listarProduto(prod) {
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