function autoInicioCategoria(){
    console.log("se esta ejecutando")
    $.ajax({
        url:"http://132.226.246.89:8082/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            let $select = $("#select-category");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
                console.log("select "+name.id);
            }); 
        }
    
    })
}
//Manejador GET
function traerInformacionGame() {
    $.ajax({
        url:"http://132.226.246.89:8082/api/Game/all",
        //url: "http://localhost:8080/api/Game/all",
        type: "GET",
        datatype: "JSON",
        success: function (response) {
            console.log(response);
            pintarRespuestaGame(response);
        }

    });

}

function pintarRespuestaGame(response){

    let myTable="<table>"
    myTable+="<tr>";
        myTable+="<td>Nombre</td>";
        myTable+="<td>Modelo</td>";
        myTable+="<td>Año</td>";
        myTable+="<td>Descripcion</td>";
        myTable+="<td>Categoria</td>";
    "</tr>";

    for(i=0;i<response.length;i++){
    myTable+="<tr>";
        myTable+="<td>" + response[i].name + "</td>";
        myTable+="<td>" + response[i].developer + "</td>";
        myTable+="<td>" + response[i].year + "</td>";
        myTable+="<td>" + response[i].description + "</td>";
        myTable+="<td>" + response[i].category.name + "</td>";
        myTable+='<td><button class = "botonGame2" onclick="borrar(' + response[i].id + ')">Borrar Game!</button></td>';
        myTable+='<td><button class = "botonGame2" onclick="cargarDatosGame(' + response[i].id + ')">Editar Game!</button></td>';
        myTable+='<td><button class = "botonGame2" onclick="actualizar(' + response[i].id + ')">Actualizar Game!</button></td>';
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#miListaGame").html(myTable);
}
//Capturar informacion para Actualizar
function cargarDatosGame(id) {
    $.ajax({
        dataType: 'JSON',
        url:"http://132.226.246.89:8082/api/Game/"+id,
        //url: "http://localhost:8080/api/Game/" + id,
        type: 'GET',

        success: function (response) {
            console.log(response);
            var item = response;

            $("#id").val(item.id);
            $("#name2").val(item.name);
            $("#developer").val(item.developer);
            $("#year").val(item.year);
            $("#description2").val(item.description);

        },

        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function agregarGame() {

    if($("#name2").val().length == 0 || $("#developer").val().length == 0 || $("#year").val().length == 0 || $("#description2").val().length == 0){
       alert("Todos los campos son obligatorios")
    }else{

            let elemento = {
                name: $("#name2").val(),
                developer: $("#developer").val(),
                year: $("#year").val(),
                description: $("#description2").val(),
                category:{id: +$("#select-category").val()},
            }

            let dataToSend = JSON.stringify(elemento);
            console.log(elemento);

            $.ajax({
                type: "POST",
                contentType: "application/json",
                url:"http://132.226.246.89:8082/api/Game/save",
                //url: "http://localhost:8080/api/Game/save",
                data: dataToSend,
                datatype: 'JSON',

                success: function (response) {
                    console.log(response);
                    console.log("Se guardo Correctamente");
                    //Limpiar Campos
                    $("#resultado2").empty();
                    $("#name2").val("");
                    $("#developer").val("");
                    $("#year").val("");
                    $("#description2").val("");
                    

                    //Listar Tabla

                    alert("Se ha guardado Correctamente!")
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert("No se Guardo Correctamente")
                }
            });
    }
}
//Manejador DELETE
function borrar(idElemento) {
    var elemento = {
        id: idElemento
    }

    var dataToSend = JSON.stringify(elemento);
console.log(dataToSend);
    $.ajax(
        {
            dataType: 'JSON',
            data: dataToSend,
            url:"http://132.226.246.89:8082/api/Game/"+idElemento,
            //url: "http://localhost:8080/api/Game/" + idElemento,
            type: 'DELETE',
            contentType: "application/JSON",
            success: function (response) {
                console.log(response);
                $("#miListaGame").empty();

                alert("se ha Eliminado Correctamente!")
            },

            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se Elimino Correctamente!")
            }
        });
}

//Manejador PUT
function actualizar(idElemento) {
    
    if($("#name2").val().length == 0 || $("#developer").val().length == 0 || $("#year").val().length == 0 || $("#description2").val().length == 0){
        alert("Todos los campos deben estar llenos")
    }else{
        let elemento = {
            id: idElemento,
            name: $("#name2").val(),
            developer: $("#developer").val(),
            year: $("#year").val(),
            description: $("#description2").val(),
            category:{id: +$("#select-category").val()},
        }

        console.log(elemento);
        let dataToSend = JSON.stringify(elemento);

        $.ajax({
            datatype: 'JSON',
            data: dataToSend,
            contentType: "application/JSON",
            url:"http://132.226.246.89:8082/api/Game/update",
            //url: "http://localhost:8080/api/Game/update",
            type: "PUT",

            success: function (response) {
                console.log(response);
                $("#miListaGame").empty();
                //listarGame();
                alert("se ha Actualizado Correctamente!")

                //Limpiar Campos
                $("#resultado2").empty();
                $("#id").val("");
                $("#name2").val("");
                $("#developer").val("");
                $("#year").val("");
                $("#description2").val("");

            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se Actualizo Correctamente!")
            }
        });
    }
}
