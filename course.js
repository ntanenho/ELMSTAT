if (document.getElementsByClassName("summary").length > 0) {
  var weighted_table = document.getElementsByClassName("summary")[0];
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

  var reg = /Mean:\n\s+\d+(\.\d+)?/g;
  var i, k, class_avg = 0, total_weight = 0;
  var averages = document.getElementById("grades_summary").innerHTML.match(reg);
  var total_points = document.getElementsByClassName("possible points_possible");
  var points_earned = document.getElementsByClassName("grade");
  var contexts = document.getElementsByClassName("context");

  for (k = 0, i = 0; i < averages.length; i++, k++) {
    while (points_earned[k].innerHTML.match(/\d+/g) == null || total_points[k].innerHTML.match(/\d+/g) == "0") {
      k++;
    }
    var avg_match = averages[i].match(/\d+.*/g);
    var point_match = total_points[k].innerHTML.match(/\d+/g);
    var grade = (parseFloat(avg_match, 10) / parseInt(point_match, 10)) * 100;
    groups_graded.set(contexts[k].innerHTML, (groups_graded.get(contexts[k].innerHTML) + grade));
    groups_size.set(contexts[k].innerHTML, (groups_size.get(contexts[k].innerHTML) + 1));
  }

  for (var k of groups_graded.keys()) {
    //console.log(((groups_graded.get(k) / groups_size.get(k)) * group_weights.get(k)));
    groups_graded.set(k, ((groups_graded.get(k) / groups_size.get(k)) * group_weights.get(k)))
  }
  for (var k of groups_graded.keys()) {
    if (!isNaN(groups_graded.get(k))){
      class_avg += groups_graded.get(k);
      total_weight += group_weights.get(k);
    }
  }
  class_avg /= total_weight;
  class_avg = class_avg.toFixed(2);

  var parentDiv = document.getElementsByClassName("student_assignment hard_coded final_grade")[0];
  var user_grade = parentDiv.getElementsByClassName("grade")[0].innerHTML
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

  var classAvgContent = document.createTextNode("Average of the Class: " + class_avg + "%");
  classAvgDiv.appendChild(classAvgContent);
  graphicLeft.style.width = "" + (parseInt(class_avg) + 30) + "px";
  graphicRight.style.width = "" + (100 - parseInt(class_avg) + 10) + "px";
  graphicRight.style.left = "" + (parseInt(class_avg) + 30) + "px";

  gradeBlock.style.left = "" + (parseInt(user_grade) + 30) + "px";
  gradeBlock.title = "Your Grade: " + user_grade;

  parentDiv.insertBefore(mainDiv, currentDiv.nextSibling);
  currentDiv = document.getElementById("main_div");
  currentDiv.insertAdjacentElement("beforeend", classAvgDiv);
  currentDiv = document.getElementById("class_avg");
  currentDiv.insertAdjacentElement("beforeend", graphic);
  currentDiv = document.getElementById("graphic");
  currentDiv.insertAdjacentElement("beforeend", graphicLeft);
  currentDiv.insertAdjacentElement("beforeend", graphicRight);
  currentDiv.insertAdjacentElement("beforeend", gradeBlock);
}
