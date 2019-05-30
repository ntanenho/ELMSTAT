if (window.location.href == "https://umd.instructure.com/") {
  var course_names = document.getElementsByClassName("ic-DashboardCard__header-subtitle ellipsis");
  var course_links = document.getElementsByClassName("ic-DashboardCard__link");
  var num_courses = course_names.length;
  var grades = new Map([]);
  var class_avgs = new Map([]);
  var graphics = new Map([]);
  var letter_grade = new Map([]);
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
      var letter = this.contentDocument.getElementsByClassName("letter_grade")[0];
      class_avgs.set(course, percentages[0]);
      grades.set(course, percentages[3]);
      graphics.set(course, graphic);
      if (letter != undefined) {
        letter_grade.set(course, " (" + letter.innerHTML + ")");
      } else {
        letter_grade.set(course, "");
      }
      frame_loads++;
      continueCode();
    };
  }

  function continueCode() {
    if (frame_loads == num_courses) {
      var table = document.getElementById("course_table");
      for (var i = 1; i < table.rows.length; i++) {
          var name = course_names[i - 1].innerHTML;
          table.rows[i].cells[1].innerHTML = "<a href = " + course_links[i - 1].href + "/grades>" + grades.get(name) + letter_grade.get(name) + "</a>";
          table.rows[i].cells[2].innerHTML = "<a href = " + course_links[i - 1].href + "/grades>" + class_avgs.get(name) + "</a>";
          table.rows[i].cells[3].innerHTML = "";
          table.rows[i].cells[3].appendChild(graphics.get(name));
      }

      var update = document.getElementById("update_status");
      document.getElementById("loader").remove();
      update.innerHTML = "Table Up to Date";
      update.style.marginLeft = "33px";
      var check = document.createElement("img");
      check.id = "check";
      // images/baseline_check_black_18dp.png made by [Maxim Basinski](https://www.flaticon.com/authors/maxim-basinski) from www.flaticon.com
      check.src = chrome.extension.getURL("images/baseline_check_black_18dp.png");
      update.insertAdjacentElement("afterbegin", check);
      removeFrames();
    }
  }

  function removeFrames() {
    for (var i = 0; i < num_courses; i++) {
      document.getElementById("i_frame" + i).remove();
    }
    storeTable();
  }

  function createTable() {
    var courseTable = document.createElement("table");
    var update = document.createElement("div"), loader = document.createElement("div");
    var parentDiv = document.getElementById("content-wrapper");
    var currentDiv = document.getElementById("content");
    var i = 0;

    courseTable.id = "course_table";
    update.id = "update_status";
    update.innerHTML = "Table Updating";
    loader.id = "loader";
    parentDiv.insertBefore(courseTable, currentDiv.nextSibling);
    var table = document.getElementById("course_table");
    currentDiv = table;
    parentDiv.insertBefore(update, currentDiv.nextSibling);
    currentDiv = document.getElementById("update_status");
    currentDiv.insertAdjacentElement("afterbegin", loader);

    chrome.storage.sync.get(['key'], function(result) {
      table.innerHTML = Object.values(result)[0].val;
    });

    if (table == undefined) {
      var header = table.createTHead();
      var headRow = header.insertRow(0);
      var headCourse = headRow.insertCell(-1);
      var headGrade = headRow.insertCell(-1);
      var headAvg = headRow.insertCell(-1);
      var headGraphic = headRow.insertCell(-1);
      headCourse.outerHTML = "<th>Course Name</th>";
      headGrade.outerHTML = "<th>Current Grade</th>";
      headAvg.outerHTML = "<th>Class Average</th>";
      headGraphic.outerHTML = "<th>Grade Summary</th>";


      for (var name of course_names) {
        var course = table.insertRow(-1)
        var course_name = course.insertCell(-1)
        var class_avg = course.insertCell(-1);
        var grade = course.insertCell(-1);
        var graphic = course.insertCell(-1);
        course_name.innerHTML = "<a href =" + course_links[i] + ">" + name.innerHTML + "</a>";
        grade.innerHTML = "-";
        class_avg.innerHTML = "-";
        graphic.innerHTML = "-";
        i++;
      }
    }
  }

  function storeTable() {
    var table = document.getElementById("course_table");
    var key = 'table_key', table_stored = {'val': table.innerHTML};
    chrome.storage.sync.set({key: table_stored}, function() {
      console.log('Saved', key, table_stored);
    });
  }
}
