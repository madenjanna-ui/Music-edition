// MaDenMusic — album edition
const $ = id => document.getElementById(id);
const newSongs=$('newSongs'), songList=$('songList'), albumGrid=$('albumGrid'), albumGridFull=$('albumGridFull'), albumSongList=$('albumSongList');
const search=$('search'), homePage=$('homePage'), catalogPage=$('catalogPage'), albumsPage=$('albumsPage'), albumPage=$('albumPage');
const showAllSongs=$('showAllSongs'), backHome=$('backHome'), backHomeFromAlbums=$('backHomeFromAlbums'), backAlbums=$('backAlbums'), playAlbum=$('playAlbum');
const sortSongs=$('sortSongs'), catalogCount=$('catalogCount'), catalogLabel=$('catalogLabel');
const songsTab=$('songsTab'), albumsTab=$('albumsTab'), favoritesTab=$('favoritesTab');
const player=$('player'), audio=$('audio'), cover=$('cover'), playerBg=$('playerBg') || document.querySelector('.player-bg');
const songTitle=$('songTitle'), songArtist=$('songArtist'), lyrics=$('lyrics'), playBtn=$('play'), playIcon=$('playIcon'), prevBtn=$('prev'), nextBtn=$('next'), closePlayer=$('closePlayer'), favoritePlayer=$('favoritePlayer'), shuffleBtn=$('shuffle'), repeatBtn=$('repeat'), repeatBadge=$('repeatBadge'), progress=$('progress'), currentTime=$('currentTime'), duration=$('duration'), toast=$('toast');
const miniPlayer=$('miniPlayer'), miniCover=$('miniCover'), miniTitle=$('miniTitle'), miniArtist=$('miniArtist'), miniPlay=$('miniPlay'), miniOpen=$('miniOpen');
let currentSong=0, playing=false, favoritesOnly=false, currentAlbum=null, toastTimer=null, playHistory=[];
const FAVORITES_KEY='madenmusic_favorites';
let shuffleMode=localStorage.getItem('madenmusic_shuffle')==='true';
let repeatMode=localStorage.getItem('madenmusic_repeat')||'off';

function favs(){try{return JSON.parse(localStorage.getItem(FAVORITES_KEY))||[]}catch{return []}}
function saveFavs(v){localStorage.setItem(FAVORITES_KEY,JSON.stringify(v))}
function isFavorite(id){return favs().includes(id)}
function toastMsg(m){toast.textContent=m;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),1800)}
function heartSVG(){return `<svg viewBox="0 0 24 24"><path d="M20.8 8.6c0 5-8.8 10-8.8 10s-8.8-5-8.8-10A4.6 4.6 0 0 1 12 5.7a4.6 4.6 0 0 1 8.8 2.9Z"/></svg>`}
function playSVG(){return `<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>`}
function albumSongs(album){return songs.filter(s=>s.album===album)}
function albumCover(album){return albumMeta[album]?.cover || 'covers/album_moya.jpg'}

async function audioAvailable(song){
    if(!song?.audio) return false;
    if(song._available!==undefined) return song._available;
    try{const r=await fetch(encodeURI(song.audio),{method:'HEAD',cache:'no-store'});song._available=r.ok}catch{song._available=false}
    return song._available;
}
function refreshAvailability(){songs.forEach(s=>{s._available=undefined});}

function toggleFavorite(id){let f=favs();const i=f.indexOf(id);if(i<0){f.push(id);toastMsg('♥ Добавлено в любимые')}else{f.splice(i,1);toastMsg('♡ Убрано из любимых')}saveFavs(f);updatePlayerFavorite();renderHome();renderCatalog();if(currentAlbum)renderAlbum(currentAlbum)}

function statusBadge(song){return `<span class="availability" data-audio-status="${song.id}">Проверяем…</span>`}
function createSongCard(song,index,showAvailability=false){
 const card=document.createElement('div');card.className='song';
 const active=isFavorite(song.id);const date=song.release?new Date(song.release+'T00:00:00').toLocaleDateString('ru-RU',{day:'numeric',month:'long'}):'';const current=songs[currentSong]?.id===song.id&&!audio.paused;
 card.innerHTML=`<img src="${song.cover}" alt="Обложка: ${song.title}" loading="lazy"><div class="info"><h2>${song.title}</h2><p>${song.artist||'MaDen'}</p>${date?`<div class="songDate">${date}</div>`:''}${showAvailability?statusBadge(song):''}</div><button class="heartButton ${active?'active':''}" type="button" aria-label="Любимая песня">${heartSVG()}</button><div class="playIcon" aria-hidden="true">${current?'▮▮':playSVG()}</div>`;
 card.addEventListener('click',async()=>{const ok=await audioAvailable(song);if(!ok){toastMsg('🎵 Скоро будет');return}const wasPlaying=!audio.paused&&!audio.ended;openSong(index,wasPlaying)});
 card.querySelector('.heartButton').addEventListener('click',e=>{e.stopPropagation();toggleFavorite(song.id)});
 if(showAvailability){audioAvailable(song).then(ok=>{const b=card.querySelector(`[data-audio-status="${song.id}"]`);if(b){b.textContent=ok?'Доступно':'Скоро будет';b.classList.toggle('ready',ok)}})}
 return card;
}
function renderSongs(list,container,showAvailability=false){container.innerHTML='';if(!list.length){container.innerHTML='<div class="emptyState">Пока здесь ничего нет</div>';return}list.forEach(song=>container.appendChild(createSongCard(song,songs.findIndex(x=>x.id===song.id),showAvailability)))}
async function playableOnly(list){const results=await Promise.all(list.map(async s=>[s,await audioAvailable(s)]));return results.filter(([,ok])=>ok).map(([s])=>s)}
function getNewSongs(){const now=new Date();return songs.filter(s=>s.release&&((now-new Date(s.release+'T00:00:00'))/86400000)>=-1&&((now-new Date(s.release+'T00:00:00'))/86400000)<=14).sort((a,b)=>new Date(b.release)-new Date(a.release))}
async function renderHome(){const list=await playableOnly(getNewSongs());renderSongs(list,newSongs,false);renderAlbumGrid(albumGrid)}
function getCatalogSongs(){let list=[...songs];if(favoritesOnly)list=list.filter(s=>isFavorite(s.id));const q=search.value.trim().toLowerCase();if(q)list=list.filter(s=>s.title.toLowerCase().includes(q)||(s.artist||'MaDen').toLowerCase().includes(q)||(s.album||'').toLowerCase().includes(q));switch(sortSongs.value){case'old':list.sort((a,b)=>new Date(a.release||0)-new Date(b.release||0));break;case'name':list.sort((a,b)=>a.title.localeCompare(b.title,'ru'));break;default:list.sort((a,b)=>new Date(b.release||0)-new Date(a.release||0))}return list}
async function renderCatalog(){const list=await playableOnly(getCatalogSongs());renderSongs(list,songList,false);catalogCount.textContent=`${list.length} ${list.length===1?'песня':'песен'}`;catalogLabel.textContent=favoritesOnly?'Любимые песни':'Все песни'}

function albumCard(album){const meta=albumMeta[album]||{};const count=albumSongs(album).length;const el=document.createElement('button');el.className='album-card';el.type='button';el.innerHTML=`<div class="album-art"><img src="${meta.cover}" alt="${album}"><span class="album-count">${count}</span></div><div class="album-name">${album}</div><div class="album-sub">${meta.subtitle||''}</div>`;el.addEventListener('click',()=>openAlbum(album));return el}
function renderAlbumGrid(container){container.innerHTML='';albumOrder.forEach(a=>container.appendChild(albumCard(a)))}
function openAlbum(album){currentAlbum=album;homePage.classList.add('hiddenPage');albumsPage.classList.add('hiddenPage');catalogPage.classList.add('hiddenPage');albumPage.classList.remove('hiddenPage');songsTab.classList.remove('active');albumsTab.classList.add('active');favoritesTab.classList.remove('active');search.value='';renderAlbum(album)}
function renderAlbum(album){const meta=albumMeta[album]||{};const list=albumSongs(album);$('albumHero').innerHTML=`<div class="album-hero-art"><img src="${meta.cover}" alt="${album}"></div><div class="album-hero-info"><span>ALBUM • MaDen</span><h2>${album}</h2><p>${meta.subtitle||''} • ${list.length} треков</p></div>`;renderSongs(list,albumSongList,true)}
function openAlbums(){homePage.classList.add('hiddenPage');catalogPage.classList.add('hiddenPage');albumPage.classList.add('hiddenPage');albumsPage.classList.remove('hiddenPage');songsTab.classList.remove('active');albumsTab.classList.add('active');favoritesTab.classList.remove('active');renderAlbumGrid(albumGridFull)}
function showHome(){homePage.classList.remove('hiddenPage');catalogPage.classList.add('hiddenPage');albumsPage.classList.add('hiddenPage');albumPage.classList.add('hiddenPage');currentAlbum=null;songsTab.classList.add('active');albumsTab.classList.remove('active');favoritesTab.classList.remove('active');favoritesOnly=false;search.value='';renderHome()}
showAllSongs.onclick=()=>{homePage.classList.add('hiddenPage');catalogPage.classList.remove('hiddenPage');albumsPage.classList.add('hiddenPage');albumPage.classList.add('hiddenPage');songsTab.classList.add('active');albumsTab.classList.remove('active');favoritesOnly=false;renderCatalog()};
backHome.onclick=showHome;backHomeFromAlbums.onclick=showHome;backAlbums.onclick=openAlbums;albumsTab.onclick=openAlbums;songsTab.onclick=showHome;favoritesTab.onclick=()=>{favoritesOnly=true;homePage.classList.add('hiddenPage');albumsPage.classList.add('hiddenPage');albumPage.classList.add('hiddenPage');catalogPage.classList.remove('hiddenPage');songsTab.classList.remove('active');albumsTab.classList.remove('active');favoritesTab.classList.add('active');renderCatalog()};
search.oninput=()=>{if(!catalogPage.classList.contains('hiddenPage'))renderCatalog();else{catalogPage.classList.remove('hiddenPage');homePage.classList.add('hiddenPage');albumsPage.classList.add('hiddenPage');albumPage.classList.add('hiddenPage');renderCatalog()}};sortSongs.onchange=renderCatalog;

function updatePlayerFavorite(){const s=songs[currentSong];if(!s)return;const a=isFavorite(s.id);favoritePlayer.textContent=a?'♥':'♡';favoritePlayer.classList.toggle('active',a)}
function updatePlayerBackground(s){playerBg.style.backgroundImage=`url("${s.cover}")`}
function setCoverPlaying(v){cover.classList.toggle('playing',v)}
function setPlayIcon(v){playIcon.innerHTML=v?'<path d="M7 5h3v14H7zM14 5h3v14h-3z"/>':'<path d="M8 5v14l11-7z"/>';playBtn.setAttribute('aria-label',v?'Пауза':'Воспроизвести')}

// =========================
// iPhone / CarPlay / системные медиаконтролы
// =========================
function updateMediaSession(s){
 if(!('mediaSession' in navigator) || !s) return;
 try{
  const artwork = s.cover ? [{
   src: new URL(s.cover, document.baseURI).href,
   sizes: '512x512',
   type: s.cover.toLowerCase().endsWith('.jpg') || s.cover.toLowerCase().endsWith('.jpeg') ? 'image/jpeg' : 'image/png'
  }] : [];
  navigator.mediaSession.metadata = new MediaMetadata({
   title: s.title || 'MaDen',
   artist: s.artist || 'MaDen',
   album: s.album || 'MaDenMusic',
   artwork
  });
  navigator.mediaSession.playbackState = audio.paused ? 'paused' : 'playing';
 }catch(e){console.warn('Media Session metadata:',e)}
}
function updateMediaPosition(){
 if(!('mediaSession' in navigator) || !Number.isFinite(audio.duration) || audio.duration <= 0) return;
 try{
  navigator.mediaSession.setPositionState({
   duration: audio.duration,
   playbackRate: audio.playbackRate || 1,
   position: Math.min(Math.max(audio.currentTime,0),audio.duration)
  });
 }catch(e){}
}
function setupMediaSession(){
 if(!('mediaSession' in navigator)) return;
 const handlers={
  play:()=>{const p=audio.play();if(p)p.catch(()=>{})},
  pause:()=>audio.pause(),
  nexttrack:async()=>{const was=!audio.paused&&!audio.ended;openSong(await getNextIndex(),was)},
  previoustrack:async()=>{const was=!audio.paused&&!audio.ended;openSong(await getPrevIndex(),was)},
  seekbackward:(details)=>{audio.currentTime=Math.max(0,audio.currentTime-(details.seekOffset||10));updateMediaPosition()},
  seekforward:(details)=>{audio.currentTime=Math.min(audio.duration||0,audio.currentTime+(details.seekOffset||10));updateMediaPosition()},
  seekto:(details)=>{if(Number.isFinite(details.seekTime)){audio.currentTime=Math.min(Math.max(details.seekTime,0),audio.duration||details.seekTime);updateMediaPosition()}}
 };
 Object.entries(handlers).forEach(([action,handler])=>{
  try{navigator.mediaSession.setActionHandler(action,handler)}catch(e){console.debug(`Media Session action ${action} unavailable`,e)}
 });
}
setupMediaSession();
function updateMini(){const s=songs[currentSong];if(!s){miniPlayer.classList.add('hidden-mini');return}miniCover.src=s.cover;miniTitle.textContent=s.title;miniArtist.textContent=s.artist||'MaDen';miniPlay.textContent=audio.paused?'▶':'Ⅱ';miniPlayer.classList.remove('hidden-mini')}
async function openSong(index,autoPlay=false){const s=songs[index];if(!s)return;if(!(await audioAvailable(s))){toastMsg('🎵 Скоро будет');return}currentSong=index;cover.src=s.cover;songTitle.textContent=s.title;songArtist.textContent=s.artist||'MaDen';lyrics.textContent=s.lyrics||'';updatePlayerBackground(s);updatePlayerFavorite();updateMediaSession(s);audio.pause();audio.src=encodeURI(s.audio);audio.load();progress.value=0;currentTime.textContent='0:00';duration.textContent='0:00';setPlayIcon(false);setCoverPlaying(false);player.classList.remove('hidden');updateMini();if(autoPlay){const p=audio.play();if(p)p.catch(()=>toastMsg('Не удалось воспроизвести файл'))}}
playBtn.onclick=()=>{if(!audio.src)return;const p=audio.paused?audio.play():audio.pause();if(p)p.catch(()=>{})};
nextBtn.onclick=async()=>{const was=!audio.paused&&!audio.ended;openSong(await getNextIndex(),was)};prevBtn.onclick=async()=>{const was=!audio.paused&&!audio.ended;openSong(await getPrevIndex(),was)};closePlayer.onclick=()=>{player.classList.add('hidden');updateMini()};miniOpen.onclick=()=>player.classList.remove('hidden');miniPlay.onclick=()=>{if(audio.paused){const p=audio.play();if(p)p.catch(()=>{})}else audio.pause()};favoritePlayer.onclick=()=>{if(songs[currentSong])toggleFavorite(songs[currentSong].id)};
async function playableIndices(){const results=await Promise.all(songs.map(async (s,i)=>[i,await audioAvailable(s)]));return results.filter(([,ok])=>ok).map(([i])=>i)}
async function getNextIndex(){if(repeatMode==='one')return currentSong;const playable=await playableIndices();if(!playable.length)return currentSong;if(shuffleMode){let pool=playable.filter(i=>i!==currentSong&&!playHistory.includes(i));if(!pool.length)pool=playable.filter(i=>i!==currentSong);if(!pool.length)return currentSong;const n=pool[Math.floor(Math.random()*pool.length)];playHistory.push(n);if(playHistory.length>=playable.length)playHistory=[n];return n}const pos=playable.indexOf(currentSong);return playable[(pos<0?0:pos+1)%playable.length]}
async function getPrevIndex(){const playable=await playableIndices();if(!playable.length)return currentSong;if(shuffleMode&&playHistory.length>1){playHistory.pop();return playHistory[playHistory.length-1]??currentSong}const pos=playable.indexOf(currentSong);return playable[(pos<=0?playable.length-1:pos-1)]}
shuffleBtn.onclick=()=>{shuffleMode=!shuffleMode;playHistory=[currentSong];localStorage.setItem('madenmusic_shuffle',shuffleMode);shuffleBtn.classList.toggle('active',shuffleMode);toastMsg(shuffleMode?'🔀 Случайное воспроизведение':'Обычный порядок')};
repeatBtn.onclick=()=>{repeatMode=repeatMode==='off'?'all':repeatMode==='all'?'one':'off';localStorage.setItem('madenmusic_repeat',repeatMode);updateRepeat()};
function updateRepeat(){repeatBtn.classList.toggle('active',repeatMode!=='off');repeatBadge.textContent=repeatMode==='one'?'1':''}
audio.onended=async()=>openSong(await getNextIndex(),true);audio.onplay=()=>{playing=true;setPlayIcon(true);setCoverPlaying(true);updateMini();if('mediaSession' in navigator){navigator.mediaSession.playbackState='playing';updateMediaSession(songs[currentSong])}};audio.onpause=()=>{playing=false;setPlayIcon(false);setCoverPlaying(false);updateMini();if('mediaSession' in navigator)navigator.mediaSession.playbackState='paused'};audio.onloadedmetadata=()=>{progress.max=Math.floor(audio.duration)||0;duration.textContent=formatTime(audio.duration);updateMediaPosition()};audio.ontimeupdate=()=>{progress.value=Math.floor(audio.currentTime)||0;currentTime.textContent=formatTime(audio.currentTime);updateMediaPosition()};progress.oninput=()=>audio.currentTime=Number(progress.value);function formatTime(sec){if(!Number.isFinite(sec))return'0:00';const m=Math.floor(sec/60),s=Math.floor(sec%60);return `${m}:${String(s).padStart(2,'0')}`}
playAlbum.onclick=async()=>{const list=await playableOnly(albumSongs(currentAlbum));const first=list[0];if(first)openSong(songs.findIndex(s=>s.id===first.id),true);else toastMsg('🎵 В альбоме пока нет загруженных песен')};
shuffleBtn.classList.toggle('active',shuffleMode);updateRepeat();renderHome();renderAlbumGrid(albumGridFull);player.classList.add('hidden');miniPlayer.classList.add('hidden-mini');
