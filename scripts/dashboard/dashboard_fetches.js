function getBotsDashboardBarchart(chart_name,chart_id){
    body = JSON.stringify({'chart_name':chart_name})
    return fetchModel('POST','botsDashboard',(data)=>{
        createBarChart(data[chart_name],chart_id,data[chart_name].title);
    },body)
}

function getBotsDashboardLinechart(chart_name,chart_id){
    body = JSON.stringify({'chart_name':chart_name})
    return fetchModel('POST','botsDashboard',(data)=>{
        createLineChart(data[chart_name],chart_id,data[chart_name].title);
    },body)
}