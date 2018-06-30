<h1>Пример работы</h1>
Загружать так:<br/>
- в адресной строке Chrome - <code>chrome://extension</code><br/>
- Developer mode должен быть включен<br/>
- Load unpacked<br/>
- выбираем путь, жмем ок, приложение появляется в браузере<br/>
<br/>
В <code>popup.js</code> надо переопределить переменную <code>url</code>
так, чтобы она содержала полный ГЛОБАЛЬНЫЙ путь до <code>ajax.php</code>
<br/><br/>
Пример содержимого ajax.php:<br/>
<pre>
<?php
$fname = '1.html';<br/>
if (count($_POST)) {<br/>
    $html = $_POST['html'];<br/>
    $html = base64_decode($_POST['html']);<br/>
    $html = urldecode($html);<br/>
    $file = fopen($fname, 'w');<br/>
    fwrite($file, $html);<br/>
}<br/>
else echo file_get_contents($fname);<br/>
</pre>
 
в папке с <code>ajax.php</code> у веб-сервера должны быть права на запись