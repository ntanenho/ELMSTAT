if (document.getElementsByClassName("ic-DashboardCard").length > 0) {
  var course_names = document.getElementsByClassName("ic-DashboardCard__header-subtitle ellipsis");
  var course_links = document.getElementsByClassName("ic-DashboardCard__link");
  var num_courses = course_names.length;
  var grades = new Map([]);
  var class_avgs = new Map([]);
  var graphics = new Map([]);
  var frame_loads = 0;
  var iframe;

  createTable();
  for (var i = 0; i < num_courses; i++) {
    iframe = document.createElement("iframe");
    iframe.setAttribute("src", course_links[i].href + "/grades");
    iframe.id = "i_frame" + i;
    iframe.height = 0;
    iframe.width = 0;
    iframe.style.border = "none";
    document.body.appendChild(iframe);
  }

  for (var i = 0; i < num_courses; i++) {
    document.getElementById('i_frame' + i).onload = function() {
      var main = this.contentDocument.getElementById('class_avg').innerHTML;
      var percentages = main.match(/(\d|\.)+\%/g);
      var course = this.contentDocument.getElementsByClassName("ellipsible")[1].innerHTML;
      var graphic = this.contentDocument.getElementById('graphic');
      class_avgs.set(course, percentages[0]);
      grades.set(course, percentages[1]);
      graphics.set(course, graphic);
      frame_loads++;
      continueCode();
    };
  }

  function continueCode() {
    if (frame_loads == num_courses) {
      var table = document.getElementById("course_table");
      var flag = -1;
      for (var row of table.rows) {
        if (flag == 0) {
          var name = row.cells[0].innerHTML;
          row.cells[1].innerHTML = grades.get(name);
          row.cells[2].innerHTML = class_avgs.get(name);
          row.cells[3].innerHTML = "";
          row.cells[3].appendChild(graphics.get(name));
          console.log(graphics.get(name));
        }
        flag = 0;
      }
      removeFrames();
    }
  }

  function removeFrames() {
    for (var i = 0; i < num_courses; i++) {
      document.getElementById("i_frame" + i).remove();
    }
  }

  function createTable() {
    var courseTable = document.createElement("table");
    var parentDiv = document.getElementById("content-wrapper");
    var currentDiv = document.getElementById("content");

    courseTable.id = "course_table";
    parentDiv.insertBefore(courseTable, currentDiv.nextSibling);
    var table = document.getElementById("course_table");
    var header = table.createTHead();
    var headRow = header.insertRow(0);
    var headCourse = headRow.insertCell(-1);
    var headGrade = headRow.insertCell(-1);
    var headAvg = headRow.insertCell(-1);
    var headGraphic = headRow.insertCell(-1);
    headCourse.outerHTML = "<th>Course Name</th>";
    headGrade.outerHTML = "<th>Current Grade</th>";
    headAvg.outerHTML = "<th>Class Average</th>";
    headGraphic.outerHTML = "<th>Class Standing</th>";


    for (var name of course_names) {
      var course = table.insertRow(-1)
      var course_name = course.insertCell(-1)
      var class_avg = course.insertCell(-1);
      var grade = course.insertCell(-1);
      var graphic = course.insertCell(-1);
      course_name.innerHTML = name.innerHTML;
      grade.innerHTML = "-";
      class_avg.innerHTML = "-";
      graphic.innerHTML = "-";
    }
  }
}
