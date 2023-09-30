import { menuArray as Items } from './data.js'
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

const modalForm = document.getElementById('modal')
let chartArray = []

document.addEventListener('click', function(e){
    console.log(e)
    if(e.target.dataset.add){
        console.log(`add button ${e.target.dataset.add}`) 
        handleaddItemClick(e.target.dataset.add)
    }
    else if(e.target.id === 'order-complete-btn'){
        console.log("confirm order button pressed") 
        modalForm.style.display = 'inline'
     }
     else if(e.target.id === 'modal-close-btn'){
        console.log("close modal btn pressed") 
        modalForm.style.display = 'none'
     }
     else if(e.target.id === 'pay-btn'){
        console.log("pay btn pressed") 
        modalForm.style.display = 'none'
     }
    
})

function handleaddItemClick(itemId){
    console.log(itemId)
    const targerItemObj = Items.filter(function(item){
        return item.id == itemId
    })[0]

    chartArray.push(
        {
            item : targerItemObj,
            uuid: uuidv4()
        }
    )
    console.log(chartArray)
}



function getItemsHtml(){
    let itemsHtml = ``
    
    Items.forEach(function(item){
     
        itemsHtml += `
                <div class="item-inner">
                    <p class="item-pic">${item.emoji}</p>
                    <div class="item-info">
                        <p class="item-name">${item.name}</p>
                        <p class="item-ingredients">${item.ingredients.join(", ")}</p>
                        <p class="item-price">${item.price} $</p>
                    </div>
                    <div class="item-add">
                        <span class="item-detail">
                            <p class="item-add-btn"
                            data-add="${item.id}"
                            >+</p>
                        </span> 
                    </div>            
                </div>
            `
   })
   return itemsHtml 
}

function render(){
    document.getElementById('items').innerHTML = getItemsHtml()
}

render()
