<template>
<div id="keyboard">
    	<ul class="cf" id="numbers">
	    	<li><div class="key Backquote"><b>~</b><span>`</span></div></li>
	    	<li><div class="key Digit1"><b>!</b><span>1</span></div></li>
	    	<li><div class='key Digit2'><b>@</b><span>2</span></div></li>
	    	<li><div class="key Digit3"><b>#</b><span>3</span></div></li>
	    	<li><div class="key Digit4"><b>$</b><span>4</span></div></li>
	    	<li><div class="key Digit5"><b>%</b><span>5</span></div></li>
	    	<li><div class="key Digit6"><b>^</b><span>6</span></div></li>
	    	<li><div class="key Digit7"><b>&amp;</b><span>7</span></div></li>
	    	<li><div class="key Digit8"><b>*</b><span>8</span></div></li>
	    	<li><div class="key Digit9"><b>(</b><span>9</span></div></li>
	    	<li><div class="key Digit0"><b>)</b><span>0</span></div></li>
	    	<li><div class="key Minus alt"><b>_</b><span>-</span></div></li>
	    	<li><div class="key Equal"><b>+</b><span>=</span></div></li>
	    	<li><div class="key Backspace" id="delete"><span>Delete</span></div></li>
        </ul>
    	<ul class="cf" id="qwerty">
	    	<li><div class="key Tab" id="tab"><span>Tab</span></div></li>
	    	<li><div class="key KeyQ"><span>q</span></div></li>
	    	<li><div class="key KeyW"><span>w</span></div></li>
	    	<li><div class="key KeyE"><span>e</span></div></li>
	    	<li><div class="key KeyR"><span>r</span></div></li>
	    	<li><div class="key KeyT"><span>t</span></div></li>
	    	<li><div class="key KeyY"><span>y</span></div></li>
	    	<li><div class="key KeyU"><span>u</span></div></li>
	    	<li><div class="key KeyI"><span>i</span></div></li>
	    	<li><div class="key KeyO"><span>o</span></div></li>
	    	<li><div class="key KeyP"><span>p</span></div></li>
	    	<li><div class="key BracketLeft alt"><b>{</b><span>[</span></div></li>
	    	<li><div class="key BracketRight alt"><b>}</b><span>]</span></div></li>
	    	<li><div class="key Backslash alt"><b>|</b><span>\</span></div></li>
        </ul>
        <ul class="cf" id="asdfg">
	    	<li><div class="key CapsLock alt" id="caps"><b></b><span>Caps Lock</span></div></li>
	    	<li><div class="key KeyA"><span>a</span></div></li>
	    	<li><div class="key KeyS"><span>s</span></div></li>
	    	<li><div class="key KeyD"><span>d</span></div></li>
	    	<li><div class="key KeyF"><span>f</span></div></li>
	    	<li><div class="key KeyG"><span>g</span></div></li>
	    	<li><div class="key KeyH"><span>h</span></div></li>
	    	<li><div class="key KeyJ"><span>j</span></div></li>
	    	<li><div class="key KeyK"><span>k</span></div></li>
	    	<li><div class="key KeyL"><span>l</span></div></li>
	    	<li><div class="key Semicolon alt"><b>:</b><span>;</span></div></li>
	    	<li><div class="key Quote alt"><b>"</b><span>'</span></div></li>
	    	<li><div class="key Enter alt" id="enter"><span>Return</span></div></li>
        </ul>
        <ul class="cf" id="zxcvb">
	    	<li><div class="key ShiftLeft shiftleft"><span>Shift</span></div></li>
	    	<li><div class="key KeyZ"><span>z</span></div></li>
	    	<li><div class="key KeyX"><span>x</span></div></li>
	    	<li><div class="key KeyC"><span>c</span></div></li>
	    	<li><div class="key KeyV"><span>v</span></div></li>
	    	<li><div class="key KeyB"><span>b</span></div></li>
	    	<li><div class="key KeyN"><span>n</span></div></li>
	    	<li><div class="key KeyM"><span>m</span></div></li>
	    	<li><div class="key Comma alt"><b>&lt;</b><span>,</span></div></li>
	    	<li><div class="key Period alt"><b>&gt;</b><span>.</span></div></li>
	    	<li><div class="key Slash alt"><b>?</b><span>/</span></div></li>
	    	<li><div class="key ShiftRight shiftright"><span>Shift</span></div></li>
        </ul>
		<ul class="cf" id="bottomrow">
	    	<li><div class="key Space" id="spacebar"></div></li>
	    	<li><div class="key AltRight" id="commandright"><span>Alt Gr</span></div></li>
	    	
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
	left:55pt;
	top:6pt;
	/* margin: 50px ; */
	width: 640px;
	height: 159px;
	background:	rgba(170, 170, 170, 0.1);
	border-top-left-radius: 7px 21px;
	border-top-right-radius: 7px 21px;
	border-bottom-right-radius: 10px;
	border-bottom-left-radius: 10px;
	/* padding: 50px 0 0 10px; */
}

ul {list-style-type: none; width: 784px; margin: 0 auto;}
li {float: left;}

@font-face {
  font-family:Questa Grande;
  src: url(../../fuentes/Questa_Grande_Regular.otf) format("OpenType");
}

.key{
	display: block;
	color:white;
	font-family: Questa Grande;
    font-size:8pt;
	text-decoration: none;
	text-align: center;
	width: 30px;
	height: 20px;
	margin: 5px;
	background:transparent; 
	border-radius: 4px;
	border-top: 1px solid #222;
	border-bottom:1px solid #222;
	border-right:1px solid #222;
	border-left: 1px solid #222;
	border-color:rgb(115,239,249); 
	box-shadow: 1px 1px 1px 1px rgb(61, 230, 230);
	text-shadow: 0px -1px 0px #000;
	}

.keydown {
	background: rgba(59, 171, 236, 0.795);
	margin: 7px 5px 3px;
	border-top: 1px solid rgb(19, 135, 245);}

.aprobada {
	background: rgb(30, 174, 152);
}

.reprobada {
	background: crimson;
}

.actual {
	background: rgb(241, 150, 117);
}
	
.fn span {
	display: block;
	margin: 14px 5px 0 0;
	text-align: right;
	
	}
#esc {
	margin: 6px 15px 0 0;
	font-size: 7.5pt;
	line-height: 0pt;
	}


#numbers li div span {
	display: block;}
	
#numbers li div b {
	margin: 3px 0 3px;
	display: block;
	line-height: 2.1pt;
	
	}

#numbers li .alt b {
	display: block;
	margin: 0 0 3px;
	}

#numbers li #delete span {
	text-align: right;
	margin: 23px 10px 0 0;
	
}
	
#qwerty li div span {
	display: block;
	margin: 13px 0 0;
	text-transform: capitalize;
	text-align: center;
	line-height: 0pt;
	}
	
#qwerty li #tab span {
	text-align: left;
	margin: 23px 0 0 10px;
	font-size: 7.5pt;
	
	}	

#qwerty li .alt b {display: block; margin: 0px 0 0;}
#qwerty li .alt span {margin: 0px 0 0;}


#asdfg li div span {
	display: block;
	margin: 13px 0 0;
	text-transform: capitalize;
	line-height: 0pt;
	}

#asdfg li .alt span {margin: 0}
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
	box-shadow:inset 0 1px 0 #666;
	
	}
	
#asdfg li #caps span {
	text-align: left;
	margin: 10px 0 0 10px;
	font-size: 7.5pt;
	}
#asdfg li #enter span {
	text-align: right;
	margin: 23px 10px 0 0;
	font-size: 7.5pt;
	}


#zxcvb li div span {
	display: block;
	margin: 13px 0 0;
	text-transform: capitalize;
	line-height: 2pt;
	}
#zxcvb li .shiftleft span {
	text-align: left;
	margin: 23px 0 0 10px;
	font-size: 7.5pt;
	line-height: 0pt;
	}
#zxcvb li .shiftright span {
	text-align: right;
	margin: 23px 10px 0 0;
	font-size: 7.5pt;
	}
#zxcvb li .alt b {display: block;margin: 4px 0 0;}
#zxcvb li .alt span {margin: 0;}

	
#bottomrow li #fn span, #bottomrow li #control span, #bottomrow li #optionleft span, #bottomrow li #commandleft span {
	display: block;
	text-align: left;
	margin: 31px 0 0 8px;
	font-size: 7.5pt;

}

#bottomrow li #optionright span, #bottomrow li #commandright span {
	display: block;
	text-align: right;
	margin: 31px 8px 0 0;
	font-size: 7.5pt;
}

#bottomrow ol li #left span, #bottomrow ol li #right span, #bottomrow ol li #up span, #bottomrow ol li #down span {
	display: block;
	margin: 9px 0 0;
	}

.fn {height: 26px; width: 46px;}
#delete {
	width: 77px;
	position:absolute;
	right:7pt;
	
}
#tab {width: 72px;}
#caps {
	width: 85px;
}
#enter {
	width: 65px;
	position:absolute;
	right: 7pt;
	}
.shiftleft {width: 112px;}
.shiftright {
	width: 80px;
	position:absolute;
	right: 7pt;
	}
#fn, #control, .option, .command, #spacebar {height: 49px;}

#control {width: 56px;}
.option {width: 46px;}
.command {width: 67px;}
#spacebar {
	width: 226px;
	height: 14.6pt;
	position: absolute;
	left:150pt ;
}
#commandright{
	position: absolute;
	right: 120pt;

}

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
