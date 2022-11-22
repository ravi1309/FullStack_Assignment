let button=document.querySelector("#esub");
var i=0;
button.addEventListener("click",(e)=>{
    e.preventDefault();
    let input=document.querySelector("#item");
    create(input.value);
    i++;
    localStorage.setItem("index"+i,input.value);
    localStorage.setItem("index",i);
    input.value="";
});

let del=document.querySelectorAll(".delete");
del.forEach((demo)=>{
    demo.addEventListener("click",()=>{
        document.getElementById("items").removeChild(demo.parentNode);
    });
    
});

let themes=document.querySelectorAll("input[name='theme']");
themes.forEach((demo)=>{
    demo.addEventListener('click',()=>{
        document.querySelector(":root").style.setProperty('--main-col',demo.id);
        localStorage.setItem('color',demo.id);
    });
});
window.addEventListener('load',()=>{
    let themeC=localStorage.getItem('color');
    document.querySelector(":root").style.setProperty('--main-col',themeC);
    let prev=localStorage.getItem("index");
    for(let k=1;k<=prev;k++)
        {
            if(localStorage.getItem("index"+k)!==null)
                create(localStorage.getItem("index"+k));
        }
    

});

let search=document.querySelector("#filter");
search.addEventListener("keypress",(e)=>{
    if(e.key==="Enter"){
        e.preventDefault();
        let menu=document.querySelectorAll(".list-group-item");
        let co=0;
        for(let k=0;k<menu.length;k++)
             {if(menu[k].textContent.slice(0,-1)===search.value)
                 continue;
             document.querySelector("#items").removeChild(menu[k]);
             co++;
             }
        if(co===menu.length)
             {
                alert("Nothing is found");
                window.location.reload();
             }
    }
})
function create(data){
    let it= document.createElement("li");
    it.innerText=data;
    let btn=document.createElement("button");
    btn.className="btn btn-danger btn-sm float-right delete";
    btn.innerText="X";
    it.appendChild(btn);
    btn.addEventListener('click',()=>{
        document.getElementById("items").removeChild(btn.parentNode);
        for(let h=1;h<=localStorage.getItem("index");h++){
            if(btn.parentNode.textContent.slice(0,-1)===localStorage.getItem("index"+h))
                localStorage.removeItem("index"+h);
        }
    });
    it.classList.add("list-group-item");
    document.querySelector("#items").appendChild(it);
}