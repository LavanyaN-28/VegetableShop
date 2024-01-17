const form=document.getElementById("form");
const vegName=document.getElementById("name");
const vegPrice=document.getElementById("price");
const vegQuantity=document.getElementById("quantity");
const vegetablesList=document.getElementById("vegetableList");
const requiredQuan=document.getElementById("quantityToBuy")
const totalNoOfVeg=document.getElementById("total");

let count=0
function handleFormSubmit(event){
    event.preventDefault();

    const name=event.target.name.value
    const price=event.target.price.value;
    const quantity=event.target.quantity.value;

    const vegetables={
        name,
        price,
        quantity,
       quantityToBuy:''
    }
    
    axios.post('https://crudcrud.com/api/ff80c2fde1af41b189d55d7529d47020/vegetableData',vegetables)
    .then(response => {
        displayVegetables(vegetables)
        console.log(response.data)
    })
    .catch((error)=>{
    document.body.innerHTML=document.body.innerHTML + "<h4>Something went wrong</h4>";
    console.log(error)
    })
}
   
    window.addEventListener("DOMContentLoaded",()=>{

        axios.get('https://crudcrud.com/api/ff80c2fde1af41b189d55d7529d47020/vegetableData')
            .then((response) => {
                for(var i=0;i<response.data.length;i++){
                    displayVegetables(response.data[i]);
                } 
            })
            .catch((error) => {
                document.body.innerHTML=document.body.innerHTML + "<h4>Something went wrong</h4>";
                console.log(error)
            })
    })

    function displayVegetables(vegetables){
        const childElement=`<li id=${vegetables._id} >${vegetables.name}  RS:${vegetables.price} ${vegetables.quantity}KG
        <input type=text id=quantityToBuy>
    <button onclick=buyVegetables('${vegetables._id}','${vegetables.quantity}','${vegetables.price}','${vegetables.name}','${vegetables.quantityToBuy}')>Buy</button>
    <button onclick=deleteVegetable('${vegetables._id}')>Delete</button></li>` ;
    count+=1
    totalNoOfVeg.value=count
    vegetablesList.innerHTML=vegetablesList.innerHTML + childElement ;
    }
function buyVegetables(vegetableId,vegetableQuantity,buyingQuantity){
    const quant=document.getElementById('quantityToBuy').value
    quant=vegetableQuantity-buyingQuantity
    document.getElementById('quantityToBuy').value=quant
    console.log(quant)
}

function deleteVegetable(vegetableId){
    axios.delete(`https://crudcrud.com/api/ff80c2fde1af41b189d55d7529d47020/vegetableData/${vegetableId}`)
    .then(response => {removeFromScreen(vegetableId);
    console.log(response.data)})
    .catch((error) => {
        document.body.innerHTML=document.body.innerHTML + "<h4>Something went wrong</h4>";
        console.log(error)
    });
}

function removeFromScreen(vegetableId){
    const vegToBeDeleted= document.getElementById(vegetableId);
    if(vegToBeDeleted){
    vegetablesList.removeChild(vegToBeDeleted);
    if(totalNoOfVeg.value===0){
        totalNoOfVeg.value=0}
    else{
    totalNoOfVeg.value=count-1}
}
}