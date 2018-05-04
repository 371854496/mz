$(() => {
  $.get("footer.html")
    .then(resData => {
      $("#footer").html(resData);
    })
});