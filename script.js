jQuery(function () {
    let widthPlay = $('.playing-field').innerWidth();
    let heightPlay = $('.playing-field').innerHeight();
    let count = 0;
    let timer = 60;
    let timeout;
    let flag = false;

//start and stop the game

    $('.start').on('click', (e) => {
        if ($('.start').val() === "Start") {
            if (!flag) {
                flag = true;
                startGame();
                timeGame();
            } else timeGame();
            $('.start').val("Stop")
        } else {
            $('.start').val("Start")
            clearTimeout(timeout);
        }
    });

//reset  result, start a new game

    $('.newGame').on('click', (event) => {
        event.preventDefault();
        flag=false;
        clearTimeout(timeout);
        $('.start').val("Start")
        $('.newCube').addClass('d-none');
        timer = 60;
        count = 0;
        $('.points').text(count);

    });
// randomly generate the color of the cube

    function colorCube() {
        let random = Math.floor(Math.random() * 10 / 3);
        console.log(random)

        if (random === 0) {
            return '#00288b'
        }
        if (random === 1) {
            return '#1d8b18'
        }
        if (random === 2) {
            return '#8b2339'
        }
    }
    // game launch function, add cubes to the playing field
    function startGame() {
        for (let i = 0; i < 11; i++) {
            let newCube = $(" <div class=\"newCube\"></div>")
            newCube.css({
                top: Math.floor(Math.random() * (heightPlay - 50)),
                left: Math.floor(Math.random() * (widthPlay - 50)),
                backgroundColor: colorCube(),
            })
            $('.playing-field').append(newCube)
        }
    }
    //  add a random number of cubes
    function addCube() {
        for (let i = 0; i < Math.floor(Math.random() * 10 / 3); i++) {
            let newCube = $(" <div class=\"newCube\"></div>")
            newCube.css({
                top: Math.floor(Math.random() * (heightPlay - 50)),
                left: Math.floor(Math.random() * (widthPlay - 50)),
                backgroundColor: colorCube(),
            })
            $('.playing-field').append(newCube)
        }
    }
    // after clicking, run the addCube function
    $(document).on('click', '.newCube', (event) => {
        if (($('.start').val() === "Stop")) {
            count++;
            $(event.target).addClass('d-none');
            $('.points').text(count);
            addCube();
        } else return;

    });
    // time tracking function
    function timeGame() {
        $('.timeTeg').text(timer);
        timer--;
        if (timer === 0) {
            $('.result').text(timer);
            $('.btn-primary').click();
            return clearTimeout(timeout);
        }
        timeout = setTimeout(timeGame, 1000);
    }

    //add the result to the table
    $('.btn-result').on('click', () => {

        let name = $('.name-value').val();

        $('.table-result').append(`<li class="list-group-item d-flex justify-content-between align-items-center">${name}
                            <span class="badge badge-primary badge-pill">${count}</span>
                        </li>`)
    })

});

























