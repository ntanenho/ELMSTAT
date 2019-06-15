// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';
// var firebaseConfig = {
//   apiKey: "AIzaSyCVmb4NbfV5tqIofp0VxSgEfuHDXxAPcaU",
//   authDomain: "elms-stat.firebaseapp.com",
//   databaseURL: "https://elms-stat.firebaseio.com",
//   projectId: "elms-stat",
//   storageBucket: "elms-stat.appspot.com",
//   messagingSenderId: "675792546468",
//   appId: "1:675792546468:web:b31ccb9a6bc271fe"
// };
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: 'developer.chrome.com'},
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});
