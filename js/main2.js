gb = {};

gb.points = [{
    "posX": "6.11%",
    "posY": "52.52%",
    "napis": "Orla Perć",
    "link": "https://pl.wikipedia.org/wiki/Orla_Per%C4%87"
}, {
    "posX": "12.94%",
    "posY": "23.84%",
    "napis": "Przełęcz Srebrna",
    "link": "https://pl.wikipedia.org/wiki/Prze%C5%82%C4%99cz_Srebrna"
}, {
    "posX": "36.75%",
    "posY": "17.64%",
    "napis": "Riaba Skała",
    "link": "https://pl.wikipedia.org/wiki/Riaba_Ska%C5%82a"
}, {
    "posX": "50.67%",
    "posY": "35.42%",
    "napis": "Góry Świętokrzyskie",
    "link": "https://pl.wikipedia.org/wiki/G%C3%B3ry_%C5%9Awi%C4%99tokrzyskie"
}, {
    "posX": "53.46%",
    "posY": "69.08%",
    "napis": "Babia Góra",
    "link": "https://pl.wikipedia.org/wiki/Babia_G%C3%B3ra"
}, {
    "posX": "46.36%",
    "posY": "50.77%",
    "napis": "Dolina Chochołowska",
    "link": "https://pl.wikipedia.org/wiki/Dolina_Chocho%C5%82owska"
}, {
    "posX": "29.38%",
    "posY": "43.77%",
    "napis": "Lodowa Przełęcz",
    "link": "https://pl.wikipedia.org/wiki/Lodowa_Prze%C5%82%C4%99cz"
}, {
    "posX": "9.52%",
    "posY": "38.38%",
    "napis": "Aconcagua",
    "link": "https://pl.wikipedia.org/wiki/Aconcagua"
}, {
    "posX": "45.55%",
    "posY": "33.40%",
    "napis": "Denali",
    "link": "https://pl.wikipedia.org/wiki/Denali"
}, {
    "posX": "53.64%",
    "posY": "60.60%",
    "napis": "Elbrus",
    "link": "https://pl.wikipedia.org/wiki/Elbrus"
}, {
    "posX": "43.13%",
    "posY": "76.09%",
    "napis": "Puncak Jaya",
    "link": "https://pl.wikipedia.org/wiki/Jaya"
}, {
    "posX": "11.50%",
    "posY": "85.78%",
    "napis": "Masyw Vinsona",
    "link": "https://pl.wikipedia.org/wiki/Masyw_Vinsona"
}, {
    "posX": "58.85%",
    "posY": "58.31%",
    "napis": "Góra Kościuszki",
    "link": "https://pl.wikipedia.org/wiki/G%C3%B3ra_Ko%C5%9Bciuszki"
}, {
    "posX": "82.03%",
    "posY": "92.11%",
    "napis": "Alpy",
    "link": "https://pl.wikipedia.org/wiki/Alpy"
}, ]

gb.length = gb.points.length;

$(document).ready(function () {

    wyswietlanie_punktow();
    blur_on_social_icon();
    edit_on_off();
})

function edit_on_off() {
    $('#gory .onoffswitch-checkbox').on('click', () => {
        $('#interface').toggleClass('on_interface');
        $('#cursor').toggle();

        if ($('#display_JSON').val() === "JSON Wył") {
            $('#JSON').toggle();
        }
    })
}

function wyswietlanie_punktow() {
    let point_html = ``;

    gb.points.map(el => {
        let stroke_class;
        let issueBox_side;
        let issueBox_a = "";
        const posX_replace = el.posX.replace('%', '');
        const posY_replace = el.posY.replace('%', '');

        if (posX_replace <= 50 && posY_replace <= 50) {
            stroke_class = "stroke_left_top";
            // issueBox_side = "issueBox_left_top";
        } else if (posX_replace >= 50 && posY_replace <= 50) {
            stroke_class = "stroke_right_top";
            issueBox_side = "right_top";
            // issueBox_a = "issueBox_a_right_top"
        } else if (posX_replace <= 50 && posY_replace >= 50) {
            stroke_class = "stroke_left_bottom";
            issueBox_side = "left_bottom";
        } else if (posX_replace >= 50 && posY_replace >= 50) {
            stroke_class = "stroke_right_bottom";
            issueBox_side = "right_bottom";
            // issueBox_a = "issueBox_a_right_bottom"
        }

        point_html += `<div class="point" style="left:${el.posX}; top: ${el.posY};">
            <a href="${el.link}" class="circle_link" target="_blank"></a>
            <div class="circle"></div>
            <div class="dot"></div>
            <div class="stroke ${stroke_class}"></div>
            <div class="issueBox ${issueBox_side}">
                <a href="${el.link}" class="${issueBox_a}" target="_blank">${el.napis}</a>
            </div>
        </div>`;
    })
    $('.points').html(point_html);
}

function blur_on_social_icon() {
    $('.social_icons a').hover(
        function () {
            $('#main_pic').addClass('active');
        },
        function () {
            $('#main_pic').removeClass('active');
        });
}