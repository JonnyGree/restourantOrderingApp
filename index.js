import { menuArray as Items } from './data.js'

function getItemsHtml(){
    let itemsHtml = ``
    
    Items.forEach(function(item){
     
        itemsHtml += `
                <div class="tweet-inner">
                    <p class="item-pic">${item.emoji}</p>
                    <div class="item-info">
                        <p class="item-name">${item.name}</p>
                        <p class="item-ingredients">${item.ingredients.join(", ")}</p>
                        <p class="item-price">${item.price}</p>
                    </div>
                    <div class="item-add">
                        <span class="tweet-detail">
                            <i class="fa fa-plus" aria-hidden="true"
                            data-reply="${item.id}"
                            ></i>
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
