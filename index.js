import { menuArray as Items } from './data.js'

document.addEventListener('click', function(e){
    console.log(e)
})



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
                            data-reply="${item.id}"
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
