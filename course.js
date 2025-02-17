if (window.location.href.match(/https:\/\/umd\.instructure\.com\/courses\/.*\/grades/g)
    || window.location.href.match(/https:\/\/myelms\.umd\.edu\/courses\/.*\/grades/g)) {

  document.onreadystatechange = function () {
    if (document.readyState === 'complete') {
      window.addEventListener('resize', resizeWindow);
      var graphicLeftSize = 0, graphicRightSize = 0, graphicRightLeft = 0, gradeBlockLeft = 0;
      startExtension();
      resizeWindow();
    }
  }

  function startExtension() {
    var points_earned = document.getElementsByClassName("grade");
    if (points_earned != undefined) {
      var user_grade = points_earned[points_earned.length - 1].innerHTML.match(/[-+]?([0-9]*\.[0-9]+|[0-9]+)/g)
      if (!user_grade) {
        user_grade = -1;
      }
      if (user_grade.length == 2) {
        user_grade = ((user_grade[0] / user_grade[1]) * 100).toFixed(2);
      }
      var points_possible = document.getElementsByClassName("possible points_possible");
      var check_avgs_exist = document.getElementsByClassName("ic-Table ic-Table--condensed score_details_table")[0];
      if (user_grade != -1 && points_possible != undefined && check_avgs_exist != undefined) {

        var weighted_table = document.getElementsByClassName("summary")[0];
        if (weighted_table != undefined) {
          var weighted_rows = weighted_table.rows;
          var weighted_rows_len = weighted_rows.length;
          var group_weights = new Map([]);
          var groups_graded = new Map([]);
          var groups_size = new Map([]);

          for (var i = 0; i < weighted_rows_len; i++) {
            var weighted_cells = weighted_rows[i].cells;
            if (weighted_cells[1].innerHTML.match(/\d+\%/) != null && weighted_cells[0].innerHTML.match(/(\s|\S)+/)[0] != "Total") {
              group_weights.set(weighted_cells[0].innerHTML, weighted_cells[1].innerHTML.match(/\d+/)[0] / 100);
              groups_graded.set(weighted_cells[0].innerHTML, 0);
              groups_size.set(weighted_cells[0].innerHTML, 0);
            }
          }
        }

        var reg = /Mean:\n\s*[-+]?([0-9]*\.[0-9]+|[0-9]+)/g;
        var class_avg = 0, total_weight = 0, sum = 0;
        var averages = document.getElementById("grades_summary").innerHTML.match(reg);
        var show_more = document.getElementsByClassName("toggle_score_details_link tooltip");
        var contexts = document.getElementsByClassName("context");
        if (averages != undefined && contexts != undefined) {
          for (k = 0, i = 0; i < averages.length && k < show_more.length; i++, k++) {
            while (k < show_more.length &&
             (points_earned[k].innerHTML.match(/Incomplete|Complete|[-+]?([0-9]*\.[0-9]+|[0-9]+)/g) == null || show_more[k].style.visibility == "hidden")) {
              k++;
            }
            if (k < show_more.length) {
              var avg_match = averages[i].match(/[-+]?([0-9]*\.[0-9]+|[0-9]+)/g);
              var point_match = points_possible[k].innerHTML.match(/[-+]?([0-9]*\.[0-9]+|[0-9]+)/g);
              var grade = (parseFloat(avg_match, 10) / parseInt(point_match, 10)) * 100;
              if (weighted_table != undefined) {
                groups_graded.set(contexts[k].innerHTML, (groups_graded.get(contexts[k].innerHTML) + grade));
                groups_size.set(contexts[k].innerHTML, (groups_size.get(contexts[k].innerHTML) + 1));
              } else {
                sum += grade;
              }
            }
          }

          if (weighted_table != undefined) {
            for (var k of groups_graded.keys()) {
              groups_graded.set(k, ((groups_graded.get(k) / groups_size.get(k)) * group_weights.get(k)))
            }
            for (var k of groups_graded.keys()) {
              if (!isNaN(groups_graded.get(k))){
                class_avg += groups_graded.get(k);
                total_weight += group_weights.get(k);
              }
            }
            class_avg /= total_weight;
          } else {
            class_avg = (sum / averages.length);
          }
          class_avg = class_avg.toFixed(2);
      }

        var mainDiv = document.createElement("div");
        mainDiv.id = 'main_div';

        var currentDiv = document.getElementById("umd-howtouse");
        var classAvgDiv = document.createElement("div");
        var graphicLeft = document.createElement("div");
        var graphicRight = document.createElement("div");
        var graphic = document.createElement("div");
        var gradeBlock = document.createElement("div");
        parentDiv = document.getElementById("right-side-wrapper");
        classAvgDiv.id = 'class_avg';
        graphicLeft.id = 'graphic_left';
        graphicLeft.title = "Mean: " + class_avg + "%";
        graphicRight.id = 'graphic_right';
        graphicRight.title = "Mean: " + class_avg + "%";
        graphic.id = 'graphic';
        gradeBlock.id = 'grade_block';

        if (user_grade != -1 && class_avg != 0 && !isNaN(class_avg)) {
          var classAvgContent = document.createTextNode("Average of the Class: " + class_avg + "%");
          classAvgDiv.appendChild(classAvgContent);
          classAvgDiv.style.textAlign = "center";
          if (user_grade <= 100 && class_avg <= 100) {
            graphicRight.style.width = "" + (100 - parseInt(class_avg) + 10) + "px";
            graphicRightSize = (100 - parseInt(class_avg) + 10);
            graphicLeft.style.width = "" + (parseInt(class_avg) + 30) + "px";
            graphicLeftSize = (parseInt(class_avg) + 30);
            graphicRight.style.left = "" + (parseInt(class_avg) + 30) + "px";
            graphicRightLeft = (parseInt(class_avg) + 30);
            gradeBlock.style.left = "" + (parseInt(user_grade) + 30) + "px";
            gradeBlockLeft = (parseInt(user_grade) + 30);
          } else {
            graphicRight.style.width = "" + (user_grade - parseInt(class_avg) + 10) + "px";
            graphicRightSize = (user_grade - parseInt(class_avg) + 10);
            graphicLeft.style.width = "" + ((parseInt(class_avg) + 120) / 2) + "px";
            graphicLeftSize = (parseInt(class_avg) + 120) / 2;
            graphicRight.style.left = "" + ((parseInt(class_avg) + 120) / 2) + "px";
            graphicRightLeft = (parseInt(class_avg) + 120) / 2;
            gradeBlock.style.left = "" + ((parseInt(user_grade) + 120) / 2) + "px";
            gradeBlockLeft = (parseInt(user_grade) + 120) / 2;
          }
          gradeBlock.title = "Your Grade: " + user_grade + "%";

          parentDiv.insertBefore(mainDiv, currentDiv.nextSibling);
          currentDiv = document.getElementById("main_div");
          currentDiv.insertAdjacentElement("beforeend", classAvgDiv);
          currentDiv = document.getElementById("class_avg");
          currentDiv.insertAdjacentElement("beforeend", graphic);
          currentDiv = document.getElementById("graphic");
          currentDiv.insertAdjacentElement("beforeend", graphicLeft);
          currentDiv.insertAdjacentElement("beforeend", graphicRight);
          currentDiv.insertAdjacentElement("beforeend", gradeBlock);

          var button = document.getElementsByClassName("al-trigger Button Button--block")[0];
          button.addEventListener("click", function() {
            var list = document.getElementsByClassName("al-options ui-menu ui-widget ui-widget-content ui-corner-all ui-popup ui-kyle-menu use-css-transitions-for-show-hide")[0];
            if (list.style.display != "none") {
              var mainDiv = document.getElementById("main_div");
              mainDiv.style.marginTop = "155px";
            }
            document.onmousedown = function() {
              var mainDiv = document.getElementById("main_div");
              mainDiv.style.marginTop = "20px";
            }
          });
        }
      }
    }
  }

  function resizeWindow() {
    var screen_size = window.matchMedia("(max-width: 1139px)");
    var graphic = document.getElementById("graphic");
    var graphicLeft = document.getElementById("graphic_left");
    var graphicRight = document.getElementById("graphic_right");
    var gradeBlock = document.getElementById("grade_block");
    if (graphic != null && graphicLeft != null && graphicRight != null && gradeBlock != null) {
      if (screen_size.matches && window.self == window.top) {
        if (window.matchMedia("(max-width: 568px)").matches) {
          graphic.style.left = (window.innerWidth / 8)  + "px";
        } else {
          graphic.style.left = (window.innerWidth / 20)  + "px";
        }
        graphicLeft.style.width = (window.innerWidth / 4)  + "px";
        graphicRight.style.width = (window.innerWidth / 5)  + "px";
        graphicRight.style.left = (window.innerWidth / 4) + "px";
        gradeBlock.style.left = (window.innerWidth / 4) + "px";
      } else {
        graphic.style.left = "10px";
        graphicLeft.style.width = graphicLeftSize + "px";
        graphicRight.style.width = graphicRightSize + "px";
        graphicRight.style.left = graphicRightLeft + "px";
        gradeBlock.style.left = gradeBlockLeft + "px";
      }
    }
  }
}
