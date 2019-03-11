var $TABLE = $('#table');

//get_buildings fills the table with every building of the API
function get_buildings(){
  window.actual = "https://hugues-chanteloup-faircorp.cleverapps.io/api/buildings";
  $.getJSON("https://hugues-chanteloup-faircorp.cleverapps.io/api/buildings", function(mydata){
    $('tbody').empty();
    $("#thiswill").empty();

    //fills the first line with the name of the attributes of buildings (Ex : id, Name etc..)
    var attributes = document.createElement("tr");
    for (var attribute in mydata[0]){
      var content = document.createElement("th");
      var text = document.createTextNode(attribute);
      content.appendChild(text);
      attributes.appendChild(content);
    }
    window.primary_key = Object.keys(mydata[0])[0];
    var content = document.createElement("th");
    var text = document.createTextNode("remove");
    content.appendChild(text);
    attributes.appendChild(content);
    var content = document.createElement("th");
    var text = document.createTextNode("select");
    content.appendChild(text);
    attributes.appendChild(content);
    $TABLE.find('table').append(attributes);

    //fills the next lines with the caracteristics of each building
    for (var row of mydata){
      var row_content = document.createElement("tr");
      for (var cellule in row){
        var cellule_content = document.createElement("td");
        cellule_content.setAttribute("class", "pt-3-half");
        cellule_content.setAttribute("contenteditable", "false");
        var text = document.createTextNode(row[cellule]);
        cellule_content.appendChild(text);
        row_content.appendChild(cellule_content);
      }

    //Creation and addition to the line of a Remove button
    var remove_cellule = document.createElement("td");
    var span = document.createElement("span");
    span.setAttribute("class","table-remove");
    var button_r = document.createElement("button");
    button_r.setAttribute("id",Object.values(row)[0]);
    button_r.setAttribute("onClick","remove(this.id)");
    button_r.setAttribute("class","btn btn-danger btn-rounded btn-sm my-0");
    button_r.appendChild(document.createTextNode("Remove"));
    span.appendChild(button_r);
    remove_cellule.appendChild(span);
    row_content.appendChild(remove_cellule);

    //Creation and addition to the line of a Select button
    var change_cellule = document.createElement("td");
    var span = document.createElement("span");
    span.setAttribute("class","table-remove");
    var button_r = document.createElement("button");
    button_r.setAttribute("id",[Object.values(row)[0],Object.values(row)[1]]);  //The id attribute of the button contains the id and the name of the building the button reffers to.
    button_r.setAttribute("onClick","get_rooms(this.id)");
    button_r.setAttribute("class","btn btn-success btn-rounded btn-sm my-0");
    button_r.appendChild(document.createTextNode("Select This Building"));
    span.appendChild(button_r);
    change_cellule.appendChild(span);
    row_content.appendChild(change_cellule);

    $TABLE.find('table').append(row_content);
    }
  });
}


//get_rooms fills the table with every room of the selected building
function get_rooms(buildingid){

  var buildinginfo = buildingid.split(",");
  var building_name = buildinginfo[1];
  window.selected_building_id = buildingid;
  buildingid = parseInt(buildinginfo[0]);

  document.getElementById("selected_building").innerHTML = "Selected Building : "
  var button_r = document.createElement("button");
  button_r.setAttribute("onClick","get_rooms(window.selected_building_id)");
  button_r.setAttribute("class","btn btn-success btn-rounded btn-sm my-0");
  button_r.appendChild(document.createTextNode(building_name));
  document.getElementById("selected_building").appendChild(button_r);


  window.actual = "https://hugues-chanteloup-faircorp.cleverapps.io/api/rooms";
  $.getJSON("https://hugues-chanteloup-faircorp.cleverapps.io/api/rooms", function(mydata){
    $('tbody').empty();
    $("#thiswill").empty();

    //fills the first line with the name of the attributes of rooms (Ex : id, Name etc..)
    var attributes = document.createElement("tr");
    for (var attribute in mydata[0]){
      var content = document.createElement("th");
      var text = document.createTextNode(attribute);
      content.appendChild(text);
      attributes.appendChild(content);
    }
    window.primary_key = Object.keys(mydata[0])[0];
    var content = document.createElement("th");
    var text = document.createTextNode("remove");
    content.appendChild(text);
    attributes.appendChild(content);
    var content = document.createElement("th");
    var text = document.createTextNode("select");
    content.appendChild(text);
    attributes.appendChild(content);
    $TABLE.find('table').append(attributes);

    //fills the next lines with the caracteristics of each room
    for (var row of mydata){
      if (Object.values(row)[3]==buildingid){
        var row_content = document.createElement("tr");
        for (var cellule in row){
          var cellule_content = document.createElement("td");
          cellule_content.setAttribute("class", "pt-3-half");
          cellule_content.setAttribute("contenteditable", "false");
          var text = document.createTextNode(row[cellule]);
          cellule_content.appendChild(text);
          row_content.appendChild(cellule_content);
        }

        //Creation and addition to the line of a Remove button
        var remove_cellule = document.createElement("td");
        var span = document.createElement("span");
        span.setAttribute("class","table-remove");
        var button_r = document.createElement("button");
        button_r.setAttribute("id",Object.values(row)[0]);
        button_r.setAttribute("onClick","remove(this.id)");
        button_r.setAttribute("class","btn btn-danger btn-rounded btn-sm my-0");
        button_r.appendChild(document.createTextNode("Remove"));
        span.appendChild(button_r);
        remove_cellule.appendChild(span);
        row_content.appendChild(remove_cellule);

        //Creation and addition to the line of a Select button
        var change_cellule = document.createElement("td");
        var span = document.createElement("span");
        span.setAttribute("class","table-remove");
        var button_r = document.createElement("button");
        button_r.setAttribute("id",[Object.values(row)[0],Object.values(row)[1]]); //The id attribute of the button contains the id and the name of the room the button reffers to.
        button_r.setAttribute("onClick","get_lights(this.id)");
        button_r.setAttribute("class","btn btn-success btn-rounded btn-sm my-0");
        button_r.appendChild(document.createTextNode("Select This Room"));
        span.appendChild(button_r);
        change_cellule.appendChild(span);
        row_content.appendChild(change_cellule);
        $TABLE.find('table').append(row_content);
      }
    }
  });
}

function get_lights(roomid){
  window.selected_room_id= roomid;
  var roominfo = roomid.split(",");
  roomid = parseInt(roominfo[0]);
  var room_name = roominfo[1];

  document.getElementById("selected_room").innerHTML = "Selected Room : ";
  var button_r = document.createElement("button");
  button_r.setAttribute("onClick","get_lights(window.selected_room_id)");
  button_r.setAttribute("class","btn btn-success btn-rounded btn-sm my-0");
  button_r.appendChild(document.createTextNode(room_name));
  document.getElementById("selected_room").appendChild(button_r);


  window.actual = "https://hugues-chanteloup-faircorp.cleverapps.io/api/lights";
  $.getJSON("https://hugues-chanteloup-faircorp.cleverapps.io/api/lights", function(mydata){
    $('tbody').empty();
    $("#thiswill").empty();

    //fills the first line with the name of the attributes of lights (Ex : id, Brightness etc..)
    var attributes = document.createElement("tr");
    for (var attribute in mydata[0]){
      var content = document.createElement("th");
      var text = document.createTextNode(attribute);
      content.appendChild(text);
      attributes.appendChild(content);
    }
    window.primary_key = Object.keys(mydata[0])[0];
    var content = document.createElement("th");
    var text = document.createTextNode("remove");
    content.appendChild(text);
    attributes.appendChild(content);
    var content = document.createElement("th");
    var text = document.createTextNode("change brightness");
    content.appendChild(text);
    attributes.appendChild(content);
    $TABLE.find('table').append(attributes);

    //fills the next lines with the caracteristics of each light
    for (var row of mydata){
      console.log(Object.values(row));
      if (Object.values(row)[3]==roomid){
        var row_content = document.createElement("tr");
        for (var cellule in row){
          var cellule_content = document.createElement("td");
          cellule_content.setAttribute("class", "pt-3-half");
          cellule_content.setAttribute("contenteditable", "false");
          //specification for ON/OFF caracteristic that will be displayed as a button that can be clicked to change the status of the light
          if(row[cellule]=="ON"||row[cellule]=="OFF"){
            var span = document.createElement("span");
            span.setAttribute("class","table-remove");
            var button_r = document.createElement("button");
            console.log(Object.values(row)[0]);
            button_r.setAttribute("id",Object.values(row)[0]);
            button_r.setAttribute("onClick","switch_on_off(this.id)");
            button_r.setAttribute("class","btn btn-success btn-rounded btn-sm my-0");
            button_r.appendChild(document.createTextNode(row[cellule]));
            span.appendChild(button_r);
            cellule_content.appendChild(span);
          } else{
            var text = document.createTextNode(row[cellule]);
            cellule_content.appendChild(text);
          }
          row_content.appendChild(cellule_content);
        }

        //Creation and addition to the line of a Remove button
        var remove_cellule = document.createElement("td");
        var span = document.createElement("span");
        span.setAttribute("class","table-remove");
        var button_r = document.createElement("button");
        button_r.setAttribute("id",Object.values(row)[0]);
        button_r.setAttribute("onClick","remove(this.id)");
        button_r.setAttribute("class","btn btn-danger btn-rounded btn-sm my-0");
        button_r.appendChild(document.createTextNode("Remove"));
        span.appendChild(button_r);
        remove_cellule.appendChild(span);
        row_content.appendChild(remove_cellule);

        //Creation and addition to the line of a Change Brightness button
        var change_cellule = document.createElement("td");
        var span = document.createElement("span");
        span.setAttribute("class","table-remove");
        var button_r = document.createElement("button");
        console.log(Object.values(row)[0]);
        button_r.setAttribute("id",Object.values(row)[0]);
        button_r.setAttribute("onClick","change_level(this.id)");
        button_r.setAttribute("class","btn btn-success btn-rounded btn-sm my-0");
        button_r.appendChild(document.createTextNode("Change Brightness"));
        span.appendChild(button_r);
        change_cellule.appendChild(span);
        row_content.appendChild(change_cellule);


        $TABLE.find('table').append(row_content);
      }
    }
  });
}

//function that adds a building to the API
function post_building(name){
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "https://hugues-chanteloup-faircorp.cleverapps.io/api/buildings", true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.onload = function(){
    get_buildings();
  }
  xhttp.send(JSON.stringify({"name":name}));
}

//function that adds a room to the API
function post_room(name,floor,buildingid,status){
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "https://hugues-chanteloup-faircorp.cleverapps.io/api/rooms", true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.onload = function(){
    get_rooms(window.selected_building_id);
  }
  xhttp.send(JSON.stringify({"name":name,"floor":Number(floor),"buildingid":Number(buildingid)}));
}

//function that adds a light to the API
function post_light(level,status,roomid){
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "https://hugues-chanteloup-faircorp.cleverapps.io/api/lights", true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.onload = function(){
    get_lights(window.selected_room_id);
  }
  xhttp.send(JSON.stringify({"level":Number(level),"status":status,"roomid":Number(roomid)}));
}

//function that removes an object from the API
function remove(id){
  console.log(id);
  var xhttp = new XMLHttpRequest();
  if(actual=="https://hugues-chanteloup-faircorp.cleverapps.io/api/buildings"){
    xhttp.open("DELETE", "https://hugues-chanteloup-faircorp.cleverapps.io/api/buildings/"+id, true);
    xhttp.onload = function(){
      get_buildings();
    }
    xhttp.send(null);
  }
  if(actual=="https://hugues-chanteloup-faircorp.cleverapps.io/api/rooms"){
    xhttp.open("DELETE", "https://hugues-chanteloup-faircorp.cleverapps.io/api/rooms/"+id, true);
    xhttp.onload = function(){
      get_rooms(window.selected_building_id);
    }
    xhttp.send(null);}
  if(actual=="https://hugues-chanteloup-faircorp.cleverapps.io/api/lights"){
    xhttp.open("DELETE", "https://hugues-chanteloup-faircorp.cleverapps.io/api/lights/"+id, true);
    xhttp.onload = function(){
      get_lights(window.selected_room_id);
    }
    xhttp.send(null);
  	}
}

//function that switches a light status on the API
function switch_on_off(id){
  console.log(id);
  var xhttp = new XMLHttpRequest();
  xhttp.open("PUT","https://hugues-chanteloup-faircorp.cleverapps.io/api/lights/"+id+"/switch",true);
  xhttp.onload = function(){
    get_lights(window.selected_room_id);
  }
  xhttp.send();
}

//function that changes light brightness on the API
function put_lights_level(id,level){
  console.log("id: "+id);
  console.log("level: "+level);
  var xhttp = new XMLHttpRequest();
  xhttp.open("PUT","https://hugues-chanteloup-faircorp.cleverapps.io/api/lights/"+id+"/switch_level/"+level,true);
  xhttp.onload = function(){
    get_lights(window.selected_room_id);
  }
  xhttp.send();
}

//Add function on the web Interface : Collects informations needed to create a new element on the API -> It creates a poll that is completed by the user then calls post functions on submit
$('.table-add').click(function () {
  var actual = window.actual;
  $("#thiswill").empty();
  var container = document.getElementById("thiswill");
  var div = document.createElement("div");
  div.className = "form-group";
  console.log(actual);
  if (window.actual==="https://hugues-chanteloup-faircorp.cleverapps.io/api/buildings"){
    console.log("yes")
    var label = document.createElement("label");
    var text = document.createTextNode("Name:");
    label.appendChild(text);
    div.appendChild(label);
    var input = document.createElement("input");
    input.type = "text";
    input.className = "form-control";
    input.id = "name"
    div.appendChild(input)
  }
  if (actual=="https://hugues-chanteloup-faircorp.cleverapps.io/api/rooms"){
    var label = document.createElement("label");
    var text = document.createTextNode("Name:");
    label.appendChild(text);
    div.appendChild(label);
    var input = document.createElement("input");
    input.type = "text";
    input.className = "form-control";
    input.id = "name"
    div.appendChild(input)
    var label = document.createElement("label");
    var text = document.createTextNode("Floor:");
    label.appendChild(text);
    div.appendChild(label);
    var input = document.createElement("input");
    input.type = "number";
    input.className = "form-control";
    input.id = "floor"
    div.appendChild(input)
  }
  if (window.actual=="https://hugues-chanteloup-faircorp.cleverapps.io/api/lights"){
    var label = document.createElement("label");
    var text = document.createTextNode("Level:");
    label.appendChild(text);
    div.appendChild(label);
    var input = document.createElement("input");
    input.type = "number";
    input.className = "form-control";
    input.id = "level"
    div.appendChild(input)
    var label = document.createElement("label");
    var text = document.createTextNode("Status:");
    label.appendChild(text);
    div.appendChild(label);
    var input = document.createElement("input");
    input.type = "text";
    input.className = "form-control";
    input.id = "status"
    div.appendChild(input)
  }
  container.appendChild(div);
  var submit_button = document.createElement("button");
  submit_button.type = "submit";
  submit_button.className = "btn btn-default";
  submit_button.id = "submitButton";
  var text = document.createTextNode("Submit");
  submit_button.appendChild(text);
  if(window.actual=="https://hugues-chanteloup-faircorp.cleverapps.io/api/buildings"){submit_button.onclick = function(){ post_building(document.getElementById('name').value)};}
  if(window.actual=="https://hugues-chanteloup-faircorp.cleverapps.io/api/rooms"){submit_button.onclick = function(){ post_room(document.getElementById('name').value,document.getElementById('floor').value,parseInt(window.selected_building_id.split(",")))};}
  if(window.actual=="https://hugues-chanteloup-faircorp.cleverapps.io/api/lights"){submit_button.onclick = function(){ post_light(document.getElementById('level').value,document.getElementById('status').value,parseInt(window.selected_room_id.split(",")))};}
  container.appendChild(submit_button);
});

//Change Bightness function on the web Interface : Asks through a poll to the user the brightness wanted for the light then calls put_lights_level on submit
function change_level(id){
  $("#thiswill").empty();
  var container = document.getElementById("thiswill");
  var div = document.createElement("div");
  div.className = "form-group";
  var label = document.createElement("label");
  var text = document.createTextNode("New Level:");
  label.appendChild(text);
  div.appendChild(label);
  var input = document.createElement("input");
  input.type = "number";
  input.className = "form-control";
  input.id = "level"
  div.appendChild(input)
  container.appendChild(div);
  var submit_button = document.createElement("button");
  submit_button.type = "submit";
  submit_button.className = "btn btn-default";
  submit_button.id = "submitButton";
  var text = document.createTextNode("Submit");
  submit_button.appendChild(text);
  submit_button.onclick = function(){put_lights_level(id,document.getElementById('level').value)};
  container.appendChild(submit_button);
}
