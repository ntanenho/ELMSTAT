if (window.location.href == "https://umd.instructure.com/" || window.location.href == "https://myelms.umd.edu/") {
  document.onreadystatechange = function () {
    if (document.readyState === 'complete') {
      window.addEventListener("beforeunload", storeTable);
      window.addEventListener('resize', resizeWindow);
      var temp_course_names = document.getElementsByClassName("ic-DashboardCard__header-subtitle ellipsis");
      var temp_course_links = document.getElementsByClassName("ic-DashboardCard__link");
      var course_names = [], course_links = [];
      var grades = new Map([]);
      var class_avgs = new Map([]);
      var graphics = new Map([]);
      var letter_grade = new Map([]);
      var frame_loads = 0;
      var iframe;
      var not_in_card_view = false;

      var select_credits = "<select class=Credits name=Credits><option value= selected></option><option value=1>1</option><option value=2>2</option>" +
      "<option value=3>3</option><option value=4>4</option><option value=5>5</option><option value=6>6</option></select>";
      var select_1 = "<select class=Credits name=Credits><option value=></option><option value=1 selected>1</option><option value=2>2</option>" +
      "<option value=3>3</option><option value=4>4</option><option value=5>5</option><option value=6>6</option></select>";
      var select_2 = "<select class=Credits name=Credits><option value=></option><option value=1>1</option><option value=2 selected>2</option>" +
      "<option value=3>3</option><option value=4>4</option><option value=5>5</option><option value=6>6</option></select>";
      var select_3 = "<select class=Credits name=Credits><option value=></option><option value=1>1</option><option value=2>2</option>" +
      "<option value=3 selected>3</option><option value=4>4</option><option value=5>5</option><option value=6>6</option></select>";
      var select_4 = "<select class=Credits name=Credits><option value=></option><option value=1>1</option><option value=2>2</option>" +
      "<option value=3>3</option><option value=4 selected>4</option><option value=5>5</option><option value=6>6</option></select>";
      var select_5 = "<select class=Credits name=Credits><option value=></option><option value=1>1</option><option value=2>2</option>" +
      "<option value=3>3</option><option value=4>4</option><option value=5 selected>5</option><option value=6>6</option></select>";
      var select_6 = "<select class=Credits name=Credits><option value=></option><option value=1>1</option><option value=2>2</option>" +
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

      function startFrames() {
        for (var i = 0; i < course_names.length; i++) {
          iframe = document.createElement("iframe");
          iframe.setAttribute("src", course_links[i] + "/grades");
          iframe.id = "i_frame" + i;
          iframe.height = 0;
          iframe.width = 0;
          iframe.style.border = "none";
          document.body.appendChild(iframe);
        }
        for (var i = 0; i < course_names.length; i++) {
            document.getElementById('i_frame' + i).onload = function() {
            if (this.contentDocument.getElementById('class_avg') != undefined) {
              var main = this.contentDocument.getElementById('class_avg').innerHTML;
              var percentages = main.match(/[-+]?([0-9]*\.[0-9]+|[0-9]+)\%/g);
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
            } else {
              var course = this.contentDocument.getElementsByClassName("ellipsible")[1].innerHTML;
              var points_earned = this.contentDocument.getElementsByClassName("grade");
              var letter = this.contentDocument.getElementsByClassName("letter_grade")[0];
              if (points_earned != undefined && points_earned[points_earned.length - 1].innerHTML.match(/[-+]?([0-9]*\.[0-9]+|[0-9]+)\%/g)) {
                  grades.set(course, points_earned[points_earned.length - 1].innerHTML.match(/[-+]?([0-9]*\.[0-9]+|[0-9]+)\%/g))
              } else {
                  grades.set(course, "N/A");
              }
              if (letter != undefined) {
                letter_grade.set(course, letter.innerHTML);
              } else {
                letter_grade.set(course, "");
              }
              class_avgs.set(course, "N/A");
              graphics.set(course, "N/A");
              letter_grade.set(course, "");
            }
            frame_loads++;
            continueCode();
          };
        }
        return true;
      }

      function continueCode() {
        if (frame_loads == course_names.length) {
          var table = document.getElementById("course_table");
          var gpa_table = document.getElementById("gpa_table");
          var k = 0, j = 0;

          if (gpa_table.rows[2].cells[1].innerHTML != "-") {
            document.getElementById("current_credits").disabled = false;
          }
          if (gpa_table.rows[2].cells[2].innerHTML != "-") {
            document.getElementById("current_gpa_whole").disabled = false;
            document.getElementById("current_gpa_deci").disabled = false;
          }
          if (document.getElementsByClassName("Grade").length > 0) {
            for (var i = 0; i < document.getElementsByClassName("Grade").length; i++) {
              document.getElementsByClassName("Grade")[i].disabled = false;
            }
          }
          if (document.getElementsByClassName("Credits").length > 0) {
            for (var i = 0; i < document.getElementsByClassName("Credits").length; i++) {
              document.getElementsByClassName("Credits")[i].disabled = false;
            }
          }
          var g = document.getElementsByClassName("Grade");
          var c = document.getElementsByClassName("Credits");
          for (var i = 1; i <= course_names.length; i++) {
              var name = course_names[i - 1];
              table.rows[i].cells[1].innerHTML = "<a href = " + course_links[i - 1] + "/grades>" + grades.get(name) + "</a>";
              table.rows[i].cells[2].innerHTML = "<a href = " + course_links[i - 1] + "/grades>" + class_avgs.get(name) + "</a>";

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
              if (graphics.get(name) != "N/A") {
                table.rows[i].cells[5].appendChild(graphics.get(name));
              } else {
                table.rows[i].cells[5].innerHTML = "N/A";
              }
          }
          if (gpa_table.rows[2].cells[1].innerHTML == "-") {
              gpa_table.rows[2].cells[1].innerHTML = "<input type=number id=current_credits name=credits min=0 max=999 value=>";
              document.getElementById("current_credits").addEventListener("input", cumulativeCredits);
              document.getElementById("current_credits").onkeypress = function() {
                var selectionLength = this.selectionEnd - this.selectionStart;
                if (this.value.length == 3 && selectionLength == 0) {
                  return false;
                }
                if (event.charCode == 46 || event.charCode == 45) {
                   event.preventDefault();
                 }
               };
          } else {
            document.getElementById("current_credits").addEventListener("input", cumulativeCredits);
            document.getElementById("current_credits").onkeypress = function(event) {
              var selectionLength = this.selectionEnd - this.selectionStart;
              if (this.value.length == 3 && selectionLength == 0) {
                return false;
              }
              if (event.charCode == 46 || event.charCode == 45) {
                 event.preventDefault();
               }
             };
          }

          if (gpa_table.rows[2].cells[2].innerHTML == "-") {
            gpa_table.rows[2].cells[2].innerHTML = "<div>" + "<input type=number id=current_gpa_whole name=gpa_whole value=><span> . <input type=number id=current_gpa_deci name=gpa_deci value=></span></div>";
            document.getElementById("current_gpa_whole").onkeypress = function(event) {
              var selectionLength = this.selectionEnd - this.selectionStart;
              if (this.value.length == 1 && selectionLength == 0) {
                return false;
              }
              if ((event.charCode >= 53 && event.charCode <= 57) || event.charCode == 45 || event.charCode == 46) {
                event.preventDefault();
              }
              if (event.charCode == 52) {
                document.getElementById("current_gpa_deci").value = "000";
                document.getElementById("current_gpa_deci").disabled = true;
              }
            };
            document.getElementById("current_gpa_whole").onkeydown = function(event) {
              if (this.value == "4" && (event.key == "Backspace" || event.key == "Delete")) {
                document.getElementById("current_gpa_deci").value = "";
                document.getElementById("current_gpa_deci").disabled = false;
              }
            };
            document.getElementById("current_gpa_whole").addEventListener("input", cumulativeGPA_Whole);
            document.getElementById("current_gpa_deci").onkeypress = function(event) {
              var selectionLength = this.selectionEnd - this.selectionStart;
              if (this.value.length == 3 && selectionLength == 0) {
                return false;
              }
              if (event.charCode == 45 || event.charCode == 46) {
                event.preventDefault();
              }
            };
            document.getElementById("current_gpa_deci").addEventListener("input", cumulativeGPA_Deci);
          } else {
            document.getElementById("current_gpa_whole").onkeypress = function(event) {
              var selectionLength = this.selectionEnd - this.selectionStart;
              if (this.value.length == 1 && selectionLength == 0) {
                return false;
              }
              if ((event.charCode >= 53 && event.charCode <= 57) || event.charCode == 45 || event.charCode == 46) {
                event.preventDefault();
              }
              if (event.charCode == 52) {
                document.getElementById("current_gpa_deci").value = "000";
                document.getElementById("current_gpa_deci").disabled = true;
              }
            };
            document.getElementById("current_gpa_whole").onkeydown = function(event) {
              if (this.value == "4" && (event.key == "Backspace" || event.key == "Delete")) {
                document.getElementById("current_gpa_deci").value = "";
                document.getElementById("current_gpa_deci").disabled = false;
              }
            }
            document.getElementById("current_gpa_whole").addEventListener("input", cumulativeGPA_Whole);
            document.getElementById("current_gpa_deci").onkeypress = function(event) {
              var selectionLength = this.selectionEnd - this.selectionStart;
              console.log(selectionLength);
              if (this.value.length == 3 && selectionLength == 0) {
                return false;
              }
              if (event.charCode == 45 || event.charCode == 46) {
                event.preventDefault();
              }
            };
            document.getElementById("current_gpa_deci").addEventListener("input", cumulativeGPA_Deci);
          }
          if (!not_in_card_view) {
            var update = document.getElementById("update_status");
            if (document.getElementById("loader") != undefined) {
              document.getElementById("loader").remove();
            }
            update.innerHTML = "Table Up to Date";
            var check = document.createElement("img");
            check.id = "check";

            // images/baseline_check_black_18dp.png made by [Maxim Basinski](https://www.flaticon.com/authors/maxim-basinski) from www.flaticon.com
            check.src = chrome.extension.getURL("images/baseline_check_black_18dp.png");
            update.insertAdjacentElement("afterbegin", check);
          } else {
            notInCardView();
          }
          removeFrames();
        }
      }

      function removeFrames() {
        for (var i = 0; i < course_names.length; i++) {
          document.getElementById("i_frame" + i).remove();
        }
      }

      function createTable() {
        var mainWrapper = document.createElement("div");
        var courseTable = document.createElement("table");
        var gpaTable = document.createElement("table");
        var update = document.createElement("div");
        var loader = document.createElement("div");
        var parentDiv = document.getElementById("content");
        var currentDiv = document.getElementById("dashboard");
        var i = 0;

        mainWrapper.id = "main_wrapper";
        courseTable.id = "course_table";
        gpaTable.id = "gpa_table";
        update.id = "update_status";
        update.innerHTML = "Table Updating ...";
        loader.id = "loader";
        parentDiv.insertBefore(mainWrapper, currentDiv.nextSibling);
        parentDiv = document.getElementById("main_wrapper");
        parentDiv.appendChild(courseTable);


        var table = document.getElementById("course_table");
        currentDiv = table;
        parentDiv.insertBefore(update, currentDiv.nextSibling);
        currentDiv = document.getElementById("update_status");
        currentDiv.style.visibility = "hidden";
        currentDiv.insertAdjacentElement("afterbegin", loader);
        parentDiv.insertBefore(gpaTable, currentDiv.nextSibling);
        var gpa_table = document.getElementById("gpa_table");

        chrome.storage.local.get(['key', 'key2', 'key3'], function(result) {
          if (typeof result.key !== 'undefined') {
            table.innerHTML = result.key.val;
            currentDiv.style.visibility = "visible";
          } else {
            var header = table.createTBody();
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

            for (var name of course_names) {
              var course = table.insertRow(-1)
              var course_name = course.insertCell(-1)
              var class_avg = course.insertCell(-1);
              var grade = course.insertCell(-1);
              var graphic = course.insertCell(-1);
              var letter = course.insertCell(-1);
              var credits = course.insertCell(-1);
              course_name.innerHTML = "<a href =" + course_links[i] + ">" + name + "</a>";
              grade.innerHTML = "-";
              class_avg.innerHTML = "-";
              letter.innerHTML = "-";
              credits.innerHTML = "-";
              graphic.innerHTML = "-";
              i++;
            }
          }
          if (typeof result.key2 !== 'undefined') {
              gpaTable.innerHTML = result.key2.val;
          } else {
            var header = gpa_table.createTBody();
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
            headCumulative.outerHTML = "<th>Current Cumulative</th>";
            cumulativeCredits.innerHTML = "-";
            cumulativeGPA.innerHTML = "-";

            cumulativeRow = gpa_table.insertRow(-1);
            headCumulative = cumulativeRow.insertCell(-1);
            headCumulative.outerHTML = "<th>New Cumulative</th>";
            cumulativeCredits = cumulativeRow.insertCell(-1);
            cumulativeGPA = cumulativeRow.insertCell(-1);
            cumulativeCredits.innerHTML = "-";
            cumulativeGPA.innerHTML = "-";
          }
          currentDiv.style.visibility = "visible";
          resizeWindow();

          if (temp_course_names.length > 0) {
            for (var i = 0; i < temp_course_names.length && i < temp_course_links.length; i++) {
              course_names.push(temp_course_names[i].innerHTML);
              course_links.push(temp_course_links[i].href);
            }
            sortRows();
            addCourse();
            removeCourse();
            startFrames();
          } else {
            for (var i = 1; i < table.rows.length; i++) {
              course_names.push(table.rows[i].cells[0].childNodes[0].innerHTML);
              course_links.push(table.rows[i].cells[0].childNodes[0].href);
            }
            if (course_names.length > 0) {
              not_in_card_view = true;
              notInCardView();
              startFrames();
            } else {
              notInCardView();
            }
          }
        });
      }

      function sortRows() {
        var courseTable = document.getElementById("course_table");
        for (var i = 0; i < course_names.length; i++) {
          for (var j = 1; j < courseTable.rows.length; j++) {
            if (course_names[i] == courseTable.rows[j].cells[0].childNodes[0].innerHTML && i != j - 1) {
               courseTable.rows[j].parentNode.insertBefore(courseTable.rows[j], courseTable.rows[i + 1]);
            } else if (course_names[i] == courseTable.rows[j].cells[0].childNodes[0].innerHTML && i == j - 1) {
              break;
            }
          }
        }
        return true;
      }

      function removeCourse() {
        var courseTable = document.getElementById("course_table");
        for (var i = 1; i < courseTable.rows.length; i++) {
          var course = courseTable.rows[i].cells[0].childNodes[0].innerHTML;
          if (!course_names.includes(course)) {
            courseTable.deleteRow(i);
          }
        }
      }

      function addCourse() {
        var courseTable = document.getElementById("course_table");
        var courses = [];
        for (var i = 1; i < courseTable.rows.length; i++) {
          courses.push(courseTable.rows[i].cells[0].childNodes[0].innerHTML);
        }
        for (var i = 0; i < course_names.length; i++) {
          if (!courses.includes(course_names[i])) {
            var course = courseTable.insertRow(i + 1);
            var course_name = course.insertCell(-1);
            var class_avg = course.insertCell(-1);
            var grade = course.insertCell(-1);
            var graphic = course.insertCell(-1);
            var letter = course.insertCell(-1);
            var credits = course.insertCell(-1);
            course_name.innerHTML = "<a href =" + course_links[i] + ">" + course_names[i] + "</a>";
            grade.innerHTML = "-";
            class_avg.innerHTML = "-";
            letter.innerHTML = "-";
            credits.innerHTML = "-";
            graphic.innerHTML = "-";
          }
        }
      }

      function notInCardView() {
        var update = document.getElementById("update_status");
        var table = document.getElementById("course_table");
        if (document.getElementById("loader") != undefined) {
          document.getElementById("loader").remove();
        }
        if (table.rows.length == 1) {
          update.innerHTML = "Change view to Card View by clicking on the three dot menu and reload the page to update.";
        } else {
          update.innerHTML = "Table Up to Date (Change view to Card View and reload the page to update)";
          var check = document.createElement("img");
          check.id = "check";

          // images/baseline_check_black_18dp.png made by [Maxim Basinski](https://www.flaticon.com/authors/maxim-basinski) from www.flaticon.com
          check.src = chrome.extension.getURL("images/baseline_check_black_18dp.png");
        }
        update.insertAdjacentElement("afterbegin", check);
      }

      function storeTable() {
        var table = document.getElementById("course_table");
        var gpa_table = document.getElementById("gpa_table");
        if (gpa_table.rows[2].cells[1].innerHTML != "-") {
          document.getElementById("current_credits").disabled = true;
        }
        if (gpa_table.rows[2].cells[2].innerHTML != "-") {
          document.getElementById("current_gpa_whole").disabled = true;
          document.getElementById("current_gpa_deci").disabled = true;
        }
        if (document.getElementsByClassName("Grade").length > 0) {
          for (var i = 0; i < document.getElementsByClassName("Grade").length; i++) {
            document.getElementsByClassName("Grade")[i].disabled = true;
          }
        }
        if (document.getElementsByClassName("Credits").length > 0) {
          for (var i = 0; i < document.getElementsByClassName("Credits").length; i++) {
            document.getElementsByClassName("Credits")[i].disabled = true;
          }
        }
        var key = 'key', table_stored = {'val': table.innerHTML};
        var key2 = 'key2', gpa_table_stored = {'val': gpa_table.innerHTML};
        var key3 = 'key3', course_names_stored = {'val': course_names};
        chrome.storage.local.set({key: table_stored, key2: gpa_table_stored, key3: course_names_stored}, function() {});
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
        semesterGPA();
      }

      function letterSelect(grade) {
        var inner = "";
        switch (grade) {
          case "A+":
            inner = select_Aplus;
            break;
          case "A":
            inner = select_A;
            break;
          case "A-":
            inner = select_Aminus;
            break;
          case "B+":
            inner = select_Bplus;
            break;
          case "B":
            inner = select_B;
            break;
          case "B-":
            inner = select_Bminus;
            break;
          case "C+":
            inner = select_Cplus;
            break;
          case "C":
            inner = select_C;
            break;
          case "C-":
            inner = select_Cminus;
            break;
          case "D+":
            inner = select_Dplus;
            break;
          case "D":
            inner = select_D;
            break;
          case "D-":
            inner = select_Dminus;
            break;
          case "F":
            inner = select_F;
            break;
          default:
            this.innerHTML = select_start;
        }
        semesterGPA();
        return inner;
      }

      function creditsChange() {
        if (this.value == "") {
          this.innerHTML = select_credits;
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
        semesterGPA();
        cumulativeCredits(null);
      }

      function semesterGPA() {
        var grades = document.getElementsByClassName("Grade");
        var credits = document.getElementsByClassName("Credits");
        var gpaTable = document.getElementById("gpa_table");
        var gpa = 0.0
        var totalCredits = 0;

        for (var i = 0; i < grades.length; i++) {
          if (grades[i].value != "selected" && credits[i].value != "selected") {
            if (grades[i].value != "A+") {
              gpa += (parseFloat(grades[i].value) * parseInt(credits[i].value));
            } else {
              gpa += (4.0 * parseInt(credits[i].value));
            }
            totalCredits += parseInt(credits[i].value);
          }
        }

        var semesterGPA = gpa_table.rows[1].cells[2];
        if (totalCredits != 0) {
          gpa /= totalCredits;
          semesterGPA.innerHTML = "" + gpa.toFixed(3);
        } else {
          semesterGPA.innerHTML = "-";
        }
        cumulativeCredits(null);
      }

      function cumulativeCredits() {
        var gpa_table = document.getElementById("gpa_table");
        if (this.value != undefined) {
          document.getElementById("current_credits").setAttribute('value', this.value);
        }
        if (gpa_table.rows[1].cells[1].innerHTML != "-" && document.getElementById("current_credits").value != "") {
          gpa_table.rows[3].cells[1].innerHTML = parseInt(gpa_table.rows[1].cells[1].innerHTML) + parseInt(document.getElementById("current_credits").value);
        } else {
          gpa_table.rows[3].cells[1].innerHTML = "-";
        }
        cumulativeGPA(null);
      }

      function cumulativeGPA_Whole() {
        if (this.value != undefined) {
          document.getElementById("current_gpa_whole").setAttribute('value', this.value);
        }
        cumulativeGPA(null);
      }

      function cumulativeGPA_Deci() {
        if (this.value != undefined) {
          document.getElementById("current_gpa_deci").setAttribute('value', this.value);
        }
        cumulativeGPA(null);
      }

      function cumulativeGPA() {
        var gpa_table = document.getElementById("gpa_table");
        var val;

        if (document.getElementById("current_credits") != "" && gpa_table.rows[3].cells[1].innerHTML != "-" && gpa_table.rows[1].cells[1].innerHTML != "-" && gpa_table.rows[1].cells[2].innerHTML != "-") {
          if ((document.getElementById("current_gpa_whole").value == "" && document.getElementById("current_gpa_deci").value != "")
          || (document.getElementById("current_gpa_whole").value != "" && document.getElementById("current_gpa_deci").value == "")
          || (document.getElementById("current_gpa_whole").value != "" && document.getElementById("current_gpa_deci").value != "")) {
           if (document.getElementById("current_gpa_whole").value == "") {
             val = "0." + document.getElementById("current_gpa_deci").value;
           } else if (document.getElementById("current_gpa_deci").value == "") {
             val = document.getElementById("current_gpa_whole").value + ".000";
           } else {
             val = document.getElementById("current_gpa_whole").value + "." + document.getElementById("current_gpa_deci").value;
           }
           var semesterTotal = (parseInt(gpa_table.rows[1].cells[1].innerHTML) * parseFloat(gpa_table.rows[1].cells[2].innerHTML));
           var currentTotal = (parseInt(document.getElementById("current_credits").value) * parseFloat(val));
           var total = semesterTotal + currentTotal;
           if (!isNaN((total / parseInt(gpa_table.rows[3].cells[1].innerHTML)).toFixed(3))) {
             gpa_table.rows[3].cells[2].innerHTML = "" + (total / parseInt(gpa_table.rows[3].cells[1].innerHTML)).toFixed(3);
           } else {
                gpa_table.rows[3].cells[2].innerHTML = "-";
           }
         } else {
           gpa_table.rows[3].cells[2].innerHTML = "-";
         }
        } else {
           gpa_table.rows[3].cells[2].innerHTML = "-";
        }
      }

      function resizeWindow() {
        if (document.getElementById("main_wrapper").offsetTop < document.getElementById("umd-howtouse").offsetTop) {
         document.getElementById("main_wrapper").style.marginTop = (document.getElementById("umd-howtouse").offsetTop - document.getElementById("main_wrapper").offsetTop) + 100 + "px";
        }
      }
    }
  }
}
