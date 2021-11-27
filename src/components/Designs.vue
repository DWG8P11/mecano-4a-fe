<template>
<div id="keyboard">
    	<ul class="cf" id="numbers">
	    	<li><div class="key Backquote"><b>~</b><span>`</span></div></li>
	    	<li><div class="key Digit1"><b>!</b><span>1</span></div></li>
	    	<li><div class='key Digit2'><b>@</b><span>2</span></div></li>
	    	<li><div class="key Digit3"><b>#</b><span>3</span></div></li>
	    	<li><div class="key Digit4"><b>$</b><span>4</span></div></li>
	    	<li><div class="key Digit5"><b>%</b><span>5</span></div></li>
	    	<li><div class="key c54"><b>^</b><span>6</span></div></li>
	    	<li><div class="key c55"><b>&amp;</b><span>7</span></div></li>
	    	<li><div class="key c56"><b>*</b><span>8</span></div></li>
	    	<li><div class="key c57"><b>(</b><span>9</span></div></li>
	    	<li><div class="key c48"><b>)</b><span>0</span></div></li>
	    	<li><div class="key c189 alt"><b>_</b><span>-</span></div></li>
	    	<li><div class="key c187"><b>+</b><span>=</span></div></li>
	    	<li><div class="key c46" id="delete"><span>Delete</span></div></li>
        </ul>
    	<ul class="cf" id="qwerty">
	    	<li><div class="key c9" id="tab"><span>tab</span></div></li>
	    	<li><div class="key KeyQ"><span>q</span></div></li>
	    	<li><div class="key KeyW"><span>w</span></div></li>
	    	<li><div class="key c69"><span>e</span></div></li>
	    	<li><div class="key c82"><span>r</span></div></li>
	    	<li><div class="key c84"><span>t</span></div></li>
	    	<li><div class="key c89"><span>y</span></div></li>
	    	<li><div class="key c85"><span>u</span></div></li>
	    	<li><div class="key c73"><span>i</span></div></li>
	    	<li><div class="key c79"><span>o</span></div></li>
	    	<li><div class="key c80"><span>p</span></div></li>
	    	<li><div class="key c219 alt"><b>{</b><span>[</span></div></li>
	    	<li><div class="key c221 alt"><b>}</b><span>]</span></div></li>
	    	<li><div class="key c220 alt"><b>|</b><span>\</span></div></li>
        </ul>
        <ul class="cf" id="asdfg">
	    	<li><div class="key CapsLock alt" id="caps"><b></b><span>caps lock</span></div></li>
	    	<li><div class="key KeyA"><span>a</span></div></li>
	    	<li><div class="key KeyS"><span>s</span></div></li>
	    	<li><div class="key c68"><span>d</span></div></li>
	    	<li><div class="key c70"><span>f</span></div></li>
	    	<li><div class="key c71"><span>g</span></div></li>
	    	<li><div class="key c72"><span>h</span></div></li>
	    	<li><div class="key c74"><span>j</span></div></li>
	    	<li><div class="key c75"><span>k</span></div></li>
	    	<li><div class="key c76"><span>l</span></div></li>
	    	<li><div class="key c186 alt"><b>:</b><span>;</span></div></li>
	    	<li><div class="key c222 alt"><b>"</b><span>'</span></div></li>
	    	<li><div class="key c13 alt" id="enter"><span>return</span></div></li>
        </ul>
        <ul class="cf" id="zxcvb">
	    	<li><div class="key ShiftLeft shiftleft"><span>Shift</span></div></li>
	    	<li><div class="key c90"><span>z</span></div></li>
	    	<li><div class="key c88"><span>x</span></div></li>
	    	<li><div class="key c67"><span>c</span></div></li>
	    	<li><div class="key c86"><span>v</span></div></li>
	    	<li><div class="key c66"><span>b</span></div></li>
	    	<li><div class="key c78"><span>n</span></div></li>
	    	<li><div class="key c77"><span>m</span></div></li>
	    	<li><div class="key c188 alt"><b>&lt;</b><span>,</span></div></li>
	    	<li><div class="key c190 alt"><b>&gt;</b><span>.</span></div></li>
	    	<li><div class="key c191 alt"><b>?</b><span>/</span></div></li>
	    	<li><div class="key ShiftRight shiftright"><span>Shift</span></div></li>
        </ul>
		<ul class="cf" id="bottomrow">
	    	<li><div class="key Space" id="spacebar"></div></li>
	    	<li><div class="key command" id="commandright"><span>Alt Gr</span></div></li>
	    	
        </ul>
    </div>
    

</template>

<script>
export default {
	name: "Designs"
}
</script>

<style scoped>


#keyboard {
	position: relative;
	/* margin: 50px ; */
	width: 794px;
	/* height: 315px; */
	background:	rgba(170, 170, 170, 0.2);
	border-top-left-radius: 7px 21px;
	border-top-right-radius: 7px 21px;
	border-bottom-right-radius: 10px;
	border-bottom-left-radius: 10px;
	/* padding: 50px 0 0 10px; */
}

ul {list-style-type: none; width: 784px; margin: 0 auto;}
li {float: left;}


.key{
	display: block;
	color: rgba(170, 170, 170, 0.74);
	font: bold 9pt arial;
	text-decoration: none;
	text-align: center;
	width: 44px;
	height: 41px;
	margin: 5px;
	background: #fff;
	border-radius: 4px;
	border-top: 1px solid #222;
	text-shadow: 0px -1px 0px #000;}

.keydown {
	background: rgba(59, 171, 236, 0.795);
	margin: 7px 5px 3px;
	border-top: 1px solid rgb(19, 135, 245);}
	
.fn span {
	display: block;
	margin: 14px 5px 0 0;
	text-align: right;
	font: bold 6pt arial;
	text-transform: uppercase;}
#esc {
	margin: 6px 15px 0 0;
	font-size: 7.5pt;
	text-transform: lowercase;}


#numbers li div span {
	display: block;}
	
#numbers li div b {
	margin: 3px 0 3px;
	display: block;}

#numbers li .alt b {display: block;margin: 0 0 3px;}

#numbers li #delete span {
	text-align: right;
	margin: 23px 10px 0 0;
	font-size: 7.5pt;
	text-transform: lowercase;}
	
#qwerty li div span {
	display: block;
	margin: 13px 0 0;
	text-transform: uppercase;}
	
#qwerty li #tab span {
	text-align: left;
	margin: 23px 0 0 10px;
	font-size: 7.5pt;
	text-transform: lowercase;}	

#qwerty li .alt b {display: block; margin: 3px 0 0;}
#qwerty li .alt span {margin: 2px 0 0;}


#asdfg li div span {
	display: block;
	margin: 13px 0 0;
	text-transform: uppercase;}

#asdfg li .alt span {margin: 0; text-transform: lowercase;}
#asdfg li .alt b {display: block; margin: 3px 0 0;}
#asdfg li #caps b {
	display: block;
	background: #999;
	width: 4px;
	height: 4px;
	border-radius: 10px;
	margin: 9px 0 0 10px;
	-webkit-box-shadow: inset 0 1px 0 #666;
	-moz-box-shadow:inset 0 1px 0 #666;
	box-shadow:inset 0 1px 0 #666;}
#asdfg li #caps span {
	text-align: left;
	margin: 10px 0 0 10px;
	font-size: 7.5pt;}
#asdfg li #enter span {
	text-align: right;
	margin: 23px 10px 0 0;
	font-size: 7.5pt;}


#zxcvb li div span {
	display: block;
	margin: 13px 0 0;
	text-transform: uppercase;}
#zxcvb li .shiftleft span {
	text-align: left;
	margin: 23px 0 0 10px;
	font-size: 7.5pt;
	text-transform: lowercase;}
#zxcvb li .shiftright span {
	text-align: right;
	margin: 23px 10px 0 0;
	font-size: 7.5pt;
	text-transform: lowercase;}
#zxcvb li .alt b {display: block;margin: 4px 0 0;}
#zxcvb li .alt span {margin: 0;}

	
#bottomrow li #fn span, #bottomrow li #control span, #bottomrow li #optionleft span, #bottomrow li #commandleft span {
	display: block;
	text-align: left;
	margin: 31px 0 0 8px;
	font-size: 7.5pt;
	text-transform: lowercase;}

#bottomrow li #optionright span, #bottomrow li #commandright span {
	display: block;
	text-align: right;
	margin: 31px 8px 0 0;
	font-size: 7.5pt;
	text-transform: lowercase;}

#bottomrow ol li #left span, #bottomrow ol li #right span, #bottomrow ol li #up span, #bottomrow ol li #down span {
	display: block;
	margin: 9px 0 0;}

.fn {height: 26px; width: 46px;}
#delete {width: 72px;}
#tab {width: 72px;}
#caps {width: 85px;}
#enter {width: 85px;}
.shiftleft, .shiftright {width: 112px;}
#fn, #control, .option, .command, #spacebar {height: 49px;}

#control {width: 56px;}
.option {width: 46px;}
.command {width: 67px;}
#spacebar {width: 226px;}

#left img, #up img, #down img, #right img {border: none;}
ul ol {list-style-type: none;}
#down {height: 23px;}
#up, #left, #right {height: 24px;}
#left, #right {margin: 30px 5px 5px;}
#left:active, #right:active {margin: 32px 5px 3px;}
#up {margin: 5px 5px 1px; border-bottom-right-radius: 0px; border-bottom-left-radius: 0px;}
#up:active {margin: 8px 5px -2px;}
#down {margin: 0 5px 5px; border-top-left-radius: 0px; border-top-right-radius: 0px;}
#down:Active {margin: 3px 5px 4px;}

h1 {
	color: #888;
	text-align: center;
	font: bold 25pt/25pt arial;
	margin: 30px 0 60px;}
	
h2 {
	color: #666;
	font: 13pt/0pt arial;}
	
p {
	color: #999;
	font: 9pt/17pt arial;
	margin: 0 0 50px;}


ul, ol {padding: 0px; margin: 0;}
	
/* Micro Clearfix by Nicolas Gallagher - http://nicolasgallagher.com/micro-clearfix-hack */
        /* For modern browsers */
        .cf:before, .cf:after {content:""; display:table;}
        .cf:after {clear:both;}

        /* For IE 6/7 (trigger hasLayout) */
        .cf {zoom:1;}
</style>>
