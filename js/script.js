const btn_first_player = document.querySelector('#btn_first_player');
const span_first_player = document.querySelector('#first_player_name');

const btn_start = document.querySelector('#btn_start');
const start_view = document.querySelector('#container_start');

btn_first_player.addEventListener('click', (e) => {
   let player_name = document.querySelector('#input_name').value;
    
    let draw_num = Math.round(Math.random());
    
    if(player_name === '') {
        player_name = 'Tajemniczy Gość';
    } 
    
    if(draw_num === 0) {
        span_first_player.innerHTML = player_name;
    } else {
        span_first_player.innerHTML = 'komputer';
    }  
    
});

btn_start.addEventListener('click', (e) => {
    //alert('test');
    
    start_view.setAttribute( 'class', 'invisible' );
});