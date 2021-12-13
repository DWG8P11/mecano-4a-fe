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
	position: fixed;
	left:6.1111rem;
	bottom:4.1667rem;
	/* margin: 50px ; */
	width: 53.3333rem;
	height: 13.25rem;
	background:	rgba(170, 170, 170, 0.1);
	border-top-left-radius: 0.5833rem 1.75rem;
	border-top-right-radius: 0.5833rem 1.75rem;
	border-bottom-right-radius: 0.8333rem;
	border-bottom-left-radius: 0.8333rem;
	/* padding: 50px 0 0 10px; */
}

ul {list-style-type: none; width: 65.3333rem; margin: 0 auto;}
li {float: left;}

@font-face {
  font-family:Questa Grande;
  src: url(../../fuentes/Questa_Grande_Regular.otf) format("OpenType");
}

.key{
	display: block;
	color:white;
	font-family: Questa Grande;
    font-size:0.8889rem;
	text-decoration: none;
	text-align: center;
	width: 2.5rem;
	height: 1.6667rem;
	margin: 0.4167rem;
	background:transparent; 
	border-radius: 0.3333rem;
	border-top: 0.0833rem solid #222;
	border-bottom:0.0833rem solid #222;
	border-right:0.0833rem solid #222;
	border-left: 0.0833rem solid #222;
	border-color:rgb(115,239,249); 
	box-shadow: 0.0833rem 0.0833rem 0.0833rem 0.0833rem rgb(61, 230, 230);
	text-shadow: 0rem -0.0833rem 0rem #000;
	}

.keydown {
	background: rgba(59, 171, 236, 0.795);
	margin: 0.5833rem 0.4167rem 0.25rem;
	border-top: 0.0833rem solid rgb(19, 135, 245);}

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
	margin: 1.1667rem 0.4167rem 0 0;
	text-align: right;
	
	}
#esc {
	margin: 0.5rem 1.25rem 0 0;
	font-size: 0.8333rem;
	line-height: 0rem;
	}


#numbers li div span {
	display: block;}
	
#numbers li div b {
	margin: 0.25rem 0 0.25rem;
	display: block;
	line-height: 0.2333rem;
	
	}

#numbers li .alt b {
	display: block;
	margin: 0 0 0.25rem;
	}

#numbers li #delete span {
	text-align: right;
	margin: 1.0833rem 1.0833rem 0 0;
	font-size: 0.8889rem;
	line-height: 0.1667rem;
	
}
	
#qwerty li div span {
	display: block;
	margin: 1.0833rem 0 0;
	text-transform: capitalize;
	text-align: center;
	line-height: 0rem;
	}
	
#qwerty li #tab span {
	text-align: left;
	margin: 1.0833rem 0 0 0.8333rem;
	font-size: 0.8889rem;
	
	}	

#qwerty li .alt b {display: block; margin: 0rem 0 0;}
#qwerty li .alt span {margin: 0rem 0 0;}


#asdfg li div span {
	display: block;
	margin: 1.0833rem 0 0;
	text-transform: capitalize;
	line-height: 0rem;
	}

#asdfg li .alt span {margin: 0}
#asdfg li .alt b {display: block; margin: 0.25rem 0 0;}
#asdfg li #caps b {
	display: block;
	background: #999;
	width: 0.3333rem;
	height: 0.3333rem;
	border-radius: 0.8333rem;
	margin: 0rem 0 0 0.8333rem;
	-webkit-box-shadow: inset 0 0.0833rem 0 #666;
	-moz-box-shadow:inset 0 0.0833rem 0 #666;
	box-shadow:inset 0 0.0833rem 0 #666;
	font-size: 0.8889rem;
	}
	
#asdfg li #caps span {
	text-align: left;
	margin: 0.8333rem 0 0 0.8333rem;
	font-size: 0.8333rem;
	}
#asdfg li #enter span {
	text-align: right;
	margin: 1.0833rem 0.8333rem 0 0;
	font-size: 0.8333rem;
	}


#zxcvb li div span {
	display: block;
	margin: 1.0833rem 0 0;
	text-transform: capitalize;
	line-height: 0.2222rem;
	}
#zxcvb li .shiftleft span {
	text-align: left;
	margin: 1.0833rem 0 0 0.8333rem;
	font-size: 0.8888rem;
	line-height: 0rem;
	}
#zxcvb li .shiftright span {
	text-align: right;
	margin: 1.0833rem 0.8333rem 0 0;
	font-size: 0.8889rem;
	}
#zxcvb li .alt b {display: block;margin: 0rem 0 0;}
#zxcvb li .alt span {margin: 0;}

	
#bottomrow li #fn span, #bottomrow li #control span, #bottomrow li #optionleft span, #bottomrow li #commandleft span {
	display: block;
	text-align: left;
	margin: 1.0833rem 0 0 0.6667rem;
	font-size: 0.8889rem;

}

#bottomrow li #optionright span, #bottomrow li #commandright span {
	display: block;
	text-align: right;
	margin: 0.0833rem 0.1667rem 0 0;
	font-size: 0.8889rem;
}

#bottomrow ol li #left span, #bottomrow ol li #right span, #bottomrow ol li #up span, #bottomrow ol li #down span {
	display: block;
	margin: 0.75rem 0 0;
	}

.fn {height: 2.1667rem; width: 3.8333rem;}

#delete {
	width: 6.4167rem;
	margin: 0.4167rem 0 0 0.0833rem;
	
	}	

#tab {width: 6rem;}
#caps {
	width: 7.0833rem;
}
#enter {
	width: 5.4167rem;
	position:absolute;
	right: 0.7778rem;
	}
.shiftleft {width: 9.3333rem;}
.shiftright {
	width: 6.6667rem;
	position:absolute;
	right: 0.7778rem;
	}
#fn, #control, .option, .command, #spacebar {height: 4.0833rem;}

#control {width: 4.6667rem;}
.option {width: 3.8333rem;}
.command {width: 5.5833rem;}
#spacebar {
	width: 18.8333rem;
	height: 1.6222rem;
	position: absolute;
	left:16.6667rem ;
}
#commandright{
	position: absolute;
	right: 13.3333rem;

}

#left img, #up img, #down img, #right img {border: none;}
ul ol {list-style-type: none;}
#down {height: 1.9167rem;}
#up, #left, #right {height: 2rem;}
#left, #right {margin: 2.5rem 0.4167rem 0.4167rem;}
#left:active, #right:active {margin: 2.6667rem 0.4167rem 0.25rem;}
#up {margin: 0.4167rem 0.4167rem 0.0833rem; border-bottom-right-radius: 0rem; border-bottom-left-radius: 0rem;}
#up:active {margin: 0.6667rem 0.4167rem -0.1667rem;}
#down {margin: 0 0.4167rem 0.4167rem; border-top-left-radius: 0rem; border-top-right-radius: 0rem;}
#down:Active {margin: 0.25rem 0.4167rem 0.3333rem;}

h1 {
	color: #888;
	text-align: center;
	font: bold 2.7777rem/2.7777rem arial;
	margin: 2.5rem 0 5rem;
}
	
h2 {
	color: #666;
	font: 1.4444rem/0rem arial;
}
	
p {
	color: #999;
	font: 1rem/1.8889rem arial;
	margin: 0 0 4.1667rem;
}

ul, ol {padding: 0rem; margin: 0;}
	
/* Micro Clearfix by Nicolas Gallagher - http://nicolasgallagher.com/micro-clearfix-hack */
        /* For modern browsers */
        .cf:before, .cf:after {content:""; display:table;}
        .cf:after {clear:both;}

        /* For IE 6/7 (trigger hasLayout) */
        .cf {zoom:1;}
</style>
