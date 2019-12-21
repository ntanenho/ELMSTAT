// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
document.getElementById("feedback_button").onclick = sendEmail;
function sendEmail() {
  console.log("test");
  window.open('mailto:elmsstat@gmail.com?subject=Feedback');
}
