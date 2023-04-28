<html><head>
  </head>
  <body>
    <%if (true) {%>
      <div id="div1"></div>
      <div id="div2"></div>
      <div name="div3" id="div3"></div>
      <input type="<%= 'text'%>" value="<%= 5%>">
    <%}%>
  

<script>
  function alert(){
    console.log(123)
  }

  function fn() {

  }

  document.getElementById("id").addEventListener('keypress', function(e) {
    if (!fn(e.target)){
      e.preventDefault();
    }
  })

</script><script>document.getElementById('div1').addEventListener('click', (e) => {
        alert(e.target); fn(true);
      });
document.getElementById('div2').addEventListener('blur', (e) => {
        alert(e.target); fn(12);
      });
document.getElementById('div3').addEventListener('keypress', (e) => {
        fn(e.target)
      });
</script></body></html>