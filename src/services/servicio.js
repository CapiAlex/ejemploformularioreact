export async function consultarAgenda(){
    //RECETA PARA COCINAR EL CONSUMO DE APIS

    //1. PA' ONDE VAS // URI=URL+EP DEL SERVICIO
    const URI="https://pruegaapi20231.vercel.app/buscarReservas"
    
    //2. QUE VAS A HACER OME // Configuramos la peticion(metodo/headers/body)
    const PETICION={
        method:"GET",
        //headers:{}, //este parametro es opcional 
        //body:"" //este parametro es opcional
    }

    //3. ANDA PA'LLA BOOO..//CONSUMO EL API
    let respuesta=await fetch(URI,PETICION)

    //4. REVISALO OME //VERIFICO QUE LA RESPUESTA ESTE EN JSON()
    respuesta=await respuesta.json()

    //5. ENVIAMELA...//Retornamos la respuesta para que se use en un COMPONENTE
    return respuesta

    

}