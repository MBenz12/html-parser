<html>
  <head>
  </head>
  <body>
    <%if (true) {%>
      <div id="div1" style="width: 40px; height: 40px; border-radius: 10px;" onClick="alert(this); fn(true);"></div>
      <div id="div2" style="width: 40px; height: 40px; border-radius: 10px;" onBlur="alert(this); fn(12);"></div>
      <div name="div3" style="width: 40px; height: 40px; border-radius: 10px;" onkeypress="fn(this)"></div>
      <input type="<%= 'text'%>" value="<%= 5%>" />
    <%}%>
  </body>
</html>
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

</script>