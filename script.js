"use strict";

const c = document.getElementById("clock");
const d = document.getElementById("date");
const p = document.getElementById("player");
const s = document.getElementById("search");
const months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
const weekdays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
p.controls = false;

document.addEventListener("DOMContentLoaded", function() {
	s.value = "";
}, false);

function play() {
	p.src = document.getElementById("selection").value;
	p.load();
	p.play();
}

if(s.addEventListener) {
	s.addEventListener("keydown", this.keyHandler, false);
}

function keyHandler(e) {
	if(e.keyCode === 13) {
		if(this.value.indexOf("://") != -1) {
			window.location.href = this.value;
		} else {
			if(this.value.search(/^[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gi) != -1) {
				window.location.href = "https://" + this.value;
			} else if(this.value != "") {
				window.location.href = "https://duckduckgo.com/?q=" + this.value;
			}
		}
	}
}

function updateClock() {
  let d8 = new Date(); //setInterval() somehow can't access global vars
	let cHours = (d8.getHours() < 10 ? "0" : "") + d8.getHours();
	let cMinutes = (d8.getMinutes() < 10 ? "0" : "") + d8.getMinutes();
	let cSeconds = (d8.getSeconds() < 10 ? "0" : "") + d8.getSeconds();
	c.innerHTML = "&nbsp;" + cHours + ":" + cMinutes + ":" + cSeconds + "&nbsp;";
}

function setDate() {
  let d8 = new Date();
	let cDay = weekdays[d8.getDay()];
	let cNumDay = d8.getDate();
	let cMonth = months[d8.getMonth()];
	let cYear = d8.getFullYear();
	d.innerHTML = "&nbsp;" + cDay + ", " + cMonth + " " + cNumDay + " " + cYear + "&nbsp;";
}

function updateImage() {
// update image names in dir: ls -v | cat -n | while read n f; do mv -n "$f" "$n.webp"; done
	document.getElementById("image").src = "img/" + Math.floor((Math.random() * 39)+1) + ".webp";
}

updateImage();
setDate();
updateClock();
setInterval(updateClock, 1000);
setInterval(updateImage, 60000);
