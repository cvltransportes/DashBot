document.addEventListener('DOMContentLoaded', function() {
    getBotsDashboardBarchart('qtde_fails_per_bot','chart1')
    getBotsDashboardLinechart('qtde_not_end_per_bot','chart2')
    getBotsDashboardLinechart('qtde_days_per_bot','chart3')
    getBotsDashboardBarchart('qtde_per_department','chart4')
    getBotsDashboardBarchart('qtde_classification_bots','chart5')
    getBotsDashboardBarchart('qtde_situation_bots','chart6')
    getBotsDashboardLinechart('qtde_days_per_user','chart7')
    getBotsDashboardBarchart('qtde_total_bots','chart8')

});