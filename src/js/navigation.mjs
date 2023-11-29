export async function loadNavBar(){
    readJson().then(menuItems => {
        menuItems.map(appendMenuItem);
    });
}

async function readJson() {
    try {
        const response = await fetch('../json/nav_bar.json');
        const data = await response.json();
        return data.menu_item;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function appendMenuItem(menuItem) {
    let selector = document.querySelector("#nav_ul");

    let newLi = document.createElement("li");
    let newDiv = document.createElement("div");
    // let newIMG = document.createElement("img");
    // newIMG.setAttribute("src", menuItem.icon);
    let newLink = document.createElement("a");
    
    newLink.setAttribute("href","../categories.html?category=" + menuItem.parameter);
    newLink.innerHTML = `<img src="${menuItem.icon}"></img><p>${menuItem.title}</p>`;
        
    newDiv.appendChild(newLink);
    newLi.appendChild(newDiv);
    selector.appendChild(newLi);
}

