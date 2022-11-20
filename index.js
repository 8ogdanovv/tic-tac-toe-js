document.addEventListener('DOMContentLoaded', main);

function main() {
    if (localStorage.getItem('focused')) {
        localStorage.removeItem('focused');
    }

    document.getElementById('reset').addEventListener('click', reset);
    document.body.addEventListener('keydown', arrows_handler);
    let container = document.getElementsByClassName('container')[0];
    container.addEventListener('click', catch_click);
    let tiles = document.getElementsByClassName('tile');
    let player = document.getElementsByClassName('display-player')[0];
    let announcer = document.getElementsByClassName('announcer')[0];

    for (let i = 0; i < 9; i++) {
        let container_coll = document.getElementsByClassName('container');
        let the_conainer = container_coll[0];
        let one_tile = document.createElement('div');
        one_tile.id = `${i+1}`;
        one_tile.classList.add('tile');
        one_tile.classList.add('able');
        the_conainer.appendChild(one_tile);
    }

    function catch_click(event) {
        let tile = event.target;
        if (!tile) {
            return;
        }
        if (!container.contains(tile)) {
            return;
        }
        if (tile.textContent !== '') {
            return;
        }
        make_move(tile);
    }

    function make_move(field) {
        let player_symbol = player.textContent;
        field.innerHTML = `${player_symbol}`;
        field.classList.add(`player${player_symbol}`);
        field.classList.remove('able');
        winner_check();
    }

    function change_turn() {
        let player_symbol = player.textContent;
        if (player_symbol === 'X') {
            player.classList.remove('playerX');
            player.classList.add('playerO');
            player.innerHTML = 'O';
        } else if (player_symbol === 'O') {
            player.classList.remove('playerO');
            player.classList.add('playerX');
            player.innerHTML = 'X';
        }
    }

    function winner_check() {
        if (
            tiles[0].textContent !== '' && tiles[1].textContent !== '' && tiles[2].textContent !== '' &&
            tiles[0].textContent === tiles[1].textContent && tiles[1].textContent === tiles[2].textContent ||
            tiles[3].textContent !== '' && tiles[4].textContent !== '' && tiles[5].textContent !== '' &&
            tiles[3].textContent === tiles[4].textContent && tiles[4].textContent === tiles[5].textContent ||
            tiles[6].textContent !== '' && tiles[7].textContent !== '' && tiles[8].textContent !== '' &&
            tiles[6].textContent === tiles[7].textContent && tiles[7].textContent === tiles[8].textContent ||
            tiles[0].textContent !== '' && tiles[3].textContent !== '' && tiles[6].textContent !== '' &&
            tiles[0].textContent === tiles[3].textContent && tiles[3].textContent === tiles[6].textContent ||
            tiles[1].textContent !== '' && tiles[4].textContent !== '' && tiles[7].textContent !== '' &&
            tiles[1].textContent === tiles[4].textContent && tiles[4].textContent === tiles[7].textContent ||
            tiles[2].textContent !== '' && tiles[5].textContent !== '' && tiles[8].textContent !== '' &&
            tiles[2].textContent === tiles[5].textContent && tiles[5].textContent === tiles[8].textContent ||
            tiles[0].textContent !== '' && tiles[4].textContent !== '' && tiles[8].textContent !== '' &&
            tiles[0].textContent === tiles[4].textContent && tiles[4].textContent === tiles[8].textContent ||
            tiles[2].textContent !== '' && tiles[4].textContent !== '' && tiles[6].textContent !== '' &&
            tiles[2].textContent === tiles[4].textContent && tiles[4].textContent === tiles[6].textContent
        ) {
            show_winner();
            change_turn();
            container.removeEventListener('click', catch_click);
            document.body.removeEventListener('keydown', arrows_handler);
        } else {
            change_turn();
            return;
        }
    }

    function show_winner() {
        announcer.classList.remove('hide');
        let win_content = document.getElementsByClassName('display')[0].innerHTML;
        let win_content_ = win_content.slice(0, -25) + ' Won' + win_content.slice(-25, -18);
        announcer.innerHTML = win_content_;
        container.removeEventListener('click', catch_click);
    }

    function reset() {
        for (let i = 0; i < tiles.length; i++) {
            tiles[i].innerHTML = '';
            tiles[i].classList.remove('playerO');
            tiles[i].classList.remove('playerX');
        }
        player.classList.remove('playerO');
        player.classList.add('playerX');
        player.innerHTML = 'X';
        announcer.classList.add('hide');
        container.addEventListener('click', catch_click);
        if (localStorage.getItem('focused')) {
            let focused_id = parseInt(localStorage.getItem('focused'), 10);
            document.getElementById(`${focused_id}`).classList.remove('focused');
            localStorage.removeItem('focused');
        }
        location.reload();
    }

    let images = document.getElementsByClassName('avatar-icon');
    for (let i = 0; i < images.length; i++) {
        images[i].draggable = 'true';
        images[i].addEventListener('dragstart', drag);
        images[i].id = `img${i+1}`;
    }
    let div_icons = document.getElementsByClassName('icons')[0];
    div_icons.id = 'div_icons';
    div_icons.addEventListener('dragover', allowDrop);
    div_icons.addEventListener('drop', drop);
    let icon_containers = document.getElementsByClassName('avatar-container');
    for (let i = 0; i < icon_containers.length; i++) {
        icon_containers[i].id = `icon_container${i+1}`;
        icon_containers[i].addEventListener('dragover', allowDrop);
        icon_containers[i].addEventListener('drop', drop);
    }

    function allowDrop(ev) {
        ev.preventDefault();
    }

    function drag(ev) {
        ev.dataTransfer.setData('text', ev.target.id);
    }

    function drop(ev) {
        ev.preventDefault();
        let data = ev.dataTransfer.getData('text');
        ev.target.appendChild(document.getElementById(data));
        if (this.innerHTML !== '') {
            this.removeEventListener('dragover', allowDrop);
            this.removeEventListener('drop', drop);
        }
    }

    function arrows_handler(event) {
        let able_tiles = document.getElementsByClassName('able');
        event.preventDefault();
        if (!localStorage.getItem('focused')) {
            get_focused();
        } else {
            let x = event.keyCode;
            if (x === 38) {
                let focused_id = parseInt(localStorage.getItem('focused'), 10);
                if (able_tiles.namedItem(`${focused_id - 3}`)) {
                    document.getElementById(`${focused_id}`).classList.remove('focused');
                    document.getElementById(`${focused_id - 3}`).classList.add('focused');
                    localStorage.removeItem('focused');
                    localStorage.setItem('focused', `${focused_id - 3}`);
                } else if (able_tiles.namedItem(`${focused_id - 6}`)) {
                    document.getElementById(`${focused_id}`).classList.remove('focused');
                    document.getElementById(`${focused_id - 6}`).classList.add('focused');
                    localStorage.removeItem('focused');
                    localStorage.setItem('focused', `${focused_id - 6}`);
                } else if (able_tiles.namedItem(`${focused_id - 5}`)) {
                    document.getElementById(`${focused_id}`).classList.remove('focused');
                    document.getElementById(`${focused_id - 5}`).classList.add('focused');
                    localStorage.removeItem('focused');
                    localStorage.setItem('focused', `${focused_id - 5}`);
                } else if (able_tiles.namedItem(`${focused_id - 7}`)) {
                    document.getElementById(`${focused_id}`).classList.remove('focused');
                    document.getElementById(`${focused_id - 7}`).classList.add('focused');
                    localStorage.removeItem('focused');
                    localStorage.setItem('focused', `${focused_id - 7}`);
                } else if (able_tiles.namedItem(`${focused_id - 2}`)) {
                    document.getElementById(`${focused_id}`).classList.remove('focused');
                    document.getElementById(`${focused_id - 2}`).classList.add('focused');
                    localStorage.removeItem('focused');
                    localStorage.setItem('focused', `${focused_id - 2}`);
                } else if (able_tiles.namedItem(`${focused_id - 4}`)) {
                    document.getElementById(`${focused_id}`).classList.remove('focused');
                    document.getElementById(`${focused_id - 4}`).classList.add('focused');
                    localStorage.removeItem('focused');
                    localStorage.setItem('focused', `${focused_id - 4}`);
                } else if (able_tiles.namedItem(`${focused_id - 1}`)) {
                    document.getElementById(`${focused_id}`).classList.remove('focused');
                    document.getElementById(`${focused_id - 1}`).classList.add('focused');
                    localStorage.removeItem('focused');
                    localStorage.setItem('focused', `${focused_id - 1}`);
                } else if (able_tiles.namedItem(`${focused_id - 8}`)) {
                    document.getElementById(`${focused_id}`).classList.remove('focused');
                    document.getElementById(`${focused_id - 8}`).classList.add('focused');
                    localStorage.removeItem('focused');
                    localStorage.setItem('focused', `${focused_id - 8}`);
                }
            } else if (x === 40) {
                let focused_id = parseInt(localStorage.getItem('focused'), 10);
                if (able_tiles.namedItem(`${focused_id + 3}`)) {
                    document.getElementById(`${focused_id}`).classList.remove('focused');
                    document.getElementById(`${focused_id + 3}`).classList.add('focused');
                    localStorage.removeItem('focused');
                    localStorage.setItem('focused', `${focused_id + 3}`);
                } else if (able_tiles.namedItem(`${focused_id + 6}`)) {
                    document.getElementById(`${focused_id}`).classList.remove('focused');
                    document.getElementById(`${focused_id + 6}`).classList.add('focused');
                    localStorage.removeItem('focused');
                    localStorage.setItem('focused', `${focused_id + 6}`);
                } else if (able_tiles.namedItem(`${focused_id + 5}`)) {
                    document.getElementById(`${focused_id}`).classList.remove('focused');
                    document.getElementById(`${focused_id + 5}`).classList.add('focused');
                    localStorage.removeItem('focused');
                    localStorage.setItem('focused', `${focused_id + 5}`);
                } else if (able_tiles.namedItem(`${focused_id + 7}`)) {
                    document.getElementById(`${focused_id}`).classList.remove('focused');
                    document.getElementById(`${focused_id + 7}`).classList.add('focused');
                    localStorage.removeItem('focused');
                    localStorage.setItem('focused', `${focused_id + 7}`);
                } else if (able_tiles.namedItem(`${focused_id + 2}`)) {
                    document.getElementById(`${focused_id}`).classList.remove('focused');
                    document.getElementById(`${focused_id + 2}`).classList.add('focused');
                    localStorage.removeItem('focused');
                    localStorage.setItem('focused', `${focused_id + 2}`);
                } else if (able_tiles.namedItem(`${focused_id + 4}`)) {
                    document.getElementById(`${focused_id}`).classList.remove('focused');
                    document.getElementById(`${focused_id + 4}`).classList.add('focused');
                    localStorage.removeItem('focused');
                    localStorage.setItem('focused', `${focused_id + 4}`);
                } else if (able_tiles.namedItem(`${focused_id + 1}`)) {
                    document.getElementById(`${focused_id}`).classList.remove('focused');
                    document.getElementById(`${focused_id + 1}`).classList.add('focused');
                    localStorage.removeItem('focused');
                    localStorage.setItem('focused', `${focused_id + 1}`);
                } else if (able_tiles.namedItem(`${focused_id + 8}`)) {
                    document.getElementById(`${focused_id}`).classList.remove('focused');
                    document.getElementById(`${focused_id + 8}`).classList.add('focused');
                    localStorage.removeItem('focused');
                    localStorage.setItem('focused', `${focused_id + 8}`);
                }
            } else if (x === 37) {
                let focused_id = parseInt(localStorage.getItem('focused'), 10);
                if (able_tiles.namedItem(`${focused_id - 1}`)) {
                    document.getElementById(`${focused_id}`).classList.remove('focused');
                    document.getElementById(`${focused_id - 1}`).classList.add('focused');
                    localStorage.removeItem('focused');
                    localStorage.setItem('focused', `${focused_id - 1}`);
                } else if (able_tiles.namedItem(`${focused_id - 2}`)) {
                    document.getElementById(`${focused_id}`).classList.remove('focused');
                    document.getElementById(`${focused_id - 2}`).classList.add('focused');
                    localStorage.removeItem('focused');
                    localStorage.setItem('focused', `${focused_id - 2}`);
                } else if (able_tiles.namedItem(`${focused_id - 3}`)) {
                    document.getElementById(`${focused_id}`).classList.remove('focused');
                    document.getElementById(`${focused_id - 3}`).classList.add('focused');
                    localStorage.removeItem('focused');
                    localStorage.setItem('focused', `${focused_id - 3}`);
                } else if (able_tiles.namedItem(`${focused_id - 4}`)) {
                    document.getElementById(`${focused_id}`).classList.remove('focused');
                    document.getElementById(`${focused_id - 4}`).classList.add('focused');
                    localStorage.removeItem('focused');
                    localStorage.setItem('focused', `${focused_id - 4}`);
                } else if (able_tiles.namedItem(`${focused_id - 5}`)) {
                    document.getElementById(`${focused_id}`).classList.remove('focused');
                    document.getElementById(`${focused_id - 5}`).classList.add('focused');
                    localStorage.removeItem('focused');
                    localStorage.setItem('focused', `${focused_id - 5}`);
                } else if (able_tiles.namedItem(`${focused_id - 6}`)) {
                    document.getElementById(`${focused_id}`).classList.remove('focused');
                    document.getElementById(`${focused_id - 6}`).classList.add('focused');
                    localStorage.removeItem('focused');
                    localStorage.setItem('focused', `${focused_id - 6}`);
                } else if (able_tiles.namedItem(`${focused_id - 7}`)) {
                    document.getElementById(`${focused_id}`).classList.remove('focused');
                    document.getElementById(`${focused_id - 7}`).classList.add('focused');
                    localStorage.removeItem('focused');
                    localStorage.setItem('focused', `${focused_id - 7}`);
                } else if (able_tiles.namedItem(`${focused_id - 8}`)) {
                    document.getElementById(`${focused_id}`).classList.remove('focused');
                    document.getElementById(`${focused_id - 8}`).classList.add('focused');
                    localStorage.removeItem('focused');
                    localStorage.setItem('focused', `${focused_id - 8}`);
                }
            } else if (x === 39) {
                let focused_id = parseInt(localStorage.getItem('focused'), 10);
                if (able_tiles.namedItem(`${focused_id + 1}`)) {
                    document.getElementById(`${focused_id}`).classList.remove('focused');
                    document.getElementById(`${focused_id + 1}`).classList.add('focused');
                    localStorage.removeItem('focused');
                    localStorage.setItem('focused', `${focused_id + 1}`);
                } else if (able_tiles.namedItem(`${focused_id + 2}`)) {
                    document.getElementById(`${focused_id}`).classList.remove('focused');
                    document.getElementById(`${focused_id + 2}`).classList.add('focused');
                    localStorage.removeItem('focused');
                    localStorage.setItem('focused', `${focused_id + 2}`);
                } else if (able_tiles.namedItem(`${focused_id + 3}`)) {
                    document.getElementById(`${focused_id}`).classList.remove('focused');
                    document.getElementById(`${focused_id + 3}`).classList.add('focused');
                    localStorage.removeItem('focused');
                    localStorage.setItem('focused', `${focused_id + 3}`);
                } else if (able_tiles.namedItem(`${focused_id + 4}`)) {
                    document.getElementById(`${focused_id}`).classList.remove('focused');
                    document.getElementById(`${focused_id + 4}`).classList.add('focused');
                    localStorage.removeItem('focused');
                    localStorage.setItem('focused', `${focused_id + 4}`);
                } else if (able_tiles.namedItem(`${focused_id + 5}`)) {
                    document.getElementById(`${focused_id}`).classList.remove('focused');
                    document.getElementById(`${focused_id + 5}`).classList.add('focused');
                    localStorage.removeItem('focused');
                    localStorage.setItem('focused', `${focused_id + 5}`);
                } else if (able_tiles.namedItem(`${focused_id + 6}`)) {
                    document.getElementById(`${focused_id}`).classList.remove('focused');
                    document.getElementById(`${focused_id + 6}`).classList.add('focused');
                    localStorage.removeItem('focused');
                    localStorage.setItem('focused', `${focused_id + 6}`);
                } else if (able_tiles.namedItem(`${focused_id + 7}`)) {
                    document.getElementById(`${focused_id}`).classList.remove('focused');
                    document.getElementById(`${focused_id + 7}`).classList.add('focused');
                    localStorage.removeItem('focused');
                    localStorage.setItem('focused', `${focused_id + 7}`);
                } else if (able_tiles.namedItem(`${focused_id + 8}`)) {
                    document.getElementById(`${focused_id}`).classList.remove('focused');
                    document.getElementById(`${focused_id + 8}`).classList.add('focused');
                    localStorage.removeItem('focused');
                    localStorage.setItem('focused', `${focused_id + 8}`);
                }
            }
            if (x === 13) {
                enter_pressed();
            }
        }
    }

    function enter_pressed() {
        let focused_id = parseInt(localStorage.getItem('focused'), 10);
        let focused_tile = document.getElementById(`${focused_id}`);
        make_move(focused_tile);
        focused_tile.classList.remove('focused');
    }

    function get_focused() {
        let able_tiles = document.getElementsByClassName('able');
        let ind = Math.ceil(able_tiles.length / 2) - 1;
        able_tiles[ind].classList.add('focused');
        let id = able_tiles[ind].id;
        localStorage.setItem('focused', id);
        return;
    }
}