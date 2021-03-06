"use strict";

//Variable vor Stopwatch

const ftt = {}

ftt.init = 0;
ftt.startDate = undefined;
ftt.clocktimer = undefined;

window.onload = getThisYear;

//Function for get this year
function getThisYear() {
    let year = new Date();
    thisYear.innerHTML = year.getFullYear();
}

//Function for create string
function createString() {
    let str = createdStringForm.symbols.value;
    let ss = createdStringForm.symbols.value;
    let x = createdStringForm.lengthStr.value;
    while (str.length < x) {
        str = str + ss;
    }
    if (str.length > x) {
        str = str.slice(0, x);
    }
    createdStringForm.result.value = str;
}

//Function for calculate string length
function lengthString() {
    countLengthForm.resultLength.value = countLengthForm.originalString.value.length;
}

//Block functions for Stopwatch
function trim(string) {
    return string.replace(/\s+/g, " ").replace(/(^\s*)|(\s*)$/g, '');
}

function clearFields() {
    ftt.init = 0;
    clearTimeout(ftt.clocktimer);
    document.clockForm.clock.value = '00:00:00.00';
    document.clockForm.labelStop.value = '';
}

function clearAll() {
    clearFields();
    document.getElementById('noteStop').innerHTML = '';
}

function startTime() {
    let thisDate = new Date();
    let t = thisDate.getTime() - ftt.startDate.getTime();
    let ms = t % 1000;
    t -= ms;
    ms = Math.floor(ms / 10);
    t = Math.floor(t / 1000);
    let s = t % 60;
    t -= s;
    t = Math.floor(t / 60);
    let m = t % 60;
    t -= m;
    t = Math.floor(t / 60);
    let h = t % 60;
    if (h < 10) h = '0' + h;
    if (m < 10) m = '0' + m;
    if (s < 10) s = '0' + s;
    if (ms < 10) ms = '0' + ms;
    if (ftt.init == 1) document.clockForm.clock.value = h + ':' + m + ':' + s + '.' + ms;
    ftt.clocktimer = setTimeout("startTime()", 10);
}

function findTime() {
    if (ftt.init == 0) {
        ftt.startDate = new Date();
        startTime();
        ftt.init = 1;
    } else {
        let str = trim(document.clockForm.labelStop.value);
        document.getElementById('noteStop').innerHTML = (str == '' ? '' : str + ': ') +
            document.clockForm.clock.value + '<br>' + document.getElementById('noteStop').innerHTML;
        clearFields();
    }
}

//Block function for calculator
function inspectionKey(e) {
    if (e.keyCode == 13 || ((e.keyCode == 187) && (!e.shiftKey))) {
        calcme(calc.input.value);
        return false;
    }
    if (e.keyCode === 27) {
        calc.input.value = '';
        return false;
    }
}

function prepareCalcInput(calcInput) {
    const comaToDotRegex = /\,+/g;
    const delLeadingZeroesRegex = /([^.\d]|^)(0+)(\d)/g;
    let inputWithoutComa = calcInput.replace(comaToDotRegex, '.');
    let preparedInput = inputWithoutComa.replace(delLeadingZeroesRegex, '$1$3');
    return preparedInput;
}

function delChar(calcInput) {
    let position = calc.input.selectionStart;
    var newInput = calcInput.substring(0, position - 1) + calcInput.substring(position, calcInput.length);
    calc.input.value = newInput;
}

//Attention!!! Not secure function!
function calcme(clc) {
    try {
        let preparedInput = prepareCalcInput(clc);
        let result = eval(preparedInput);
        if (result == Infinity || result == -Infinity) {
            throw "Calculation error";
        }
        if (result || result === 0) {
            calc.input.value = result;
        }
    } catch (e) {
        console.log(e);
        calc.input.value = 'Sample not calculated!';
    };
}