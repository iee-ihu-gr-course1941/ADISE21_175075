function play(){

    var id = uuidv4();

    var json = {
        "client_id" : id
    };

    console.log(id);
    var xhr = new XMLHttpRequest();

    xhr.open('POST', 'http://localhost/adise/index.html/api/create-client.php', true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onload = function(){
        if(this.status == 200){
            console.log(this.response);
        }
    }
    xhr.send(JSON.stringify(json));
}

function uuidv4() {
    return '_' + Math.random().toString(36).substr(2, 9);
}
  