

$(document).ready(function(){
    bringPartyroom();
    setCategoryShowCard();
    setPartyroomShowCard();
    setClientShowCard();
    setMessageShowCard();
    setReservShowCard();
    setReportShowCard()
    });


function saveCategory(){

    $("#resultado").empty();

    let myData ={name:$("#categoryName").val(),description:$("#categoryDescription").val()}
    let dataToSend = JSON.stringify(myData);

    $.ajax (
        {

            url          : 'http://129.80.206.229:8080/api/Category/save',
            type         : 'POST',
            data         :  dataToSend,
            datatype     :  "JSON",
            contentType  : 'application/json',
            success      :  function(respuesta){
                            $("#categoryName").val("");
                            $("#categoryDescription").val("");
                            alert("Success");
                            },
            error       :   function(xhr,status){
                                alert('Something went wrong'+ xhr.status );
                            },
            complete    :   function(){
                                bringCategory();
                                setCategoryShowCard()
                            }

        }
    );
}
function deleteCategory(idCategory) {

    $.ajax({
        url         :   'http://129.80.206.229:8080/api/Category/' + idCategory,
        type        :   'DELETE',

        success     :   function(pepe) {
                        alert("Successfully deleted");
                        },
        /*error : function(xhr, status) {
        alert('ha sucedido un problema');
        },*/

        complete    :   function(){
                        bringCategory();
                        }
        
        });

}


function bringCategory(){
    $.ajax(
              {
                url:"http://129.80.206.229:8080/api/Category/all",
                type:"GET",
                datatype:"JSON",
                success:function(respuesta){                
                    paintCategoryCards(respuesta);
                    
                },
                error       :   function(xhr,status){
                    alert('Something went wrong'+ xhr.status );
                }
            
                    
              }
               
          );
}


function paintCategoryCards(items){

    $("#result").empty();
    
    let myTable='<div class="container"><div class="row"><h2 class="tableTitle">Categories</h2>';
    
    for (i=0; i<items.length; i++){
        myTable+=`
        
        <div class= "card cardResultGen">
            <div class= "card body border-0" style="padding: 8px;">
                <h4 class= "card-title cardTitle">Category ${items[i].id}</h4>
                <h5 class= "card-subtitle">${items[i].name}</h5>
                <p class= "card-text">${items[i].description}</p>
                <button class="btn button3" onclick= "deleteCategory(${items[i].id})">Delete Category</button>
                </div>
        </div> 
        `
    }
    myTable+= "</div></div>";
    $("#result").append(myTable);
}
function setCategoryShowCard(){
    $("#cardCategory").empty();
    let f1 = `<div class="container">
                <div class="card border-0" style="width: 14rem;">
                <h1 class="mainCardTitle">Categories</h1>
                <button class="btn buttonGenShow" onclick ="bringCategory()">Show Categories</button>
                <button class="btn buttonGenSetSave" onclick="setCategorySaveCard()">New Category</button>
            </div>`;

    $("#cardCategory").append(f1);

}

function setCategorySaveCard(){

    $("#cardCategory").empty();

    let formulario = `<div class="container">
                        <div class="card border-0" style="width: 14rem;">
                            <input type="text" id="categoryName" placeholder="category name" style="margin-bottom: 2px;">
                            <input type="text" id="categoryDescription" placeholder="category description" style="margin-top: 6px; margin-bottom: 20px;">
                            <button class ="btn buttonGenSetSave" onclick="saveCategory()"> Save</button>
                            <button class ="btn buttonGenCancel" onclick="cancelSaveCategory()"> Cancel</button>
                        </div>
                    </div>`;

    $("#cardCategory").append(formulario);
}

function cancelSaveCategory(){
    $("#cardCategory").empty();
    setCategoryShowCard();
}

function bringPartyroom(){
    $.ajax(
              {
                url:"http://129.80.206.229:8080/api/Partyroom/all",
                type:"GET",
                datatype:"JSON",
                success:function(respuesta){
                    if(respuesta.length == 0){
                        paintPartyroomEmpty();
                    }else{
                        paintPartyroomCard(respuesta);
                    }
                    
                },
                error       :   function(xhr,status){
                    alert('Something went wrong'+ xhr.status );
                }
            
                    
              }
               
          );
}

function savePartyroom(){

    $("#result").empty();

    let myData ={owner:$("#partyroomOwner").val(),capacity:$("#partyroomCapacity").val(),category:{id:$("#idCategory").val()},name:$("#partyroomName").val(),description:$("#partyroomDesc").val(),}
    let dataToSend = JSON.stringify(myData);

    $.ajax (
        {

            url          : 'http://129.80.206.229:8080/api/Partyroom/save',
            type         : 'POST',
            data         :  dataToSend,
            datatype     :  "JSON",
            contentType  : 'application/json',
            success      :  function(respuesta){
                            $("#partyroomOwner").val("");
                            $("#partyroomCapacity").val("");
                            $("#idCategory").val("");
                            $("#partyroomName").val("");
                            $("#partyroomDesc").val("");
                            alert("Success");
                            },
            error       :   function(xhr,status){
                                alert('Something went wrong'+ xhr.status );
                            },
            complete    :   function(){
                                bringPartyroom();
                                setPartyroomShowCard();
                            }    

        }
    );
}

function paintPartyroomCard(items){

    $("#result").empty();
    let myTable= '<div class="container"><div class="row"><h2 class="tableTitle">Partyrooms</h2>';
    for (i=0; i<items.length; i++){
        myTable+=`
        <div class= "card cardResultGen">
            <div class= "card body border-0" style="padding: 8px;">
                <h4 class= "card-title cardTitle">Partyroom ${items[i].id}</h4>
                <h5 class= "card-subtitle mb-2 text">${items[i].name}</h5>
                <h5 class= "card-subtitle mb-2 text-muted">Owned by: ${items[i].owner}</h5>
                <h6 class= "card-subtitle mb-2 text-muted">Capacity: ${items[i].capacity}</h6>
                <p class= "card-text">${items[i].description}</p>
                <h6 class= "card-subtitle mb-2 text">Belongs to</h6>
                <ul class="list-group list-group-flush" style="margin-bottom: 7px;">
                    <li class="list-group-item" style="background-color: rgba(44, 43, 43, 0.5); color: white;">Category ${items[i].category.id}/${items[i].category.name}</li>
                    <li class="list-group-item" style="background-color: rgba(44, 43, 43, 0.5); color: white;">${items[i].category.description}</li>
                </ul>
                <h6 class=card-text">Messages in this partyroom</h6>
                <ul class="list-group list-group-flush" style="margin-bottom: 7px;">
                    <li class="list-group-item" style="background-color: rgba(44, 43, 43, 0.5); color: white;">${items[i].messages.messageText}</li>
                </ul>
                <h6 class=card-text">Reservations made for this partyroom</h6>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item" style="background-color: rgba(44, 43, 43, 0.5); color: white;">${items[i].reservations}</li>
                </ul>
                <button class="btn button3" onclick= "deletePartyroom(${items[i].id})">Delete Partyroom</button>
                </div>
            </div> 
        `
        
    }
    myTable+= "</div></div>";
    $("#result").append(myTable);
}

function paintPartyroomEmpty(){
    $("#result").empty();
    let myTable= '<div class="container"><div class="row"><h2 class="tableTitle">Partyrooms <p style="color:white; font-size:16px;">(currently empty)</p></h2>';
    $("#result").append(myTable);  


}

function setPartyroomShowCard(){
    $("#cardPartyroom").empty();
    let f1 = `<div class="container">
                <div class="card border-0" style="width: 14rem;">
                <h1 class="mainCardTitle">Partyrooms</h1>
                <button class="btn buttonGenShow" onclick ="bringPartyroom()">Show Partyrooms</button>
                <button class="btn buttonGenSetSave" onclick="setPartyroomSaveCard()">New Partyroom</button>
            </div>`;

    $("#cardPartyroom").append(f1);

}

function setPartyroomSaveCard(){

    $("#cardPartyroom").empty();

    let formulario = `<div class="container">
                        <div class="card border-0" style="width: 14rem;">
                            <input type="text" id="partyroomOwner" placeholder="Partyroom Owner" style="margin-bottom: 2px;">
                            <input type="text" id="partyroomCapacity" placeholder="Partyroom capacity" style="margin-top: 6px; margin-bottom: 2px;">
                            <input type="number" id="idCategory" placeholder="Category Id" style="margin-top: 6px; margin-bottom: 2px;">
                            <input type="text" id="partyroomName" placeholder="Partyroom Name" style="margin-top: 6px; margin-bottom: 2px;">
                            <input type="text" id="partyroomDesc" placeholder="Partyroom Description" style="margin-top: 6px; margin-bottom: 10px;">
                            <button class ="btn buttonGenSetSave" onclick="savePartyroom()"> Save</button>
                            <button class ="btn buttonGenCancel" onclick="cancelSavePartyroom()"> Cancel</button>
                        </div>
                    </div>`;

    $("#cardPartyroom").append(formulario);

}
function cancelSavePartyroom(){
    $("#cardPartyroom").empty();
    setPartyroomShowCard();
}


function deletePartyroom(idPartyroom) {

    $.ajax({
        url : 'http://129.80.206.229:8080/api/Partyroom/' + idPartyroom,
        type        :   'DELETE',

        success     :   function(pepe) {
                        alert("Successfully deleted");
                        },
        /*error : function(xhr, status) {
        alert('ha sucedido un problema');
        },*/

        complete    :   function(){
                        bringPartyroom();
                        }
        
        });

}


function saveClient(){

    $("#result").empty();

    let myData ={name:$("#clientName").val(),email:$("#clientEmail").val(),password:$("#clientPassword").val(),age:$("#clientAge").val()}
    let dataToSend = JSON.stringify(myData);

    $.ajax (
        {

            url          : 'http://129.80.206.229:8080/api/Client/save',
            type         : 'POST',
            data         :  dataToSend,
            datatype     :  "JSON",
            contentType  : 'application/json',
            success      :  function(respuesta){
                            $("#clientName").val("");
                            $("#clientEmail").val("");
                            $("#clientPassword").val("");
                            $("#clientAge").val("");
                            alert("Success");
                            },
            error       :   function(xhr,status){
                                alert('Something went wrong'+ xhr.status );
                            },
            complete    :   function(whoo){
                            bringClient();
                            setClientShowCard();
                            }                

        }
    );
}

function bringClient(){
    $.ajax(
              {
                url:"http://129.80.206.229:8080/api/Client/all",
                type:"GET",
                datatype:"JSON",
                success:function(respuesta){
                    paintClientCards(respuesta);                    
                },
                error       :   function(xhr,status){
                    alert('Something went wrong'+ xhr.status );
                }
            
                    
              }
               
          );
}

function deleteClient(idClientDel) {
    
    $.ajax({
        url         :   'http://129.80.206.229:8080/api/Client/' + idClientDel,
        type        :   'DELETE',
        

        success     :   function(pepe) {
                        alert("Successfully deleted");
                        },
        /*error : function(xhr, status) {
        alert('ha sucedido un problema');
        },*/

        complete    :   function(){
                        bringClient();
                        }
        
        });

}

function paintClientCards(items){

    $("#result").empty();
    let myTable='<div class="container"><div class="row"><h2 class="tableTitle">Clients</h2>';
    for (i=0; i<items.length; i++){
        myTable+=`
        <div class= "card cardResultGen">
            <div class= "card body border-0" style="padding: 8px;">
                <h4 class= "card-title cardTitle">Client ${items[i].idClient}</h4>
                <h5 class= "card-subtitle mb-2 text-muted">${items[i].email}</h5>
                <h6 class= "card-text text-muted">${items[i].password}</h6>
                <h5 class= "card-text">${items[i].name}</h5>
                <h5 class= "card-text">${items[i].age}</h5>
                <h6 class=card-text">Messages</h6>
                <ul class="list-group list-group-flush" style="margin-bottom: 7px;">
                    <li class="list-group-item" style="background-color: rgba(44, 43, 43, 0.5); color: white;">${items[i].messages.messageText}</li>
                </ul>
                <h6 class=card-text">Reservations made</h6>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item" style="background-color: rgba(44, 43, 43, 0.5); color: white;">${items[i].reservations}</li>
                </ul>
                <button class="btn button3" onclick= "deleteClient(${items[i].idClient})">Delete Client</button>
                
                
                </div>
            </div> 
        `
    }
    myTable+= "</div></div>";
    $("#result").append(myTable);
}

function setClientShowCard(){
    $("#cardClient").empty();
    let f1 = `<div class="container">
                <div class="card border-0" style="width: 14rem;">
                <h1 class="mainCardTitle">Clients</h1>
                <button class="btn buttonGenShow" onclick ="bringClient()">Show Clients</button>
                <button class="btn buttonGenSetSave" onclick="setClientSaveCard()">Register Client</button>
            </div>`;

    $("#cardClient").append(f1);

}

function setClientSaveCard(){

    $("#cardClient").empty();

    let formulario = `<div class="container">
                        <div class="card border-0" style="width: 14rem;">
                            <input type="text" id="clientName" placeholder="Client Name" style="margin-bottom: 2px;">
                            <input type="text" id="clientEmail" placeholder="Client email" style="margin-top: 6px; margin-bottom: 2px;">
                            <input type="text" id="clientPassword" placeholder="Client Password" style="margin-top: 6px; margin-bottom: 2px;">
                            <input type="number" id="clientAge" placeholder= "Client Age" style="margin-top: 6px; margin-bottom: 10px;">
                            <button class ="btn buttonGenSetSave" onclick="saveClient()"> Save</button>
                            <button class ="btn buttonGenCancel" onclick="cancelSaveClient()"> Cancel</button>
                        </div>
                    </div>`;

    $("#cardClient").append(formulario);

}
function cancelSaveClient(){
    $("#cardClient").empty();
    setClientShowCard();
}

/*
function pintarRespuestaClient(items){

    $("#result").empty();

   //declarar variables js
   let myTable="<table>";
   myTable += "<tr><th>Id</th><th> Email</th><th>Password</th><th>Name</th><th>Age</th><th>Messages</th><th>Reservations</th></tr>";
   for(i=0;i<items.length;i++){
       myTable+="<tr>";
       myTable+="<td>"+items[i].idClient+"</td>";
       myTable+="<td>"+items[i].email+"</td>";
       myTable+="<td>"+items[i].password+"</td>";
       myTable+="<td>"+items[i].name+"</td>";
       myTable+="<td>"+items[i].age+"</td>";                
       myTable+="<td>"+items[i].messages +"</td>";                        
       myTable+="<td>"+items[i].reservations+"</td>";                
       // myTable+="<td><button onclick='borrarElemento("+items[i].id+")'>Borrar</button>";
       myTable+="</tr>";
   }
   myTable +="</table>";
   $("#result").append(myTable);
}
*/

function saveMessage(){

    $("#result").empty();

    let myData ={messageText:$("#messageText").val(),client:{idClient:$("#idClientM").val()},partyroom:{id:$("#idPartyroomM").val()}}
    let dataToSend = JSON.stringify(myData);

    $.ajax (
        {

            url          : 'http://129.80.206.229:8080/api/Message/save',
            type         : 'POST',
            data         :  dataToSend,
            datatype     :  "JSON",
            contentType  : 'application/json',
            success      :  function(respuesta){
                            $("#messageText").val("");
                            $("#idClient").val("");
                            $("#idPartyroom").val("");
                            alert("Success!");
                            },
            error       :   function(xhr,status){
                                alert('Something went wrong'+ xhr.status );
                            },
            complete   :   function(m){
                                bringMessage();
                                setMessageShowCard();
                            }

        }
    );
}

function deleteMessage(idMessDel) {

    $.ajax({
        url : 'http://129.80.206.229:8080/api/Message/' + idMessDel,
        type        :   'DELETE',

        success     :   function(pepe) {
                        alert("Successfully deleted");
                        },
        /*error : function(xhr, status) {
        alert('ha sucedido un problema');
        },*/

        complete    :   function(){
                        bringMessage();
                        }
        
        });

}

function bringMessage(){
    $.ajax(
              {
                url:"http://129.80.206.229:8080/api/Message/all",
                type:"GET",
                datatype:"JSON",
                success:function(respuesta){
                    paintRespuestaMessage(respuesta);                    
                },
                error       :   function(xhr,status){
                    alert('Something went wrong'+ xhr.status );
                }
            
                    
              }
               
          );
}


function paintRespuestaMessage(items){

    $("#result").empty();
    let myTable='<div class="container"><div class="row"><h2 class="tableTitle">Messages</h2>';
    for (i=0; i<items.length; i++){
        myTable+=`
        <div class= "card cardResultGen">
            <div class= "card body border-0" style="padding: 8px;">
                <h4 class= "card-title cardTitle"> Message ${items[i].idMessage}</h4>
                <h4 class= "card-subtitle" style="margin-bottom: 20px;">${items[i].messageText}</h4>
                <h5 class= "card-subtitle">Left in</h5>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item" style="background-color: rgba(44, 43, 43, 0.5); color: white;">Partyroom ${items[i].partyroom.id}/${items[i].partyroom.name}</li>
                    <li class="list-group-item" style="background-color: rgba(44, 43, 43, 0.5); color: white;">Owned by ${items[i].partyroom.owner}</li>
                    <li class="list-group-item" style="background-color: rgba(44, 43, 43, 0.5); color: white;">Category ${items[i].partyroom.category.id}/${items[i].partyroom.category.name}</li>
                </ul>
                <h5 class= "card-text">By</h5>
                <ul class="list-group list-group-flush" style="margin-bottom:20px;">
                    <li class="list-group-item" style="background-color: rgba(44, 43, 43, 0.5); color: white;">Made by Client ${items[i].client.idClient}/${items[i].client.name}</li>
                    <li class="list-group-item" style="background-color: rgba(44, 43, 43, 0.5); color: white;">${items[i].client.email}</li>
                </ul>
                <button class="btn button3" onclick= "deleteMessage(${items[i].idMessage})">Delete Message</button>
                
                
                </div>
            </div> 
        `
    }
    myTable+= "</div></div>";
    $("#result").append(myTable);
}

function setMessageShowCard(){
    $("#cardMessage").empty();
    let f1 = `<div class="container">
                <div class="card border-0" style="width: 14rem;">
                <h1 class="mainCardTitle">Messages</h1>
                <button class="btn buttonGenShow" onclick ="bringMessage()">Show Messages</button>
                <button class="btn buttonGenSetSave" onclick="setMessageSaveCard()">New Message</button>
            </div>`;

    $("#cardMessage").append(f1);

}

function setMessageSaveCard(){

    $("#cardMessage").empty();

    let formulario = `<div class="container">
                        <div class="card border-0" style="width: 14rem;">
                            <input type="text" id="messageText" placeholder="Message Text" style="margin-bottom: 2px;">
                            <input type="number" id="idClientM" placeholder="Client Id" style="margin-top: 6px; margin-bottom: 2px;">
                            <input type="number" id="idPartyroomM" placeholder="Partyroom Id" style="margin-top: 6px; margin-bottom: 20px;">
                            <button class ="btn buttonGenSetSave" onclick="saveMessage()"> Save</button>
                            <button class ="btn buttonGenCancel" onclick="cancelSaveMessage()"> Cancel</button>
                        </div>
                    </div>`;

    $("#cardMessage").append(formulario);

}
function cancelSaveMessage(){
    $("#cardMessage").empty();
    setMessageShowCard();
}

function saveReserv(){

    $("#result").empty();

    let myData ={startDate:$("#startDate").val(),devolutionDate:$("#devolutionDate").val(),status:$("#statusR").val(),client:{idClient:$("#idClientR").val()},partyroom:{id:$("#idPartyroomR").val()}}
    let dataToSend = JSON.stringify(myData);
    console.log(dataToSend);

    $.ajax (
        {

            url          : 'http://129.80.206.229:8080/api/Reservation/save',
            type         : 'POST',
            data         :  dataToSend,
            datatype     :  "JSON",
            contentType  : 'application/json',
            success      :  function(respuesta){
                            $("#startDate").val("");
                            $("#devolutionDate").val("");
                            $("#idClientR").val("");
                            $("#idPartyroomR").val("");
                            $("#statusR").val("");
                            alert("Success!");
                            },
            error       :   function(xhr,status){
                                alert('Something went wrong'+ xhr.status );
                            },
            complete    :   function(r){
                                bringReserv();
                                setReservShowCard();
                            }

        }
    );
}

function deleteReserv(idResDel) {

    $.ajax({
        url         :   'http://129.80.206.229:8080/api/Reservation/' + idResDel,
        type        :   'DELETE',

        success     :   function(pepe) {
                        alert("Successfully deleted");
                        },
        /*error : function(xhr, status) {
        alert('ha sucedido un problema');
        },*/

        complete    :   function(){
                        bringReserv();
                        }
        
        });

}

function bringReserv(){
    $.ajax(
              {
                url:"http://129.80.206.229:8080/api/Reservation/all",
                type:"GET",
                datatype:"JSON",
                success:function(respuesta){
                    paintRespuestaReservation(respuesta);                    
                },
                error       :   function(xhr,status){
                    alert('Something went wrong'+ xhr.status );
                }
            
                    
              }
               
          );
}

function paintRespuestaReservation(items){

    $("#result").empty();
    let myTable='<div class="container"><div class="row"><h2 class="tableTitle">Reservations</h2>';
    for (i=0; i<items.length; i++){
        myTable+=`
        <div class= "card cardResultGen">
            <div class= "card body border-0" style="padding: 8px;">
                <h4 class= "card-title cardTitle"> Reservation ${items[i].idReservation}</h4>
                <h6 class= "card-subtitle mb-2 text-muted">From ${items[i].startDate}</h6>
                <h6 class= "card-text text-muted">To ${items[i].devolutionDate}</h6>
                <h5 class= "card-text">Made in</h5>
                <ul class="list-group list-group-flush" style="margin-bottom: 4px;">
                    <li class="list-group-item" style="background-color: rgba(44, 43, 43, 0.5); color: white;">Partyroom ${items[i].partyroom.id}/${items[i].partyroom.name}</li>
                    <li class="list-group-item" style="background-color: rgba(44, 43, 43, 0.5); color: white;">Owned by ${items[i].partyroom.owner}</li>
                    <li class="list-group-item" style="background-color: rgba(44, 43, 43, 0.5); color: white;">Category ${items[i].partyroom.category.id}/${items[i].partyroom.category.name}</li>
                </ul>
                <h5 class= "card-text" style="margin-bottom: 6px;">Made by</h5>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item" style="background-color: rgba(44, 43, 43, 0.5); color: white;">Client ${items[i].client.idClient}/${items[i].client.name}</li>
                    <li class="list-group-item" style="background-color: rgba(44, 43, 43, 0.5); color: white;">${items[i].client.email}</li>
                </ul>
                <h5 class= "card-text text-muted">Score ${items[i].score}</h5>
                <button class="btn button3" onclick= "deleteReserv(${items[i].idReservation})">Delete Reservation</button>
                </div>
            </div> 
        `
    }
    myTable+= "</div></div>";
    $("#result").append(myTable);
}

function setReservShowCard(){
    $("#cardReservation").empty();
    let f1 = `<div class="container">
                <div class="card border-0" style="width: 230px;">
                <h1 class="mainCardTitle">Reservations</h1>
                <button class="btn buttonGenShow" onclick ="bringReserv()">Show Reservations</button>
                <button class="btn buttonGenSetSave" onclick="setReservSaveCard()">New Reservation</button>
            </div>`;

    $("#cardReservation").append(f1);

}

function setReservSaveCard(){

    $("#cardReservation").empty();

    let formulario = `<div class="container">
                        <div class="card border-0" style="width: 14rem;">
                            <input type="date" id="startDate" placeholder="Start Date" style="margin-bottom: 2px;">
                            <input type="date" id="devolutionDate" placeholder="Devolution Date" style="margin-top: 6px; margin-bottom: 2px;">
                            <input type="number" id="idClientR" placeholder="Id Client" style="margin-top: 6px; margin-bottom: 2px;">
                            <input type="number" id="idPartyroomR" placeholder="Id Partyroom" style="margin-top: 6px; margin-bottom: 2px;">
                            <input type="text" id="statusR" placeholder="Status" style="margin-top: 6px; margin-bottom: 10px;">
                            <button class ="btn buttonGenSetSave" onclick="saveReserv()"> Save</button>
                            <button class ="btn buttonGenCancel" onclick="cancelSaveReserv()"> Cancel</button>
                        </div>
                    </div>`;

    $("#cardReservation").append(formulario);

}
function cancelSaveReserv(){
    $("#cardReservation").empty();
    setReservShowCard();
}

function setReportShowCard(){
    $("#cardReports").empty();

    let formulario = `<div class="container">
                            <div class="card border-0" style="width: 14rem;">
                                <h1 class="mainCardTitleReport">Reports</h1>
                                <button class ="btn buttonGenReports" onclick="setReportDates()"> Report Reservations by Date</button>
                                <button class ="btn buttonGenReports" onclick="bringReportStatus()"> Report Reservations by Status</button>
                                <button class ="btn buttonGenReports" onclick="bringReportClients()"> Report Top Clients</button>
                            </div>
                        </div>
    `;
    $("#cardReports").append(formulario);
}

function cancelOp(){
    $("#cardReports").empty();
    setReportShowCard();
}

function setReportDates(){
    $("#cardReports").empty();

    let formulario = `<div class="container">
                            <div class="card border-0" style="width: 14rem;">
                                <h3 class="mainCardTitleReport">Insert dates</h3>
                                <input type="date" id="rStartDate" placeholder="Start Date" style="margin-bottom: 2px;">
                                <input type="date" id="rDevolutionDate" placeholder="Devolution Date" style="margin-top: 6px; margin-bottom: 10px;"> 
                                <button class ="btn buttonGenShow" onclick="bringReportDates()"> Search</button>
                                <button class ="btn buttonGenCancel" onclick="cancelOp()"> Cancel</button>
                            </div>
                        </div>
    `;
    $("#cardReports").append(formulario);

}

function bringReportDates(){
    var fechaInicio = $("#rStartDate").val();
    var fechaCierre = $("#rDevolutionDate").val();

    //startDate:$("#startDate").val()

    $.ajax({
        url:"http://129.80.206.229:8080/api/Reservation/report-dates/"+fechaInicio+"/"+fechaCierre,
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            paintReportDate(respuesta);
            setReportShowCard();
        }
    });
}

function paintReportDate(items) {
    $("#result").empty();
    let myTable='<table class="table tableReport1"><h2 class="tableTitle">Report Reservations by Date</h2>';
        myTable+="<tr>";
        myTable+="<th>Devolution Date</th>";
        myTable+="<th>Start Date</th>";
        myTable+="<th>Status</th>";
        myTable+="</tr>";
        for(i=0;i<items.length;i++){
      
            myTable+="<tr>";
            myTable+="<td>"+items[i].devolutionDate+"</td>";
            myTable+="<td>"+items[i].startDate+"</td>";
            myTable+="<td>"+items[i].status+"</td>";
          
          
            myTable+="</tr>";
        }
        myTable+="</table>";
    $("#result").html(myTable);

}

function bringReportStatus(){
    $.ajax({
        url:"http://129.80.206.229:8080/api/Reservation/report-status",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            paintReportStatus(respuesta);
        }
    });
}

function paintReportStatus(response){
    $("#result").empty();

    let formulario = `<div class="container"><h2 class="tableTitle">Report Reservations by Status</h2>
                        <div class= "card cardResultGen">
                            <div class="card border-0" style="padding: 4px;">
                                <h4 class="card-title cardTitle">Reservations Completed</h4>
                                <h4 class="card-text">${response.completed}</h4>
                                <h4 class="card-title cardTitle">Reservations Cancelled</h4>
                                <h4 class="card-text">${response.cancelled}</h4>
                            </div>
                        </div>
                        </div>
    `;
    $("#result").append(formulario);

}

function bringReportClients(){
    $.ajax({
        url:"http://129.80.206.229:8080/api/Reservation/report-clients",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            paintReportClients(respuesta);
        }
    });
}

function paintReportClients(items){
    $("#result").empty();
    let myTable='<table class="table tableReport1"><h2 class="tableTitle">Report Top Clients</h2>';
        myTable+="<tr>";
        myTable+="<th>Total Reservations made</th>";
        myTable+="<th>Name</th>";  
        myTable+="<th>Email</th>"; 
        myTable+="<th>Age</th>"; 
        myTable+="</tr>";
        for(i=0;i<items.length;i++){
            myTable+="<tr>";
            myTable+="<td>"+items[i].total+"</td>";
            myTable+="<td>"+items[i].client.name+"</td>";
            myTable+="<td>"+items[i].client.email+"</td>";
            myTable+="<td>"+items[i].client.age+"</td>";
          
            myTable+="</tr>";
        }
        myTable+="</table>";
    $("#result").html(myTable);

}

function showMes(){
    $("#result").empty();
    let myTable='<div class="container"><div class="row"><h4 class="tableTitle">Message!</h4><div><h6 style="color: white;">Disculpas, no pude agregar lo de autenticación u.u</h6></div>;';
    $("#result").append(myTable);
}