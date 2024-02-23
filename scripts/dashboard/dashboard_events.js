document.addEventListener('DOMContentLoaded', function() {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];
    document.getElementById('date_ini').value = '2023-01-01'
    document.getElementById('date_fim').value = formattedDate
    getBotsName()
});


document.addEventListener('DOMContentLoaded', function() {
    showLoader()
    getBotsDashboardBarchart('qtde_fails_per_bot','chart1')
    .finally(()=>hideLoader())
    getBotsDashboardLinechart('qtde_not_end_per_bot','chart2')
    getBotsDashboardLinechart('qtde_days_per_bot','chart3')
    getBotsDashboardBarchart('qtde_per_department','chart4')
    getBotsDashboardLinechart('qtde_days_per_user','chart5')
    getBotsDashboardBarchart('qtde_total_bots','chart6')
    getBotsDashboardPiechart('qtde_classification_bots','chart7')
    getBotsDashboardPiechart('qtde_situation_bots','chart8')
});

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('dashboard_date'); // Get the form by its ID

    form.addEventListener('submit', function(e) {
      e.preventDefault(); // Prevent the default form submission behavior
      const dateIni = document.getElementById('date_ini').value;
      const dateFim = document.getElementById('date_fim').value;
      const bot_name = document.getElementById('bot_select_name').value;
      console.log(`Data Inicial: ${dateIni}, Data Final: ${dateFim}`);
      if (bot_name){
        showLoader()
        getBotsDashboardCardchart('qtde_fails_per_bot','chart1',dateIni,dateFim,bot_name)
        .finally(()=>hideLoader())
        getBotsDashboardCardchart('qtde_not_end_per_bot','chart2',dateIni,dateFim,bot_name)
        getBotsDashboardCardchart('qtde_days_per_bot','chart3',dateIni,dateFim,bot_name)
        getBotsDashboardCardchart('qtde_per_department','chart4',dateIni,dateFim,bot_name)
        getBotsDashboardPiechart('qtde_days_per_user','chart5',dateIni,dateFim,bot_name)
        getBotsDashboardCardchart('qtde_total_bots','chart6',dateIni,dateFim,bot_name)
        getBotsDashboardPiechart('qtde_classification_bots','chart7',dateIni,dateFim,bot_name)
        getBotsDashboardPiechart('qtde_situation_bots','chart8',dateIni,dateFim,bot_name)
      }
      else{
        showLoader()
        getBotsDashboardBarchart('qtde_fails_per_bot','chart1',dateIni,dateFim,'')
        .finally(()=>hideLoader())
        getBotsDashboardLinechart('qtde_not_end_per_bot','chart2',dateIni,dateFim,'')
        getBotsDashboardLinechart('qtde_days_per_bot','chart3',dateIni,dateFim,'')
        getBotsDashboardBarchart('qtde_per_department','chart4',dateIni,dateFim,'')
        getBotsDashboardLinechart('qtde_days_per_user','chart5',dateIni,dateFim,'')
        getBotsDashboardBarchart('qtde_total_bots','chart6',dateIni,dateFim,'')
        getBotsDashboardPiechart('qtde_classification_bots','chart7',dateIni,dateFim,'')
        getBotsDashboardPiechart('qtde_situation_bots','chart8',dateIni,dateFim,'')
      }

    });
  });
