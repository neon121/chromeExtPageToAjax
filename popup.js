/*
Пример содержимого index.php:
*****************************************************
<?php
$fname = '1.html';
if (count($_POST)) {
    $html = $_POST['html'];
    $html = base64_decode($_POST['html']);
    $html = urldecode($html);
    $file = fopen($fname, 'w');
    fwrite($file, $html);
}
else echo file_get_contents($fname);
*****************************************************

в папке с index.php у apache должны быть права на запись

 */
var url = 'https://myvds.tk/scripts/ajax/index.php';

$(function() {
    $('#start').click(function() {
        $('#process').css('display', 'block');
        ajax();
    });
    $('#inspect').attr('href', url);
});


function ajax() {
    chrome.tabs.query(
        {
            active: true,
            currentWindow: true
        },
        function (tab) {
            chrome.tabs.sendMessage(
                tab[0].id,
                {action: "getDOM"},
                function (response) {
                    var http = new XMLHttpRequest();
                    var data = 'html=' + btoa(encodeURIComponent(response));
                    http.open('POST', url, true);
                    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                    http.onreadystatechange = function () {
                        if (http.readyState == 4 && http.status == 200) {
                            $('#process').css('display', 'none');
                        }
                    }
                    http.send(data);
                }
            );
        }
    );
}