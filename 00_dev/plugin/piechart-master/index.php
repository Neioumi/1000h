<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />	
	<link href='http://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700' rel='stylesheet' type='text/css'>
	<link href="http://www.ericwenn.se/css/basic.css" rel="stylesheet">
	<script src="http://code.jquery.com/jquery-2.0.3.min.js"></script>
	<script src="http://www.ericwenn.se/js/basic.js"></script>
	<meta name="twitter:card" content="summary">
	<meta name="twitter:site" content="@ericwenn">
	<meta name="twitter:creator" content="@ericwenn">
	<meta name="twitter:title" content="Pie Chart jQuery Plugin - Flat Framework">
	<meta name="twitter:description" content="A flat, responsive and awesome jQuery plugin for creating piecharts without any SVGs, only CSS.">
	<title>Pie Chart jQuery Plugin - Flat Framework</title>
	<link href="piechart.css" rel="stylesheet">
	<script src="piechart.js"></script>
	<link href="http://www.ericwenn.se/frameworks/css/frameworks.css" rel="stylesheet">
	<script src="http://www.ericwenn.se/frameworks/js/frameworks.js"></script>
	<script src="https://google-code-prettify.googlecode.com/svn/loader/run_prettify.js"></script>
</head>
<body>
<?php
include('/home/u/u0056300/www/ericwenn/php/basic/header.php');
?>
<div id="content">
<div class="framework-container">
<h1>Flatmin responsive Piechart Plugin</h1>
<p>This plugin is a part of Flatmin Responsive Framework by <a href="http://www.ericwenn.se" class="inline-style"><span data-text="Eric Wennerberg">Eric Wennerberg</span></a></p>
<div class="share-bar">
<div class="g-plus" data-action="share" data-annotation="bubble"></div><a href="https://twitter.com/share" class="twitter-share-button" data-url="http://ericwenn.se/frameworks/flatmin/piechart/" data-via="ericwenn" data-text="A flat, responsive and awesome jQuery plugin for making piecharts without any SVGs. Only #CSS" data-lang="en">Tweet</a>
</div>
<div class="example" onpagenavigation id="demo"></div>
<a onpagenavigation id="download" href="http://www.ericwenn.se/frameworks/flatmin/piechart/flatmin-piechart.zip" class="nostyle"><div class="downloadbutton" data-version="1.0" data-product="Flatmin Piechart"><span>Download v1.0</span><span>26th September 2013</span></div></a>
<pre><code class="prettyprint">&lt;link href=&quot;http://www.ericwenn.se/frameworks/flatmin/piechart/piechart.css&quot; rel=&quot;stylesheet&quot;&gt;<br/>&lt;script src=&quot;http://www.ericwenn.se/frameworks/flatmin/piechart/piechart.js&quot;&gt;&lt;/script&gt;</code></pre>
<h2 onpagenavigation id="features">Features</h2>
<ul>
	<li><h5>Only CSS and Javascript</h5><p>The plugin uses no elements that cant be styled with CSS.</p></li>
	<li><h5>Adaptable</h5><p>The widget will look great, no matter the width of the container.</p></li>
	<li><h5>Small Size</h5><p>Combined filesize is ~8kb.</p></li>
	<li><h5>Responsive</h5><p>Will adapt if the window is resized, try it yourself.</p></li>
</ul>
<h2 onpagenavigation id="usage">Usage</h2>
<ul>
	<li><h5></h5><p><pre><code class="prettyprint">	$(&quot;.example&quot;).piechart(dataArray);</code></pre></p><p>Where dataArray contains the data in a multidimensional array. First row is a legend for the table, for example <code class="prettyprint">dataArray[0] = [&quot;Country&quot;,&quot;inhabitants&quot;];</code><br>The following rows is structured [Title, Value, Color]. Title and color should be encapsed in quotes.</p><p><pre><code class="prettyprint"> 	$(&quot;.example&quot;).piechart([<br/>		[&quot;Country&quot;, &quot;M inhabitants&quot;],<br/>		[&quot;China&quot;, 1360, 'blue'],<br/>		[&quot;India&quot;, 1234],<br/>		[&quot;USA&quot;, 316],<br/>		[&quot;Indonesia&quot;, 237],<br/>		[&quot;Brazil&quot;, 201]<br/>	]); </code></pre></p></li>
</ul>
<a href="http://www.ericwenn.se/frameworks/flatmin/calendar/flatmin-calendar.zip" class="nostyle"><div class="downloadbutton" data-version="1.0" data-product="Flatmin Calendar"><span>Download v1.0</span><span>19th September 2013</span></div></a>
</div>
</div>
</body>
</html>