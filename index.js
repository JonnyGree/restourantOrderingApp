import { menuArray as Items } from './data.js'
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

const modalForm = document.getElementById('modal')
const consentForm = document.getElementById('consent-form')

let chartArray = []

document.addEventListener('click', function(e){
    console.log(e)
    if(e.target.dataset.add){
        handleAddItemClick(e.target.dataset.add)
    }
    else if(e.target.dataset.remove){
        handleRemoveItemClick(e.target.dataset.remove)
    }
    else if(e.target.id === 'order-complete-btn'){
        modalForm.style.display = 'inline'
     }
     else if(e.target.id === 'modal-close-btn'){
        modalForm.style.display = 'none'
     }   
})

consentForm.addEventListener('submit', function(e){
    e.preventDefault()
    
    const consentFormData = new FormData(consentForm)
    const fullName = consentFormData.get('fullName')
    console.log(fullName)
    modalForm.style.display = 'none'
    renderOrderComplete(fullName)
    chartArray = []
  
}) 

function handleAddItemClick(itemId){
    const targerItemObj = Items.filter(function(item){
        return item.id === Number(itemId)
    })[0]

    chartArray.push(
        {
            item : targerItemObj,
            uuid: uuidv4()
        }
    )
    renderChart()
}

function handleRemoveItemClick(uuid){
    console.log(uuid)
    chartArray = chartArray.filter(function(item){
        return item.uuid != uuid
    })

    renderChart()
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

function getChartHtml(){
    let itemsHtml = ``
    if (chartArray.length === 0) {return itemsHtml}
    itemsHtml = `
        <p>Your order</p>
        <div class="order-list" id="order-list"></div>
        `
    
    chartArray.forEach(function(item){
        itemsHtml += `
        <div class="order-item">
            <p class="order-item-name">${item.item.name}</p>
            <p class="order-item-remove" data-remove="${item.uuid}">remove</p>
            <p class="order-item-price">$ ${item.item.price}</p>
        </div>
            `
   })

    const totalPrice = chartArray.reduce(function(total, currItem){
        return total + currItem.item.price
    }, 0)

   itemsHtml += `
        </div>
        <div class="order-summary">
           <p class="order-summary-label">Total price :</p>
           <p class="order-summary-price">$ ${totalPrice}</p> 
        </div>
        <button class="order-complete-btn" id="order-complete-btn">Complete Order</button>    
        `

   return itemsHtml 
}

function getOrderCompleteHtml(fullName){
    let itemsHtml = `<h2 id="order-complete-banner">Thanks, ${fullName}! Your order is on its way!</h2>`
    return itemsHtml
}


function renderItems(){
    document.getElementById('items').innerHTML = getItemsHtml()
}

function renderChart(){
    document.getElementById('order').innerHTML = getChartHtml()
}

function renderOrderComplete(fullName){
    document.getElementById('order').innerHTML = getOrderCompleteHtml(fullName)
}



renderItems()
