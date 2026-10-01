(function(){
const open=()=>{const m=document.getElementById('missionModal');if(!m)return;m.classList.add('open');m.setAttribute('aria-hidden','false');document.body.classList.add('modal-open');};
document.addEventListener('click',e=>{if(e.target.closest('#openMission')||e.target.closest('#openMissionHero'))open();});
})();