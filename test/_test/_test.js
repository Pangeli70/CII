function rawJavascript(templateData) {

  function swith (templateData) {
    const r = [];
    r.push(`<!DOCTYPE html>
  <html lang="en">
  
    <head>
      <title>
        `);
    r.push(site.name);
    r.push(`:`);
    r.push(page.title);
    r.push(`</title>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  
      <meta name="author" content="APG Angeli Paolo Giusto" />
      <meta name="generator" content="Deno+Drash" />
      <meta name="keywords" content="Deno, Drash, APG, Angeli Paolo Giusto, Paolo Angeli" />
      <meta name="application-name" content="`);
    r.push(site.name);
    r.push(`" />
  
      <!-- Favicon -->
      <link rel="shortcut icon" type="image/x-icon"
            href="https://apg-cdn.deno.dev/public/img/ico/Apg-favicon-2022.ico" />
  
      <link rel="stylesheet"
            href="https://unpkg.com/@picocss/pico@latest/css/pico.classless.min.css" />
      <link rel="stylesheet" href="https://apg-cdn.deno.dev/public/css/Apg-pico-custom.css" />
    </head>
  
    <body>
      <header style="padding: 0">
        <section id="title" style="padding: 0; margin: 0">
          <table>
            <tr>
              <td style="width:4rem">
                <a href="/">
                  <img src="https://apg-cdn.deno.dev/public/img/png/APG-logo-2022-128px.png"
                       style="min-width:3rem; min-height:3rem; " />
                </a>
              </td>
              <td>
                <h2 style="margin-bottom: 0px">`);
    r.push(site.name);
    r.push(`<br>
                  <span style="font-size: 50&">`);
    r.push(site.title);
    r.push(`</span>
                </h2>
              </td>
              <td>
                <h1 class="apg-page-title">`);
    r.push(page.title);
    r.push(`</h1>`);
    const args = [page.menu]
    r.push(`<pre hidden>
    
  </pre>`);
    if (page.menu != undefined) {
      r.push(`<p style="text-align: center;">`);
      for (const link of page.menu) {
        r.push(`<a href="`);
        r.push(link.href);
        r.push(`" style="margin: 0 0 0 1rem;" role="button">`);
        r.push(link.caption);
        r.push(`</a>`);
      }
      r.push(`</p>`);
    }
    r.push(`</td>
            </tr>
          </table>
        </section>`);
    if (page.toolbar) {
      r.push(`<section id="bar" style="text-align: center;">`);
      r.push(page.toolbar);
      r.push(`<hr>
        </section>`);
    }
    r.push(`</header>
  
      <main style="padding: 0; display: flex; justify-content: center;">
        
  
  <section>`);
    if (testLogger.hasErrors) {
      r.push(`<div id="pico_logger">`);
      if (testLogger.hasErrors) {
        r.push(`<p style = "font-family: 'Lucida Console', 'Courier New', Courier, monospace; font-size: smaller; text-align: left;">`);
        let newLine = true; let hrtDelta = 0; let hrt = "000.00"; for (let i = 0; i != testLogger.events.length - 1; i++) {
          const event = testLogger.events[i]; if (i != 0) { hrtDelta = event.hrt - testLogger.events[i - 1].hrt; hrt = hrtDelta.toFixed(2).padStart(6, '0'); } let payloadData = ""; if (event.result.payload && event.result.payload.data) { payloadData = `${event.result.payload.data}`; if (payloadData.includes("{")) { newLine = true } else { newLine = false; } } const padding = " ".repeat(event.depth * 2); const currMethod = newLine ? `${event.className}.${event.method}` : ""; const index = i.toString().padStart(4, '0'); const currRow = `${index} ${hrt}${padding}${currMethod} ${payloadData}`; r.push(currRow); if (event.result.error != 0) { r.push(`<br><span style="color: red;">`); let message = event.result.codedMessage.template ? event.result.codedMessage.template : JSON.stringify(event.result.codedMessage); console.log(event.result.codedMessage); if (event.result.codedMessage.params && event.result.codedMessage.params.length > 0) { const params = event.result.codedMessage.params; for (let i = 0; i != params.length; i++) { const param = `${params[i]}`; const placeholder = `&${i + 1}`; message = message.replaceAll(placeholder, param); } } r.push(`${padding}${message}`); if (event.result.payload && event.result.payload.data && event.result.payload.data.errors) { r.push(`<br>`); const dataErrors = JSON.stringify(event.result.payload.data.errors); r.push(`${padding}${dataErrors}`); } r.push(`</span>`); }

          if (event.result.message) { r.push(`<span style:"color:blue">  ${event.result.message}</span>`); }
          r.push(`<br>`);
        }
        r.push(`</p>`);
      }
      r.push(`</div>
          <p>
              <code>`);
      JSON.stringify(testLogger, undefined, '  ').replaceAll('\n', '<br>').replaceAll(' ', ' ')
      r.push(`</code>
          </p>`);
    } else {
      r.push(`<script src="https://cdn.jsdelivr.net/npm/svg-pan-zoom@3.6.1/dist/svg-pan-zoom.min.js"></script>
  
  <div id="inline-svg"
           style="background-color: #888888; width: 90vw; display:flex; justify-content: center;">`);
      r.push(svgContent);
      r.push(`</div>
  
  <script>
    document.getElementById('APG_SVG_DOC').addEventListener('load', function () {
      // Will get called after embed element was loaded
      svgPanZoom(
        document.getElementById('APG_SVG_DOC'),
        {
          panEnabled: true,
          controlIconsEnabled: true,
          zoomEnabled: true,
          dblClickZoomEnabled: true,
          mouseWheelZoomEnabled: false,
          preventMouseEventsDefault: true,
          zoomScaleSensitivity: 0.25,
          minZoom: 0.1,
          maxZoom: 20,
          fit: true,
          contain: true,
          center: true,
          refreshRate: 'auto'
        }
      );
    })
  </script>`);
    }
    r.push(`<div id="Cii_Instructions">
      <p style="font-family: 'Lucida console', 'Courier New', Courier, monospace;">`);
    for (const instruction of instructions) {
      const json = JSON.stringify(instruction); const brJson = json + "<br>\n"; r.push(brJson);
      r.push(`</p>
  </div>
  </section>
  
  <script>
  
      const GUI_MENU_ID = 'GUI_MENU';
      const LAYER_BOARD_ID = 'LAYER_BOARD';
      let currentBoard = "";
  
      function SwitchVisibility(aactivator, atarget) {
  
          var show = aactivator.getAttribute('show');
          if (show == "true") {
              aactivator.setAttribute('fill', 'white');
              aactivator.setAttribute('show', 'false');
              atarget.style.display = "none";
          }
          else {
              aactivator.setAttribute('fill', 'green');
              aactivator.setAttribute('show', 'true');
              atarget.style.display = "block";
          }
      }
  
      function GuiButtonOnClick(event) {
  
          const button = event.target;
  
          const board = (currentBoard == "") ?
              document.getElementById(GUI_MENU_ID) :
              document.getElementById(currentBoard);
  
          SwitchVisibility(button, board);
  
      }
  
      function LayerBoardMenuOnClick(event) {
  
          const button = event.target;
          const guiMenu = document.getElementById(GUI_MENU_ID);
          guiMenu.style.display = "none";
          const layerBoard = document.getElementById(LAYER_BOARD_ID);
          layerBoard.style.display = "block";
          currentBoard = LAYER_BOARD_ID;
      }
  
      function LayerBoardButtonOnClick(event) {
          const button = event.target;
          const buttonID = button.getAttribute('id');
          const layer = buttonID.split("_")[2];
  
          const layerGroup = document.getElementById(layer)
  
          SwitchVisibility(button, layerGroup);
  
          // var show = event.target.getAttribute('show');
          // if (show == "true") {
          //     event.target.setAttribute('show', 'false');
          //     layerGroup.style.display = "none";
          //     event.target.setAttribute('fill', 'white');
          // }
          // else {
          //     event.target.setAttribute('show', 'true');
          //     layerGroup.style.display = "block";
          //     event.target.setAttribute('fill', 'green');
          // }
  
          // alert('layer:' + layer + ' show:' + show + " layerGroup:" + layerGroup);
      }
  
  
  </script>
      </main>
  
      <footer style="padding: 0">
        <hr />
        <section id="footer" style="padding: 0; margin: 2em, 0, 0, 0">
          <p style="text-align: center; font-size: 0.5em">
            <em>
              © 2017-2022 APG: free man angeli paolo giusto.<br />
              Made with ❤ using
              <a href="https://deno.land/" target="_blank">Deno</a>,
              <a href="https://drash.land/" target="_blank"> Drash</a>,
              <a href="https://www.picocss.com/" target="_blank">Pico Css</a><br />
              SSR HTML made with
              <a href="https://apg-tng.deno.dev/" target="_blank">Apg-TNG</a><br />
              Page released:`);
      r.push(page.released);
      r.push(`</em>
          </p>
        </section>
      </footer>
    </body>
  
  </html>`);
      return r.join("");
    }
  }
}
