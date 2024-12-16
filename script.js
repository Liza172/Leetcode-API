let uname = document.querySelector("#input");
let search = document.querySelector(".search");
let lower = document.querySelector(".lower");
function addContent(data)
{

    let left = document.createElement("div");
    let middle = document.createElement("div");
    let right = document.createElement("div");
    left.setAttribute("class", "left flex");
    middle.setAttribute("class", "middle");
    right.setAttribute("class", "right");

    left.innerHTML = ` <div class="txt ">
                    <p class="flex">Rank:${data.ranking}</p>
                    <p class="flex">UserName: ${uname.value}</p>
                </div> `
    middle.innerHTML = `<div class="circle">
                    <div class="value">
                        <p>${data.totalSolved}/${data.totalQuestions}</p>
                        <p>Solved</p>
                    </div>
                </div>`
    right.innerHTML = `<div class="ques">
                    <div class="a">
                        <p>Easy</p>
                        <p>${data.easySolved}/${data.totalEasy}</p>
                    </div>
                    <div class="a">
                        <p>Medium</p>
                        <p>${data.mediumSolved}/${data.totalMedium}</p>
                    </div>
                    <div class="a">
                        <p>Hard</p>
                        <p>${data.hardSolved}/${data.totalHard}</p>
                    </div>
                </div>`
    lower.append(left);
    lower.append(middle);
    lower.append(right);



}

async function fetchApi(uname)
{
    fetch(`https://leetcode-api-faisalshohag.vercel.app/${uname}`)
    .then((responce)=>{
            return responce.json();
        })
    .then((data) =>{
            // console.log(data);
            // console.log(data.errors[0].message)
            // console.log(data.totalSolved);
            // console.log(data.totalSubmissions[0].difficulty);
            // console.log(data.ranking);
            if(data.ranking == undefined)
                document.querySelector(".errorMsg").innerHTML = data.errors[0].message
            else
            {
                document.querySelector(".errorMsg").innerHTML = "";
                addContent(data);
            }
           
            
        })
    .catch((error) =>{
            console.log(error);
        })
    
}

search.addEventListener('click', async()=>{
    console.log(uname.value);
    lower.innerHTML = "";
    const Username = uname.value.trim();
    if(Boolean(Username) == true)
    {
        document.querySelector(".alertMsg").style.display ="none";
        await fetchApi(Username);
    }    

    else
    {
        document.querySelector(".alertMsg").style.display ="block";
    }

    
})