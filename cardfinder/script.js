"use strict";

// code is modified from https://greywardens.xyz/tools/region_bbcode/ , thank you :D

function output(e)
{
    const output = document.querySelector('#output');
    output.innerHTML = '';
    const dbidInput = document.querySelector('#dbid').value.split('\n');
    for (let i = 0; i !== dbidInput.length; i++)
        output.innerHTML += `<a href="https://www.nationstates.net/page=deck/card=${dbidInput[i]}"><font color="#b0ffff">https://www.nationstates.net/page=deck/card=${dbidInput[i]}</font></a><br>`;
}

document.querySelector('#convert').addEventListener('click', output);