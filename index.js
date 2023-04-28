const fs = require('fs');
const cheerio = require('cheerio');
const css = require('css');

const inputDir = "jsp";
const outputDir = "output";
fs.mkdirSync(outputDir);

const convertFile = (filename) => {
  const html = fs.readFileSync(inputDir + "/" + filename, 'utf-8');
  const $ = cheerio.load(html);

  let cssContent = "";
  const selectors = [];
  const styles = [];
  // Extract style attributes from all tags
  $('*').each(function () {
    let id = $(this).attr('id');
    const name = $(this).attr('name');
    const style = $(this).attr('style');
    if (style) {
      if (!id) {
        id = name;
        $(this).attr('id', id);
      }
      selectors.push(id);
      styles.push(style);
      $(this).removeAttr('style');
    }
  });

  const uniqueStyles = [...new Set(styles)];
  for (const uniqueStyle of uniqueStyles) {
    const indexes = [];
    for (let i = 0; i < styles.length; i++) {
      if (uniqueStyle === styles[i]) {
        indexes.push(`#${selectors[i]}`);
      }
    }
    const cssSelector = `${indexes.join(', ')} { ${uniqueStyle} }\n`;
    cssContent += cssSelector;
  }

  let jsCode = "";
  // Extract event attributes from all tags

  const extractEvent = (eventName) => {
    $(`*[${eventName}]`).each(function () {
      let id = $(this).attr('id');
      if (!id) {
        const name = $(this).attr('name');
        id = name;
        $(this).attr('id', id);
      }
      const code = $(this).attr(eventName);
      if (id && code) {
        jsCode = jsCode + `document.getElementById('${id}').addEventListener('${eventName.slice(2)}', (e) => {
        ${code.replace(/this/g, "e.target")}
      });\n`;

        $(this).removeAttr(eventName);
      }
    });
  }

  const events = [
    "onclick",
    "onchange",
    "onblur",
    "onkeyup",
    "onkeydown",
    "onkeypress",
    "onmouseover",
    "onmouseout",
    "onsubmit",
    "onload",
  ];

  events.forEach(eventName => extractEvent(eventName));


  $('body').append(`<script>${jsCode}</script>`);
  const parsedStyles = css.parse(cssContent);
  fs.writeFileSync(`${outputDir}/${filename.slice(0, -3)}css`, css.stringify(parsedStyles));

  // Save the modified HTML file
  const htmlContent = $.html();
  var decodedString = htmlContent.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
  fs.writeFileSync(outputDir + "/" + filename, decodedString);
}

const filenames = fs.readdirSync('./jsp/');
console.log(filenames);

filenames.forEach(filename => convertFile(filename));