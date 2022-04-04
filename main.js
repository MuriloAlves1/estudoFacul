const BASE_URL = 'https://superheroapi.com/api.php/' + '4813944732037254';
let hero1 = 0;
let hero2 = 0;
let bFirst = 0;


function getJSON(url,callback){
    var xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.open("GET",url,true);
   
    xhr.onload = function(){
        if(xhr.status === 200)
            callback(xhr.response);
        else
            console.log("error status:" + xhr.status);
    }
    xhr.onloadend = function(){
        if(bFirst == 0)
            bFirst = 1;
        else{
             let el = document.getElementById("result");
    
            if(hero1 > hero2){
                el.innerHTML = "<h1>Herói 1 é o vencedor < </h1>";
                document.getElementById("img2").style.filter.blur = 10;
            }
            else if(hero2 > hero1){
                el.innerHTML = "<h1>Herói 2 é o vencedor > </h1>";
                document.getElementById("img1").style.filter.blur = 10;
            }
            else
                el.innerHTML = "<h1>EMPATE</h1>";
            console.log("hero1:" + hero1 + "\r\nhero2:" + hero2);
        }
    }
    xhr.send();
}

window.onload = function(){
    bFirst = 0;
    renderHero(1,Math.floor(Math.random() * 731) + 1);
    renderHero(2,Math.floor(Math.random() * 731) + 1);
   
}

function renderHero(nro,id)
{
    var myurl =  BASE_URL + "/" + id;
    let el = document.getElementById('content' + nro);
    
    console.log(el.getAttribute("id"));
    getJSON(myurl,function(response){
        let score = 0;
        console.log(response);
        let intelligence = parseInt((response.powerstats.intelligence == null ? 10:response.powerstats.intelligence));
        console.log(intelligence);
        let strength = parseInt(response.powerstats.strength == null ? 10:response.powerstats.strength);
        console.log(strength);
        let speed = parseInt(response.powerstats.speed == null ? 10:response.powerstats.speed);
        console.log(speed);
        let durability = parseInt(response.powerstats.durability == null ? 10:response.powerstats.durability);
        console.log(durability);
        let power = parseInt(response.powerstats.power == null ? 10:response.powerstats.power);
        console.log(power);
        let combat = parseInt(response.powerstats.combat == null ? 10:response.powerstats.combat);
        console.log(combat);
        
        if(isNaN(intelligence))
            intelligence = 10;
         if(isNaN(strength))
            strength = 10;
         if(isNaN(speed))
            speed = 10;
         if(isNaN(durability))
            durability = 10;
         if(isNaN(power))
            power = 10;
         if(isNaN(combat))
            combat = 10;
        
        el.innerHTML = "<article>" +
        '<h1>' + response.name + '<\h1>' +
        '<img id=\"img' + nro + '\" src=\"' + response.image.url + '\">' +
        '<p>Inteligência        <div style=\"width:' + intelligence +  '%; background-color: #18a4c7;\">&nbsp;</div></p>' +
        '<p>Força            <div style=\"width:' + strength +      '%; background-color: #f095f5;\">&nbsp;</div></p>' +
        '<p>Rapidez               <div style=\"width:' + speed +         '%; background-color: #f5f295;\">&nbsp;</div></p>' +
        '<p>Duração          <div style=\"width:' + durability +    '%; background-color: #abcdef;\">&nbsp;</div></p>' +
        '<p>Poder               <div style=\"width:' + power +         '%; background-color: #e84f4f;\">&nbsp;</div></p>' +
        '<p>Combate             <div style=\"width:' + combat +        '%; background-color: #63f2a6;\">&nbsp;</div></p>' +
        "</article>";
        score = ((intelligence + strength + speed + durability + power + combat));
        console.log("score: " + score);
        if(nro == 1)
            hero1 = score;
        else
            hero2 = score;
    });
}