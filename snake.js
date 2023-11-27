let walking,rolling,rollCount,rollMax,canvas=document.querySelector("canvas"),wrapper=document.querySelector(".wrapper"),resetGameBtn=document.querySelector("#reset"),diceDisplay=document.querySelector("#diceThrow"),playerDisplay=document.querySelector(".playerName"),message=document.querySelector(".message"),ctx=canvas.getContext("2d"),height=500,width=500,gridSize=50,gridMid=25,walkSpeed=450,locked=!1,slideSpeed=.5,rolled="",rollSpeed=85,player1={current:0,target:0,x:0,y:0,colour:"#f36d",id:"Tú turno"},player2={current:0,target:0,x:0,y:0,colour:"#8a2d",id:"Bot"},activePlayer=player1;const obstacles=[{type:"snake",start:97,end:78},{type:"snake",start:95,end:56},{type:"snake",start:88,end:24},{type:"snake",start:62,end:18},{type:"snake",start:48,end:26},{type:"snake",start:36,end:6},{type:"snake",start:32,end:10},{start:1,end:38},{start:4,end:14},{start:8,end:30},{start:21,end:42},{start:28,end:76},{start:50,end:67},{start:71,end:92},{start:80,end:99}];canvas.width=width,canvas.height=height,wrapper.style.width=`${width}px`,ctx.strokeStyle="#555",ctx.lineWidth=2;const setLocked=e=>{locked=e},boustrophedonWalk=(e,t)=>{let a=[];for(let r=0;r<t;r++){let t=Array.apply(null,Array(e)).map(((t,a)=>({id:a+r*e,y:height-gridSize-r*gridSize,x:a*gridSize})));t=r%2?t.reverse():t,a=[...a,...t]}return a},drawPlayers=()=>{ctx.clearRect(0,0,width,height),player1.current>0&&(ctx.fillStyle=player1.colour,ctx.beginPath(),ctx.arc(player1.x+gridMid,player1.y+gridMid,16,0,2*Math.PI),ctx.fill(),ctx.stroke()),player2.current>0&&(ctx.fillStyle=player2.colour,ctx.beginPath(),player2.current===player1.current?ctx.arc(player2.x+gridMid,player2.y+gridMid,16,45,Math.PI+45):ctx.arc(player2.x+gridMid,player2.y+gridMid,16,0,2*Math.PI),ctx.fill(),ctx.stroke())},walk=()=>{let e=activePlayer.current++,t=!1;if(activePlayer.x=walkSequence[e].x,activePlayer.y=walkSequence[e].y,drawPlayers(),99===e)return clearInterval(walking),void showWinner();if(activePlayer.current>=activePlayer.target){clearInterval(walking);for(let e=0;e<obstacles.length;e++)if(obstacles[e].start===activePlayer.target){let a=obstacles[e].end;activePlayer.target=obstacles[e].end,t=!0,slide(activePlayer,walkSequence[a-1].x,walkSequence[a-1].y,slideSpeed);break}t||(resetTurn(),togglePlayer())}},showWinner=()=>{setPlayerID("Es el ganador!"),resetGameBtn.classList.remove("hidden")},setPlayerID=(e="")=>{playerDisplay.innerHTML=`${activePlayer.id} ${e}`,message.innerHTML="Click en el dado",document.body.classList=`player${activePlayer.id}`},resetTurn=()=>{setLocked(!1)},slide=(e,t,a,r=1)=>{gsap.to(e,{x:t,y:a,duration:r,delay:.25,onUpdate:doOnUpdate,onComplete:doOnComplete})},doOnUpdate=()=>{drawPlayers()},doOnComplete=()=>{activePlayer.current=activePlayer.target,drawPlayers(),resetTurn(),togglePlayer()},togglePlayer=()=>{activePlayer=activePlayer.id===player1.id?player2:player1,setPlayerID(),activePlayer===player2&&rollDice()},rollDice=e=>{e&&e.preventDefault(),locked||(setLocked(!0),message.innerHTML=activePlayer===player1?"Lanzando...":"Auto bot lanzando...",rollCount=0,rollMax=10*Math.random()+15,rolling=setInterval(doRoll,rollSpeed))},doRoll=()=>{rolled=Math.floor(6*Math.random()+1),diceRollDisplay(rolled),rollCount++>=rollMax&&(clearInterval(rolling),message.innerHTML="Moviendo...",activePlayer.target+=rolled,walking=setInterval(walk,walkSpeed))},diceRollDisplay=e=>{diceDisplay.classList=`s${e}`},resetGame=()=>{player1.current=0,player1.target=0,player1.x=0,player1.y=0,player2.current=0,player2.target=0,player2.x=0,player2.y=0,activePlayer=player1,locked=!1,diceRollDisplay(""),setPlayerID(),drawPlayers(),resetGameBtn.classList.add("hidden")};diceDisplay.addEventListener("click",rollDice),resetGameBtn.addEventListener("click",resetGame);let walkSequence=boustrophedonWalk(10,10);setPlayerID();const drawObstacles=()=>{ctx.clearRect(0,0,width,height);for(let e=0;e<obstacles.length;e++){let t=obstacles[e];ctx.strokeStyle="snake"===t.type?"#d00":"#0d0",ctx.beginPath(),ctx.moveTo(walkSequence[t.start-1].x+.5*gridSize,walkSequence[t.start-1].y+.5*gridSize),ctx.lineTo(walkSequence[t.end-1].x+.5*gridSize,walkSequence[t.end-1].y+.5*gridSize),ctx.stroke(),ctx.closePath()}};