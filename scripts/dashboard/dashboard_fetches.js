function getBotsDashboardBarchart(chart_name,chart_id,date_ini='',date_fim='',bot_name=''){
    body = JSON.stringify({
        'chart_name':chart_name,
        'date_ini':date_ini,
        'date_fim':date_fim,
        'bot_name':bot_name
    })
    return fetchModel('POST','botsDashboard',(data)=>{
        createBarChart(data[chart_name],chart_id,data[chart_name].title);
    },body)
}

function getBotsDashboardPiechart(chart_name,chart_id,date_ini='',date_fim='',bot_name=''){
    body = JSON.stringify({
        'chart_name':chart_name,
        'date_ini':date_ini,
        'date_fim':date_fim,
        'bot_name':bot_name
    })
    return fetchModel('POST','botsDashboard',(data)=>{
        createPieChart(data[chart_name],chart_id,data[chart_name].title);
    },body)
}


function getBotsDashboardLinechart(chart_name,chart_id,date_ini='',date_fim='',bot_name=''){
    body = JSON.stringify({
        'chart_name':chart_name,
        'date_ini':date_ini,
        'date_fim':date_fim,
        'bot_name':bot_name
    })
    return fetchModel('POST','botsDashboard',(data)=>{
        createLineChart(data[chart_name],chart_id,data[chart_name].title);
    },body)
}

function getBotsName(department){
    return fetchModel('GET',`botsName/${department}`,buildBotsSelectConfigElements)
}