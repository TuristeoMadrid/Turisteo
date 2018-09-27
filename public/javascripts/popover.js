document.addEventListener('DOMContentLoaded', () => {
  $(function () {
    $(".btn").tooltip({
      show: {
        effect: "slideDown",
        delay: 300
      }
    });
    $(function () {
      function runEffect(id) {
        $(`#${id}1`).show('fade');
      };

      $(".btn").on("mouseover", function (e) {
        runEffect(e.target.id);
      });

      $(".effect").hide();
    });

    $(function() {
      function outFunc(id) {
        $(`#${id}1`).removeAttr("style").fadeOut();
      };

      $(".btn").on("mouseout", function (e) {
        outFunc(e.target.id);
      });
    });

  });
}, false);