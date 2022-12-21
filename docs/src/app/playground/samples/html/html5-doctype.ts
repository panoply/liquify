export default (
/* html */`
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">

    <title>My page title</title>
    <link href="https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300|Sonsie+One" rel="stylesheet" type="text/css">
    <link rel="stylesheet" href="style.css">

    <!-- the below three lines are a fix to get HTML5 semantic elements working in old versions of Internet Explorer-->
    <!--[if lt IE 9]>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.3/html5shiv.js"></script>
    <![endif]-->

    <style>
      html {
        font-family: sans-serif;
      }

      form {
        background: #eee;
        border-radius: 20px;
        box-shadow: 1px 1px 1px black;
        padding: 20px;
        width: 330px;
      }

      label {
        width: 160px;
        float: left;
        text-align: right;
        padding: 4px;
        margin-bottom: 20px;
      }

      input {
        width: 130px;
        float: right;
      }

      label, input {
        font-size: 1em;
        line-height: 1.5;
      }

      input[type="checkbox"] {
        height: 24px;
      }

      div {
        clear: both;
      }

      .errors {
        background: yellow;
        border-radius: 20px;
        box-shadow: 1px 1px 1px black;
        padding: 20px;
        width: 300px;
        position: absolute;
        left: 390px;
      }

      .hidden-alert {
        position: absolute;
        left: -100%;
      }
    </style>
  </head>

  <body>
    <!-- Here is our main header that is used across all the pages of our website -->

    <header>
      <h1>Header</h1>
    </header>

    <nav>
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">Our team</a></li>
        <li><a href="#">Projects</a></li>
        <li><a href="#">Contact</a></li>
      </ul>

      <!-- A Search form is another common non-linear way to navigate through a website. -->

      <form>
        <input type="search" name="q" placeholder="Search query">
        <input type="submit" value="Go!">
      </form>
    </nav>

    <!-- Here is our page's main content -->
    <main>

      <!-- It contains an article -->
      <article>
        <h2>Article heading</h2>

        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Donec a diam lectus. Set sit amet ipsum mauris. Maecenas congue ligula as quam viverra nec consectetur ant hendrerit. Donec et mollis dolor. Praesent et diam eget libero egestas mattis sit amet vitae augue. Nam tincidunt congue enim, ut porta lorem lacinia consectetur.</p>

        <h3>subsection</h3>

        <p>Donec ut librero sed accu vehicula ultricies a non tortor. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aenean ut gravida lorem. Ut turpis felis, pulvinar a semper sed, adipiscing id dolor.</p>

        <p>Pelientesque auctor nisi id magna consequat sagittis. Curabitur dapibus, enim sit amet elit pharetra tincidunt feugiat nist imperdiet. Ut convallis libero in urna ultrices accumsan. Donec sed odio eros.</p>
      </article>

      <section>
        <h1>Form validation example</h1>

        <div class="errors" role="alert" aria-relevant="all">
          <ul>
          </ul>
        </div>

        <p>Fields marked with an asterisk (*) are required.</p>

        <form>
          <div>
            <label for="name">Enter your name*:</label>
            <input type="text" name="name" id="name" aria-required="true">
          </div>
          <div>
            <label for="age">Enter your age*:</label>
            <input type="number" name="age" id="age" placeholder="Enter 1 to 150" aria-required="true">
          </div>
          <div>
            <label for="musician">Musician:</label>
            <input type="checkbox" name="musician" id="musician">
          </div>
          <div>
            <label for="instruments">Instruments played*:</label>
            <input type="text" name="instruments" id="instruments" aria-required="true">
          </div>
          <div>
            <input type="submit">
          </div>
          <div></div>
        </form>

        <p class="hidden-alert" aria-live="assertive"></p>

      </section>

      <!-- the aside content can also be nested within the main content -->
      <aside>
        <h2>Related</h2>

        <ul>
          <li><a href="#">Oh I do like to be beside the seaside</a></li>
          <li><a href="#">Oh I do like to be beside the sea</a></li>
          <li><a href="#">Although in the North of England</a></li>
          <li><a href="#">It never stops raining</a></li>
          <li><a href="#">Oh well...</a></li>
        </ul>
      </aside>

      <section>
        <h2>ARIA div buttons</h2>
        <div data-message="This is from the first button" tabindex="0" role="button">Click me!</div>
        <div data-message="This is from the second button" tabindex="0" role="button">Click me too!</div>
        <div data-message="This is from the third button" tabindex="0" role="button">And me!</div>
      </section>

    </main>

    <!-- And here is our main footer that is used across all the pages of our website -->

    <footer>
      <p>©Copyright 2050 by nobody. All rights reversed.</p>
    </footer>

    <script>
      const buttons = document.querySelectorAll('div');

      for(let i = 0; i < buttons.length; i++) {
        addHandler(buttons[i]);
      }

      function addHandler(button) {
        button.onclick = function(e) {
          let message = e.target.getAttribute('data-message');
          alert(message);
        }
      }

      document.onkeydown = function(e) {
        if(e.keyCode === 13) { // The Enter/Return key
          document.activeElement.onclick(e);
        }
      };
    </script>

  </body>
</html>
`);
