
$("#sb-btn").click(function(){
  from_location = $("#from").val()
  to_location = $("#to").val()
  dis_date = $("#date").val()
  endpoint = "http://localhost:3000/api/search/QF?date="+ dis_date +"&from=" + from_location +"&to=" + to_location
  console.log(endpoint);
  $.get( endpoint, function(data, status){
      tbody_data = ""
      for (var i = 0 ; i < data.message.length ; i++) {
        d = data.message[i]
        flightinfo = ""
        var _flightNum = d.flightNum
        var _distance = d.distance
        var _durationMin = d.durationMin
        var _price = d.price
        var _starttime = d.start.dateTime
        var _startairport = d.start.airportName
        var _endtime = d.finish.dateTime
        var _endairport = d.finish.airportName
        flightinfo += "<td>"+ _flightNum +"</td>\
                      <td>"+ _distance +"</td>\
                      <td>"+ _durationMin +"</td>\
                      <td>"+ _price +"</td>\
                      <td>"+ _starttime +"</td>\
                      <td>"+ _startairport +"</td>\
                      <td>"+ _endtime +"</td>\
                      <td>"+ _endairport +"</td>"
        tbody_data += "<tr>" + flightinfo + "/<tr>"
        // console.log(tbody_data);
      }
      $('#flt_table_data').html(tbody_data);
  });
});
