(self.webpackChunkpsy_minigames=self.webpackChunkpsy_minigames||[]).push([[378],{439:(e,a,s)=>{const t=s(233);e.exports=class{#e;#a;#s;#t;#r;constructor(e="Pepito Pérez",a="Kid",s="F"){const t=`${e}-${(new Date).toJSON()}`;this.#e=e,this.#a=a,this.#s=s,this.#r=t,localStorage.setItem("user",JSON.stringify({name:this.#e,age:this.#a,genre:this.#s,avatar:this.#t}))}greet(){console.log(`Hello, my name is ${this.#e}.`)}getSession(){return JSON.parse(localStorage.getItem("user"))}updateSession(e){const a=this.getSession();this.removeSession(),localStorage.setItem("user",JSON.stringify({...a,...e}))}removeSession(){localStorage.removeItem("user")}clearSession(){localStorage.clear()}saveAvatar(e){const a=e;this.avatar=a,this.updateSession({avatar:a})}async createAvatar(){console.log("Saving avatar on memory...");var e=document.querySelector("#avatar svg"),a=(new XMLSerializer).serializeToString(e);const s=new Blob([a],{type:"image/svg+xml"}),r=await t(s);this.saveAvatar(r)}}},233:e=>{e.exports=e=>new Promise((a=>{const s=new FileReader;s.onloadend=()=>a(s.result),s.readAsDataURL(e)}))}},e=>{e(e.s=439)}]);