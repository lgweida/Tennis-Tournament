let rankPattern = /(\d+)\.\s+(\w+.*)\s\W\s(\w+.*)/;
let applicantPattern = /(\w.*), (\w.*)\t+(\w.*)\t+(\d+.*)/;
let lastNamePattern = /(\w.*) (\w.*)( \w.*)?/;
const button = document.querySelector('button');
const popup = document.querySelector('.popup-wrapper');
const close = document.querySelector('.popup-close');


const applicantRank = document.querySelector('.popup-content');
function parseRank(id){
    txtInput = document.getElementById(id);
    players = txtInput.value.split('\n')
                    .filter(line => rankPattern.test(line))
                    .map(line => line.match(rankPattern))
                    .map(aRow => {
                        let key = aRow[2].match(lastNamePattern)[2];
                        return {'key': `${key}@${aRow[3]}`, 'name': `${aRow[2]}@${aRow[3]}`, 'rank' : parseInt(aRow[1])}
                    });
    console.log(players);
    return(players);
}

function parseApplicant(id){
    txtInput = document.getElementById(id);
    players = txtInput.value.split('\n')
                    .filter(line => applicantPattern.test(line))
                    .map(line => line.match(applicantPattern))
                    .map(aRow => ({'key': `${aRow[1]}@${aRow[3]}`, 'name':`${aRow[2]} ${aRow[1]}@${aRow[3]}`}));
    console.log(players);
    return(players);
}

function getPlayersByRank(rank_id, app_id){
    rnkPlayers = parseRank(rank_id);
    rnkHash = {};
    rnkPlayers.forEach(elm => rnkHash[elm.key] = elm.rank); 
    appPlayers = parseApplicant(app_id);

    appArr = appPlayers.map(player => ({'name': player.name, 'rank': rnkHash[player.key] ? rnkHash[player.key] : 99999}));
    appArr.sort((a,b) => a['rank'] - b['rank'])
    playerTable = '<table id="players">  <tr>    <th>Idx</th>    <th>Player</th> <th> City </th>    <th>Rank</th>  </tr> ';
    appArr.forEach((elm, idx)  => {
        [name, state] = elm['name'].split('@');
        playerTable += ` <tr> <td> ${idx+1} </td> <td> ${name}</td> <td> ${state} </td> <td> ${elm['rank']} </td> </tr>`;
    })
    playerTable += "</table>";
    applicantRank.innerHTML = playerTable;
    console.log(playerTable);
    //applicantRank.textContent= `${ appArr }`
    popup.style.display = 'block';
}

button.addEventListener('click', () => {
    popup.style.display = 'block';
});
  
close.addEventListener('click', () => {
    popup.style.display = 'none';
});

popup.addEventListener('click', (e) => {
    if(e.target.className === 'popup-wrapper'){
      popup.style.display = 'none';
    }
});

