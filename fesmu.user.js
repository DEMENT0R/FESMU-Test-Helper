// ==UserScript==
// @name         FESMU TEST
// @namespace    fesmu tests solver
// @version      0.2.3
// @description  fesmu tests solver!
// @author       DEMENTOR
// @icon         http://eport.fesmu.ru/SITE/img/caption_left.png
// @match        http://eport.fesmu.ru/eport/eport/*
// @downloadURL  https://github.com/DEMENT0R/FESMU-Test-Helper/raw/master/fesmu.user.js
// @updateURL    https://github.com/DEMENT0R/FESMU-Test-Helper/raw/master/fesmu.user.js
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_listValues
// @grant        GM_deleteValue
// @require      https://code.jquery.com/jquery-3.2.1.min.js
// ==/UserScript==

(function() {
    'use strict';
    var i = 0;
    var current_question = GM_getValue( 'current_question', '0' );
    var need_solve = GM_getValue( 'need_solve', '0' );
    var have_solve = GM_getValue( 'have_solve', '0' );
    var $ = window.jQuery;

    var widjet = "<div class='fesmu-bot-solver-block' style='position: fixed; top: 10px; right: 10px; z-index: 9999; border: 1px solid silver; padding: 5px; background: white;'>";
    widjet += "<a href='http://eport.fesmu.ru/eport/eport/studtst2.aspx?start'>Start</a>";
    widjet += " | ";
    widjet += "<a href='http://eport.fesmu.ru/eport/eport/studtst2.aspx?reset'>Reset</a>";
    widjet += "";
    widjet += "</div>";

    $('body').append(widjet);

    console.log("GM_listValues = " + GM_listValues());
    console.log("current_question = " + GM_getValue("current_question","0"));
    console.log("need_solve = " + GM_getValue("need_solve","0"));
    console.log("have_solve = " + GM_getValue("have_solve","0"));

    setInterval(function(){
        i++;

        // СТАРТ!
        if (window.location.href == "http://eport.fesmu.ru/eport/eport/studtst2.aspx?start"){
            if (i == 1) {
                GM_setValue( 'current_question', 1 );
                //alert("Начало работы!");
                console.log("Начало работы!!!");
                $('#ctl00_MainContent_ASPxButton' + current_question).click();
            }
        }

        // Общий сброс
        if (window.location.href == "http://eport.fesmu.ru/eport/eport/studtst2.aspx?reset"){
            if (i == 1) {
                GM_setValue( 'current_question', 0 );
                GM_setValue( 'need_solve', true );
                GM_setValue( 'have_solve', false );

                alert("Был произведён сброс настроек и данных! Работа остановлена!");
            }
        }

        // Ставим все галки и возвращаемся на страницу с номерами вопросов (ответы неизвестны):
        if (((window.location.href == "http://eport.fesmu.ru/eport/eport/studtst30.aspx")&&(have_solve == false))|((window.location.href == "http://eport.fesmu.ru/eport/eport/studtst3.aspx")&&(have_solve == false))){
            if (i == 1) {
                $('.dxWeb_edtCheckBoxUnchecked_Aqua').click();
            }
            GM_setValue( 'need_solve', true );
            if (i == 2) {
                $('#ctl00_MainContent_ASPxButton04_CD').click();
            }
        }

        // Ставим нужные галки и возвращаемся на страницу с номерами вопросов (ответы известны):
        if (((window.location.href == "http://eport.fesmu.ru/eport/eport/studtst30.aspx")&&(have_solve == true))|((window.location.href == "http://eport.fesmu.ru/eport/eport/studtst3.aspx")&&(have_solve == true))){
            if (i == 1) {
                if (GM_getValue( 'check_1', '0' ) == false) {
                    $('#ctl00_MainContent_ASPxCheckBox1_S_D').click();
                }
                if (GM_getValue( 'check_2', '0' ) == false) {
                    $('#ctl00_MainContent_ASPxCheckBox2_S_D').click();
                }
                if (GM_getValue( 'check_3', '0' ) == false) {
                    $('#ctl00_MainContent_ASPxCheckBox3_S_D').click();
                }
                if (GM_getValue( 'check_4', '0' ) == false) {
                    $('#ctl00_MainContent_ASPxCheckBox4_S_D').click();
                }
                if (GM_getValue( 'check_5', '0' ) == false) {
                    if (document.getElementById('ctl00_MainContent_ASPxCheckBox5_S_D')){
                        $('#ctl00_MainContent_ASPxCheckBox5_S_D').click();
                    }
                }
            }
            GM_setValue( 'have_solve', false );
            if (i == 2) {
                GM_setValue( 'current_question', current_question + 1 );
                $('#ctl00_MainContent_ASPxButton04_CD').click();
            }
        }


        // Выбираем вопрос
        if ((window.location.href == "http://eport.fesmu.ru/eport/eport/studtst2.aspx")&&(need_solve == false)){
            if ((i == 1)&&(current_question != 0)) {
                $('#ctl00_MainContent_ASPxButton' + current_question+'_B').click();

            } else {
                console.log("Error! current_question = 0!!!");
            }
        }

        // Идём смотреть ответы:
        if ((window.location.href == "http://eport.fesmu.ru/eport/eport/studtst2.aspx")&&(need_solve == true)){
            if (i == 1) {
                GM_setValue( 'need_solve', false );
                //var a = window.open("http://eport.fesmu.ru/eport/eport/studtst5.aspx", "_blank", ""); a.blur();
                window.open("http://eport.fesmu.ru/eport/eport/studtst5.aspx", "_blank", "");
            }
            if (i == 5) {
                location.reload();
            }
        }

        // Запоминаем правильные ответы:
        if ((window.location.href == "http://eport.fesmu.ru/eport/eport/studtst5.aspx")){
            if (i == 1) {
                if (document.getElementById('ctl00_MainContent_Label1').style.backgroundColor == "aquamarine"){
                    GM_setValue( 'check_1', true );
                } else {
                    GM_setValue( 'check_1', false );
                }
                if (document.getElementById('ctl00_MainContent_Label2').style.backgroundColor == "aquamarine"){
                    GM_setValue( 'check_2', true );
                } else {
                    GM_setValue( 'check_2', false );
                }
                if (document.getElementById('ctl00_MainContent_Label3').style.backgroundColor == "aquamarine"){
                    GM_setValue( 'check_3', true );
                } else {
                    GM_setValue( 'check_3', false );
                }
                if (document.getElementById('ctl00_MainContent_Label4').style.backgroundColor == "aquamarine"){
                    GM_setValue( 'check_4', true );
                } else {
                    GM_setValue( 'check_4', false );
                }
                if (document.getElementById('ctl00_MainContent_Label5')){
                    if (document.getElementById('ctl00_MainContent_Label5').style.backgroundColor == "aquamarine"){
                        GM_setValue( 'check_5', true );
                    } else {
                        GM_setValue( 'check_5', false );
                    }
                }


                GM_setValue( 'have_solve', true );

                console.log("GM_listValues = " + GM_listValues());
                console.log("check_1 = " + GM_getValue( 'check_1', '0' ));
                console.log("check_2 = " + GM_getValue( 'check_2', '0' ));
                console.log("check_3 = " + GM_getValue( 'check_3', '0' ));
                console.log("check_4 = " + GM_getValue( 'check_4', '0' ));
                console.log("check_5 = " + GM_getValue( 'check_5', '0' ));

            }

            if (i == 2){
                window.close();
            }
        }

    }, 1000);
})();
