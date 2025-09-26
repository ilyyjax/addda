// data generator
const COLORS = ["color-0","color-1","color-2","color-3","color-4","color-5"];
const TRAITS = ["Sus", "Brained", "Silent Type", "Speedy", "Chonk", "Legendary", "Shy", "Loud", "Tactician", "Greedy", "Friendly","Stealthy"];

function randomName(){
  const syll = ["Zee","Ka","Lo","Mux","Pin","Tra","Nu","Rok","Bop","Jex","Luma","Vex","Zig","Pol"];
  return syll[Math.floor(Math.random()*syll.length)] + syll[Math.floor(Math.random()*syll.length)] + Math.floor(Math.random()*99);
}

function randomTraits(count=2){
  const out = new Set();
  while(out.size < count) out.add(TRAITS[Math.floor(Math.random()*TRAITS.length)]);
  return [...out];
}

// create crewmate card element
function makeCard(i){
  const card = document.createElement('div'); card.className = 'card';
  const wrap = document.createElement('div'); wrap.className = 'crewmate-wrap';
  const cre = document.createElement('div'); cre.className = 'crewmate ' + COLORS[Math.floor(Math.random()*COLORS.length)];
  // small subtle tilt
  cre.style.transform = `translateY(6px) rotate(${(Math.random()*6-3).toFixed(2)}deg)`;
  wrap.appendChild(cre);

  const info = document.createElement('div'); info.className = 'card-info';
  const name = document.createElement('h4'); name.className = 'name'; name.textContent = randomName();
  const mut = document.createElement('p'); mut.className = 'muted'; mut.textContent = 'ID #' + (1000+i);
  info.appendChild(name); info.appendChild(mut);

  // traits
  const traitWrap = document.createElement('div');
  const traits = randomTraits(2 + (Math.random()>0.8?1:0));
  traits.forEach(t=>{
    const p = document.createElement('span'); p.className='pill'; p.textContent = t;
    traitWrap.appendChild(p);
  });
  info.appendChild(traitWrap);

  card.appendChild(wrap); card.appendChild(info);

  // click shows modal
  card.addEventListener('click', ()=>openModal({name: name.textContent, traits, colorClass: cre.className}));

  return card;
}

// fill grid
const grid = document.getElementById('grid');
function fillGrid(n=24){
  grid.innerHTML = '';
  for(let i=0;i<n;i++){
    grid.appendChild(makeCard(i));
  }
}

// modal logic
const modal = document.getElementById('modal');
const closeBtn = document.getElementById('closeModal');
const mName = document.getElementById('mName');
const mDesc = document.getElementById('mDesc');
const mTraits = document.getElementById('mTraits');
const modalArt = document.getElementById('modalArt');
const profileLink = document.getElementById('profileLink');

function openModal({name, traits, colorClass}){
  modal.classList.remove('hidden');
  modal.setAttribute('aria-hidden','false');
  mName.textContent = name;
  mDesc.textContent = `A wild crewmate with vibes. Swipe left to vote them out? Or maybe invite them to the reactor.`;
  mTraits.innerHTML = '';
  traits.forEach(t=>{
    const s = document.createElement('span'); s.className='pill'; s.textContent = t; mTraits.appendChild(s);
  });
  // render a big crewmate copy in modal
  modalArt.innerHTML = '';
  const big = document.createElement('div'); big.className = 'crewmate';
  // copy color class if present
  if(colorClass) big.className += ' ' + colorClass.split(' ').slice(-1)[0];
  big.style.width = '200px'; big.style.height = '140px'; big.style.transform = 'translateY(12px)';
  modalArt.appendChild(big);
  profileLink.href = '#';
}

function closeModal(){
  modal.classList.add('hidden');
  modal.setAttribute('aria-hidden','true');
}

closeBtn.addEventListener('click', closeModal);
modal.addEventListener('click', (e)=>{ if(e.target===modal) closeModal(); });

document.getElementById('randomize').addEventListener('click', ()=>fillGrid(24));
document.getElementById('search').addEventListener('input', (e)=>{
  const q = e.target.value.toLowerCase();
  document.querySelectorAll('.card').forEach(c=>{
    const name = c.querySelector('.name').textContent.toLowerCase();
    c.style.display = name.includes(q) ? '' : 'none';
  });
});

// initial render
fillGrid(28);
