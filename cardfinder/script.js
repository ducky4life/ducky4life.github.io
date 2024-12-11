"use strict";

// code is modified from https://greywardens.xyz/tools/region_bbcode/ , thank you :D

function output(e)
{
    const output = document.querySelector('#output');
    output.innerHTML = '';
    const dbidInput = document.querySelector('#dbid').value.split('\n');
    for (let i = 0; i !== dbidInput.length; i++)
        output.innerHTML += `<a href="https://www.nationstates.net/page=deck/card=${dbidInput[i]}" target="_blank" class="cardlink">https://www.nationstates.net/page=deck/card=${dbidInput[i]}</a><br>`;
    document.querySelectorAll(".cardlink").forEach((link) => {
        link.addEventListener("click", async (e) => {
          e.preventDefault();
          window.open(link.href, "_blank");
        });
      });
}

document.querySelector('#convert').addEventListener('click', output);