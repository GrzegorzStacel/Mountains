$(document).ready(function () {
    stawiacz_punktow();
    interface();
    input_filleed();
    wyswietl_tablice_punktow();
})

function input_filleed() {
    $('.input_text input').focus(function () {
        $(this).parent().addClass('focus');
    })
    $('.input_text input').focusout(function () {
        if ($(this).val() !== "") {
            $(this).addClass('filled');
        } else {
            $(this).parent().removeClass('focus');
        }
    })
}

function stawiacz_punktow() {
    $('#gory').on('click', function (e) {
        let szer = $('#gory').width();
        let wys = $('#gory').height();

        if ($('#interface:hover').length == 0 && $('#interface.on_interface').length == 0) {
            let posX = (100 * e.pageX / szer).toFixed(2) + '%';
            let posY = (100 * e.pageY / wys).toFixed(2) + '%';
            $('#interface .posX').text(posX);
            $('#interface .posY').text(posY);
            $('#cursor').css({
                left: posX,
                top: posY
            })
        }
    })
}

function interface() {
    $('#change_pos').on('click', () => {
        $('#interface').toggleClass('switched');
    })

    $('#add_point').click(() => {
        gb.points.push({
            posX: $('#interface .posX').text(),
            posY: $('#interface .posY').text(),
            napis: $('#interface .napis').val(),
            link: $('#interface .input_link').val(),
            isNew: true
        });
        
        if ($('#JSON').css('display') == 'block') {
            $('#JSON').html(construct_JSON());
        }

        setTimeout(() => {
            $("#interface .input_text input").val("");
            $("#interface .input_text").removeClass('focus');
            $("#interface .input_text input").removeClass('filled');
        }, 1000);

        console.table(gb.points)
        wyswietlanie_punktow();
    })
}

function wyswietl_tablice_punktow() {
    let $JSON = $('#JSON');
    $('#display_JSON').click(function() {
        if ($JSON.css('display') == "block") {
            $JSON.css('display', 'none');
            $(this).val('JSON Wł');           
        } else {
            $JSON.html(construct_JSON()).css('display', "block");
            $(this).val('JSON Wył');           
        }
    })
}

function construct_JSON() {
    let inject_code = `
        <b>${gb.length}</b> zapisanych punktów w gb.points <br />
            &emsp;+ <b>${(gb.points.length - gb.length)}</b> nowo dodanych punktów <br />
        = <b>${gb.points.length}</b> punktów <br /><br />
        [ <br />`;
    
    let arr_length = gb.points.length;

    gb.points.map((el, id) => {
        let { posX, posY, napis, link, isNew } = el;
        let row = { posX, posY, napis, link };
        if (isNew) {
            inject_code += "<span style='color:green'>";
            inject_code += JSON.stringify(row);
            inject_code += "</span>";
        } else {
            inject_code += JSON.stringify(row);
        }

        inject_code += (id < arr_length - 1) ? ',' : "";
        inject_code += "<br />";
    })
    
    inject_code += "]" + "<br /><br /><p style='color: red; text-align: center;'>Nowo dodane punkty oznaczone na zielono należy wkleić ręcznie do globalnego obiektu gb w pliku main2.js</p>";

    return inject_code;
}