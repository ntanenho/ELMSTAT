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
  var select_credits = "<select class=Credits name=Credits><option value= selected></option><option value=0>0</option><option value=1>1</option><option value=2>2</option>" +
  "<option value=3>3</option><option value=4>4</option><option value=5>5</option><option value=6>6</option></select>";
  var select_0 = "<select class=Credits name=Credits><option value=></option><option value=0 selected>0</option><option value=1>1</option><option value=2>2</option>" +
  "<option value=3>3</option><option value=4>4</option><option value=5>5</option><option value=6>6</option></select>";
  var select_1 = "<select class=Credits name=Credits><option value=></option><option value=0>0</option><option value=1 selected>1</option><option value=2>2</option>" +
  "<option value=3>3</option><option value=4>4</option><option value=5>5</option><option value=6>6</option></select>";
  var select_2 = "<select class=Credits name=Credits><option value=></option><option value=0>0</option><option value=1>1</option><option value=2 selected>2</option>" +
  "<option value=3>3</option><option value=4>4</option><option value=5>5</option><option value=6>6</option></select>";
  var select_3 = "<select class=Credits name=Credits><option value=></option><option value=0>0</option><option value=1>1</option><option value=2>2</option>" +
  "<option value=3 selected>3</option><option value=4>4</option><option value=5>5</option><option value=6>6</option></select>";
  var select_4 = "<select class=Credits name=Credits><option value=></option><option value=0>0</option><option value=1>1</option><option value=2>2</option>" +
  "<option value=3>3</option><option value=4 selected>4</option><option value=5>5</option><option value=6>6</option></select>";
  var select_5 = "<select class=Credits name=Credits><option value=></option><option value=0>0</option><option value=1>1</option><option value=2>2</option>" +
  "<option value=3>3</option><option value=4>4</option><option value=5 selected>5</option><option value=6>6</option></select>";
  var select_6 = "<select class=Credits name=Credits><option value=></option><option value=0>0</option><option value=1>1</option><option value=2>2</option>" +
  "<option value=3>3</option><option value=4>4</option><option value=5>5</option><option value=6 selected>6</option></select>";


  var select_start = "<select class=Grade name=Grade><option value= selected></option><option value=A+>A+</option><option value=4.0>A</option><option value=3.7>A-</option>" +
  "<option value=3.3>B+</option><option value=3.0>B</option><option value=2.7>B-</option><option value=2.3>C+</option><option value=2.0>C</option><option value=1.7>C-</option><option value=1.3>D+</option>" +
  "<option value=1.0>D</option><option value=0.7>D-</option><option value=0.0>F</option></select>";
  var select_Aplus = "<select class=Grade name=Grade><option value=empty></option><option value=A+ selected>A+</option><option value=4.0>A</option><option value=3.7>A-</option>" +
  "<option value=3.3>B+</option><option value=3.0>B</option><option value=2.7>B-</option><option value=2.3>C+</option><option value=2.0>C</option><option value=1.7>C-</option><option value=1.3>D+</option>" +
  "<option value=1.0>D</option><option value=0.7>D-</option><option value=0.0>F</option></select>";
  var select_A = "<select class=Grade name=Grade><option value=empty></option><option value=A+>A+</option><option value=4.0 selected>A</option><option value=3.7>A-</option>" +
  "<option value=3.3>B+</option><option value=3.0>B</option><option value=2.7>B-</option><option value=2.3>C+</option><option value=2.0>C</option><option value=1.7>C-</option><option value=1.3>D+</option>" +
  "<option value=1.0>D</option><option value=0.7>D-</option><option value=0.0>F</option></select>";
  var select_Aminus = "<select class=Grade name=Grade><option value=empty></option><option value=A+>A+</option><option value=4.0>A</option><option value=3.7 selected>A-</option>" +
  "<option value=3.3>B+</option><option value=3.0>B</option><option value=2.7>B-</option><option value=2.3>C+</option><option value=2.0>C</option><option value=1.7>C-</option><option value=1.3>D+</option>" +
  "<option value=1.0>D</option><option value=0.7>D-</option><option value=0.0>F</option></select>";
  var select_Bplus = "<select class=Grade name=Grade><option value=empty></option><option value=A+>A+</option><option value=4.0>A</option><option value=3.7>A-</option>" +
  "<option value=3.3 selected>B+</option><option value=3.0>B</option><option value=2.7>B-</option><option value=2.3>C+</option><option value=2.0>C</option><option value=1.7>C-</option><option value=1.3>D+</option>" +
  "<option value=1.0>D</option><option value=0.7>D-</option><option value=0.0>F</option></select>";
  var select_B = "<select class=Grade name=Grade><option value=empty></option><option value=A+>A+</option><option value=4.0>A</option><option value=3.7>A-</option>" +
  "<option value=3.3>B+</option><option value=3.0 selected>B</option><option value=2.7>B-</option><option value=2.3>C+</option><option value=2.0>C</option><option value=1.7>C-</option><option value=1.3>D+</option>" +
  "<option value=1.0>D</option><option value=0.7>D-</option><option value=0.0>F</option></select>";
  var select_Bminus = "<select class=Grade name=Grade><option value=empty></option><option value=A+>A+</option><option value=4.0>A</option><option value=3.7>A-</option>" +
  "<option value=3.3>B+</option><option value=3.0>B</option><option value=2.7 selected>B-</option><option value=2.3>C+</option><option value=2.0>C</option><option value=1.7>C-</option><option value=1.3>D+</option>" +
  "<option value=1.0>D</option><option value=0.7>D-</option><option value=0.0>F</option></select>";
  var select_Cplus = "<select class=Grade name=Grade><option value=empty></option><option value=A+>A+</option><option value=4.0>A</option><option value=3.7>A-</option>" +
  "<option value=3.3>B+</option><option value=3.0>B</option><option value=2.7>B-</option><option value=2.3 selected>C+</option><option value=2.0>C</option><option value=1.7>C-</option><option value=1.3>D+</option>" +
  "<option value=1.0>D</option><option value=0.7>D-</option><option value=0.0>F</option></select>";
  var select_C = "<select class=Grade name=Grade><option value=empty></option><option value=A+>A+</option><option value=4.0>A</option><option value=3.7>A-</option>" +
  "<option value=3.3>B+</option><option value=3.0>B</option><option value=2.7>B-</option><option value=2.3>C+</option><option value=2.0 selected>C</option><option value=1.7>C-</option><option value=1.3>D+</option>" +
  "<option value=1.0>D</option><option value=0.7>D-</option><option value=0.0>F</option></select>";
  var select_Cminus = "<select class=Grade name=Grade><option value=empty></option><option value=A+>A+</option><option value=4.0>A</option><option value=3.7>A-</option>" +
  "<option value=3.3>B+</option><option value=3.0>B</option><option value=2.7>B-</option><option value=2.3>C+</option><option value=2.0>C</option><option value=1.7 selected>C-</option><option value=1.3>D+</option>" +
  "<option value=1.0>D</option><option value=0.7>D-</option><option value=0.0>F</option></select>";
  var select_Dplus = "<select class=Grade name=Grade><option value=empty></option><option value=A+>A+</option><option value=4.0>A</option><option value=3.7>A-</option>" +
  "<option value=3.3>B+</option><option value=3.0>B</option><option value=2.7>B-</option><option value=2.3>C+</option><option value=2.0>C</option><option value=1.7>C-</option><option value=1.3 selected>D+</option>" +
  "<option value=1.0>D</option><option value=0.7>D-</option><option value=0.0>F</option></select>";
  var select_D = "<select class=Grade name=Grade><option value=empty></option><option value=A+>A+</option><option value=4.0>A</option><option value=3.7>A-</option>" +
  "<option value=3.3>B+</option><option value=3.0>B</option><option value=2.7>B-</option><option value=2.3>C+</option><option value=2.0>C</option><option value=1.7>C-</option><option value=1.3>D+</option>" +
  "<option value=1.0 selected>D</option><option value=0.7>D-</option><option value=0.0>F</option></select>";
  var select_Dminus = "<select class=Grade name=Grade><option value=empty></option><option value=A+>A+</option><option value=4.0>A</option><option value=3.7>A-</option>" +
  "<option value=3.3>B+</option><option value=3.0>B</option><option value=2.7>B-</option><option value=2.3>C+</option><option value=2.0>C</option><option value=1.7>C-</option><option value=1.3>D+</option>" +
  "<option value=1.0>D</option><option value=0.7 selected>D-</option><option value=0.0>F</option></select>";
  var select_F = "<select class=Grade name=Grade><option value=empty></option><option value=A+>A+</option><option value=4.0>A</option><option value=3.7>A-</option>" +
  "<option value=3.3>B+</option><option value=3.0>B</option><option value=2.7>B-</option><option value=2.3>C+</option><option value=2.0>C</option><option value=1.7>C-</option><option value=1.3>D+</option>" +
  "<option value=1.0>D</option><option value=0.7>D-</option><option value=0.0 selected>F</option></select>";

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
        letter_grade.set(course, letter.innerHTML);
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
      var k = 0, j = 0;

      for (var i = 1; i < table.rows.length; i++) {
          var name = course_names[i - 1].innerHTML;
          table.rows[i].cells[1].innerHTML = "<a href = " + course_links[i - 1].href + "/grades>" + grades.get(name) + "</a>";
          table.rows[i].cells[2].innerHTML = "<a href = " + course_links[i - 1].href + "/grades>" + class_avgs.get(name) + "</a>";
          var g = document.getElementsByClassName("Grade");
          var c = document.getElementsByClassName("Credits");

          if (letter_grade.get(name) == "" && table.rows[i].cells[3].innerHTML == "-") {
            table.rows[i].cells[3].innerHTML = select_start;
            g[k].addEventListener("change", gradeChange);
            k++;
          } else if (letter_grade.get(name) != "") {
            table.rows[i].cells[3].innerHTML = letterSelect(letter_grade.get(name));
            g[k].addEventListener("change", gradeChange);
            k++;
          } else {
            g[k].addEventListener("change", gradeChange);
            k++;
          }
          if (table.rows[i].cells[4].innerHTML == "-") {
              table.rows[i].cells[4].innerHTML = select_credits;
              c[j].addEventListener("change", creditsChange);
              j++;
          } else {
            c[j].addEventListener("change", creditsChange);
            j++;
          }
          table.rows[i].cells[5].innerHTML = "";
          table.rows[i].cells[5].appendChild(graphics.get(name));
      }

      if (document.getElementsByClassName("Grade").length > 0) {
        for (var i = 0; i < document.getElementsByClassName("Grade").length; i++) {
          document.getElementsByClassName("Grade")[i].disabled = false;
        }
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
    var gpaTable = document.createElement("table");
    var update = document.createElement("div"), loader = document.createElement("div");
    var parentDiv = document.getElementById("content-wrapper");
    var currentDiv = document.getElementById("content");
    var i = 0;

    courseTable.id = "course_table";
    gpaTable.id = "gpa_table";
    update.id = "update_status";
    update.innerHTML = "Table Updating ...";
    loader.id = "loader";
    parentDiv.insertBefore(courseTable, currentDiv.nextSibling);

    var table = document.getElementById("course_table");
    currentDiv = table;
    parentDiv.insertBefore(update, currentDiv.nextSibling);
    currentDiv = courseTable;
    currentDiv = document.getElementById("update_status");
    currentDiv.insertAdjacentElement("afterbegin", loader);
    parentDiv.insertBefore(gpaTable, currentDiv.nextSibling);
    var gpa_table = document.getElementById("gpa_table");

    chrome.storage.sync.get(['key'], function(result) {
      if (Object.values(result)[0] != undefined) {
        table.innerHTML = Object.values(result)[0].val;
      }
    });
    chrome.storage.sync.get(['key2'], function(result) {
      if (Object.values(result)[0] != undefined) {
          gpaTable.innerHTML = Object.values(result)[0].val;
      }
    });

    //Doesnt work
    if (document.getElementsByClassName("Grade").length > 0) {
      for (var i = 0; i < document.getElementsByClassName("Grade").length; i++) {
        document.getElementsByClassName("Grade")[i].disabled = true;
      }
    }

    if (table.innerHTML == "") {
      var header = table.createTHead();
      var headRow = header.insertRow(0);
      var headCourse = headRow.insertCell(-1);
      var headGrade = headRow.insertCell(-1);
      var headAvg = headRow.insertCell(-1);
      var headLetter = headRow.insertCell(-1);
      var headCredits = headRow.insertCell(-1);
      var headGraphic = headRow.insertCell(-1);
      headCourse.outerHTML = "<th>Course Name</th>";
      headGrade.outerHTML = "<th>Current Grade</th>";
      headAvg.outerHTML = "<th>Class Average</th>";
      headLetter.outerHTML = "<th>Letter Grade</th>";
      headCredits.outerHTML = "<th>Credits</th>"
      headGraphic.outerHTML = "<th>Grade Summary</th>";

      //Need to edit this to add new rows for new classes on dashboard and to
      //remove old rows
      for (var name of course_names) {
        var course = table.insertRow(-1)
        var course_name = course.insertCell(-1)
        var class_avg = course.insertCell(-1);
        var grade = course.insertCell(-1);
        var graphic = course.insertCell(-1);
        var letter = course.insertCell(-1);
        var credits = course.insertCell(-1);
        course_name.innerHTML = "<a href =" + course_links[i] + ">" + name.innerHTML + "</a>";
        grade.innerHTML = "-";
        class_avg.innerHTML = "-";
        letter.innerHTML = "-";
        credits.innerHTML = "-";
        graphic.innerHTML = "-";
        i++;
      }
    }
    if (gpa_table.innerHTML == "") {
      var header = gpa_table.createTHead();
      var headRow = header.insertRow(0);
      var headEx = headRow.insertCell(-1);
      var headCredits = headRow.insertCell(-1);
      var headGPA = headRow.insertCell(-1);
      headEx.outerHTML = "<th></th>";
      headCredits.outerHTML = "<th>Total Credits</th>";
      headGPA.outerHTML = "<th>GPA</th>";

      var semesterRow = gpa_table.insertRow(-1);
      var headSemester = semesterRow.insertCell(-1);
      var semesterCredits = semesterRow.insertCell(-1);
      var semesterGPA = semesterRow.insertCell(-1)
      headSemester.outerHTML = "<th>Semester</th>";
      semesterCredits.innerHTML = "-";
      semesterGPA.innerHTML = "-";

      var cumulativeRow = gpa_table.insertRow(-1);
      var headCumulative = cumulativeRow.insertCell(-1);
      var cumulativeCredits = cumulativeRow.insertCell(-1);
      var cumulativeGPA = cumulativeRow.insertCell(-1);
      headCumulative.outerHTML = "<th>Cumulative</th>";
      cumulativeCredits.innerHTML = "-";
      cumulativeGPA.innerHTML = "-";
    }
  }

  function storeTable() {
    var table = document.getElementById("course_table");
    var gpa_table = document.getElementById("gpa_table");
    var key = 'table_key', table_stored = {'val': table.innerHTML};
    chrome.storage.sync.set({key: table_stored}, function() {
      console.log('Saved', key, table_stored);
    });
    var key2 = 'gpa_table_key';
    table_stored = {'val': gpa_table.innerHTML};
    chrome.storage.sync.set({key2: table_stored}, function() {
      console.log('Saved', key, table_stored);
    });
  }

  function gradeChange() {
    if (this.value == "A+") {
      this.innerHTML = select_Aplus;
    } else if (this.value == 4.0) {
      this.innerHTML = select_A;
    } else if (this.value == 3.7) {
      this.innerHTML = select_Aminus;
    } else if (this.value == 3.3) {
      this.innerHTML = select_Bplus;
    } else if (this.value == 3.0) {
      this.innerHTML = select_B;
    } else if (this.value == 2.7) {
      this.innerHTML = select_Bminus;
    } else if (this.value == 2.3) {
      this.innerHTML = select_Cplus;
    } else if (this.value == 2.0) {
      this.innerHTML = select_C;
    } else if (this.value == 1.7) {
      this.innerHTML = select_Cminus;
    } else if (this.value == 1.3) {
      this.innerHTML = select_Dplus;
    } else if (this.value == 1.0) {
      this.innerHTML = select_D;
    } else if (this.value == 0.7) {
      this.innerHTML = select_Dminus;
    } else if (this.value == 0.0) {
      this.innerHTML = select_F;
    } else {
      this.innerHTML = select_start;
    }
    this.addEventListener("change", gradeChange);
    storeTable();
    semesterGPA();
  }

  function letterSelect(grade) {
    var inner = "";

    if (grade == "A+") {
      inner = select_Aplus;
    } else if (grade == "A") {
      inner = select_A;
    } else if (grade == "A-") {
      inner = select_Aminus;
    } else if (grade == "B+") {
      inner = select_Bplus;
    } else if (grade == "B") {
      inner = select_B;
    } else if (grade == "B-") {
      inner = select_Bminus;
    } else if (grade == "C+") {
      inner = select_Cplus;
    } else if (grade == "C") {
      inner = select_C;
    } else if (grade == "C-") {
      inner = select_Cminus;
    } else if (grade == "D+") {
      inner = select_Dplus;
    } else if (grade == "D") {
      inner = select_D;
    } else if (grade == "D-") {
      inner = select_Dminus;
    } else if (grade == "F") {
      inner = select_F;
    } else {
      this.innerHTML = select_start;
    }
    this.addEventListener("change", gradeChange);
    storeTable();
    semesterGPA();
    return inner;
  }

  function creditsChange() {
    if (this.value == "") {
      this.innerHTML = select_credits;
    } else if (this.value == 0) {
      this.innerHTML = select_0;
    } else if (this.value == 1) {
      this.innerHTML = select_1;
    } else if (this.value == 2) {
      this.innerHTML = select_2;
    } else if (this.value == 3) {
      this.innerHTML = select_3;
    } else if (this.value == 4) {
      this.innerHTML = select_4;
    } else if (this.value == 5) {
      this.innerHTML = select_5;
    } else if (this.value == 6) {
      this.innerHTML = select_6;
    }
    this.addEventListener("change", creditsChange);
    storeTable();
    semesterCredits();
  }

  function semesterCredits() {
    var creditsSelect = document.getElementsByClassName("Credits");
    var gpaTable = document.getElementById("gpa_table");
    var totalCredits = 0;

    for (var i = 0; i < creditsSelect.length; i++) {
      if (creditsSelect[i].value != "selected") {
        totalCredits += parseInt(creditsSelect[i].value);
      }
    }
    var semesterCredits = gpaTable.rows[1].cells[1];
    semesterCredits.innerHTML = "" + totalCredits;
    storeTable();
  }

  function semesterGPA() {
    var grades = document.getElementsByClassName("Grade");
    var credits = document.getElementsByClassName("Credits");
    var gpaTable = document.getElementById("gpa_table");
    var gpa = 0.0

    for (var i = 0; i < grades.length; i++) {
      if (grades[i].value != "selected" && credits[i].value != "selected") {
        if (grades[i].value != "A+") {
          gpa += (parseFloat(grades[i].value) * parseInt(credits[i].value));
        } else {
          gpa += (4.0 * parseInt(credits[i].value));
        }
      }
    }
    var totalCredits = gpaTable.rows[1].cells[1].innerHTML;
    if (totalCredits != "-") {
      gpa /= totalCredits;
      var semesterGPA = gpa_table.rows[1].cells[2];
      semesterGPA.innerHTML = "" + gpa.toFixed(3);
      storeTable();
    }
  }
}
