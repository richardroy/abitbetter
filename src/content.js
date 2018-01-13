/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var DiffBlockHeaderService_1 = __webpack_require__(2);

var DiffBlockService =
/** @class */
function () {
  function DiffBlockService() {}

  DiffBlockService.initialiseResizeButtons = function () {
    var diffContainers = window.document.getElementsByClassName(this.diffContainerClass);
    var diffBlocks = [];

    for (var i = 0; i < diffContainers.length; i++) {
      var diffBlock = this.toDiffBlock(diffContainers[i]);
      diffBlocks.push(diffBlock);
    }

    this.addResizeBlockButtons(diffBlocks);
    this.addResizeAll(diffBlocks);
  };

  DiffBlockService.alternateCollapse = function (buttonText, diffBlock) {
    if (buttonText === "Minimize") {
      DiffBlockService.collapse(diffBlock);
    } else {
      DiffBlockService.expand(diffBlock);
    }
  };

  DiffBlockService.addResizeBlockButtons = function (diffBlocks) {
    diffBlocks.map(function (diffBlock) {
      DiffBlockHeaderService_1.DiffBlockHeaderService.addResizeBlockButton(diffBlock);
    });
  };

  DiffBlockService.toDiffBlock = function (diffContainer) {
    var diffContainerHeader = DiffBlockHeaderService_1.DiffBlockHeaderService.getHeader(diffContainer);
    var diffContainerBody = DiffBlockService.getBody(diffContainer);
    var diffBlock = {
      header: diffContainerHeader,
      body: diffContainerBody
    };
    return diffBlock;
  };

  DiffBlockService.addResizeAll = function (diffBlocks) {
    var resizeAll = document.createElement("span");
    resizeAll.className = this.resizeButtonClass;
    resizeAll.textContent = "Minimize All";

    resizeAll.onclick = function () {
      DiffBlockService.alternateResizeOnDiffBlocks(resizeAll, diffBlocks);
    };

    var summaryElement = window.document.getElementById(this.commitFilesSummaryId);
    summaryElement.appendChild(resizeAll);
  };

  DiffBlockService.getBody = function (diffContainer) {
    var diffContainerBody = diffContainer.getElementsByClassName(this.diffRefractorBodyClass)[0];

    if (!diffContainerBody) {
      diffContainerBody = diffContainer.getElementsByClassName(this.diffContentBodyClass)[0];
    }

    return diffContainerBody;
  };

  DiffBlockService.alternateResizeOnDiffBlocks = function (resizeAllElement, diffBlocks) {
    diffBlocks.map(function (diffBlock) {
      var resizeButton = DiffBlockHeaderService_1.DiffBlockHeaderService.getResizeButton(diffBlock.header);

      if (String(resizeAllElement.textContent).indexOf(resizeButton.textContent) !== -1) {
        DiffBlockService.alternateCollapse(resizeButton.textContent, diffBlock);
      }
    });
    resizeAllElement.textContent = resizeAllElement.textContent == "Minimize All" ? "Expand All" : "Minimize All";
  };

  DiffBlockService.collapse = function (diffBlock) {
    var resizeButton = diffBlock.header.getElementsByClassName(this.resizeButtonClass)[0];
    resizeButton.textContent = "Expand";
    diffBlock.body.setAttribute("style", "display: none;");
    diffBlock.header.setAttribute("style", "border-bottom: 1px solid #abc; margin-bottom: -40px");
  };

  DiffBlockService.expand = function (diffBlock) {
    var resizeButton = diffBlock.header.getElementsByClassName(this.resizeButtonClass)[0];
    resizeButton.textContent = "Minimize";
    diffBlock.body.setAttribute("style", "");
    diffBlock.header.setAttribute("style", "border-bottom: none");
  };

  DiffBlockService.diffRefractorBodyClass = "diff-content-container refract-container";
  DiffBlockService.diffContentBodyClass = "diff-content-container content-container";
  DiffBlockService.resizeButtonClass = "diff-entry-lozenge aui-lozenge collapsable";
  DiffBlockService.commitFilesSummaryId = "commit-files-summary";
  DiffBlockService.diffContainerClass = "diff-container";
  return DiffBlockService;
}();

exports.DiffBlockService = DiffBlockService;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var DiffBlockService_1 = __webpack_require__(0);

var observeDOM = function () {
  var MutationObserver = window["MutationObserver"] || window["WebKitMutationObserver"],
      eventListenerSupported = window.addEventListener;
  return function (obj, callback) {
    if (MutationObserver) {
      // define a new observer
      var obs = new MutationObserver(function (mutations, observer) {
        if (mutations[0].addedNodes.length || mutations[0].removedNodes.length) callback();
      }); // have the observer observe foo for changes in children

      obs.observe(obj, {
        childList: true,
        subtree: true
      });
    } else if (eventListenerSupported) {
      obj.addEventListener('DOMNodeInserted', callback, false);
      obj.addEventListener('DOMNodeRemoved', callback, false);
    }
  };
}();

var setTimoutVar; // Observe a specific DOM element:

observeDOM(document.getElementById('page'), function () {
  clearTimeout(setTimoutVar);
  setTimoutVar = setTimeout(myMain, 1000);
});
var fileChangeSummaryLozenge = "diff-summary-lozenge aui-lozenge aui-lozenge-subtle";
var diffTypeLozengeClass = "diff-entry-lozenge aui-lozenge aui-lozenge-subtle";
var fileSummaryRowClass = "iterable-item file file-modified";
var fileListLinkClass = "commit-files-summary--filename";
var commitFilesSummaryId = "commit-files-summary";
var diffStatsDivClass = "commit-file-diff-stats";
var navigationParentClass = "adg3-navigation";
var completeSignatureId = "abb-completed";
var leftNavigationId = "adg3-navigation";
var linesRemovedClass = "lines-removed";
var diffContainerClass = "diff-container";
var linesAddedClass = "lines-added";
var fileChangeSummaryLozengeCompleteClass = "aui-lozenge-complete";
var fileChangeSummaryLozengeDeletedClass = "aui-lozenge-error";
var fileChangeSummaryLozengeAddedClass = "aui-lozenge-success";
var fileChangeSummaryLozengeRenamedClass = "aui-lozenge-moved";

function myMain() {
  var completed = window.document.getElementById(completeSignatureId);
  var diffContainers = window.document.getElementsByClassName(diffContainerClass);

  if (diffContainers.length > 0 && !completed) {
    reshuffle();
    insertDiffTotal();
    addLeftFileList();
    DiffBlockService_1.DiffBlockService.initialiseResizeButtons();
    addSignature();
    addFileSummary();
  }
}

function reshuffle() {
  var summaryElement = window.document.getElementById(commitFilesSummaryId);
  var shuffleFileSummaries = [];

  for (var i = 0; i < summaryElement.childNodes.length; i++) {
    if (summaryElement.childNodes[i].nodeName == "LI") {
      var summaryLozenge = summaryElement.childNodes[i].getElementsByClassName(fileChangeSummaryLozenge)[0];
      if (summaryLozenge && (summaryLozenge.textContent.replace(/\W/g, '') == "D" || summaryLozenge.textContent.replace(/\W/g, '') == "R")) shuffleFileSummaries.push(summaryElement.childNodes[i]);
    }
  }

  for (var i = 0; i < shuffleFileSummaries.length; i++) {
    summaryElement.appendChild(shuffleFileSummaries[i]);
  }

  var diffContainers = window.document.getElementsByClassName(diffContainerClass);
  var diffParent = diffContainers[0].parentElement.parentElement;
  var shuffleDiffs = [];

  for (var i = 0; i < diffContainers.length; i++) {
    var typeLozenge = diffContainers[i].getElementsByClassName(diffTypeLozengeClass)[0];
    var typeLozengeContent = typeLozenge.textContent.replace(/\W/g, '');

    if (typeLozengeContent == "Deleted" || typeLozengeContent == "Renamed") {
      shuffleDiffs.push(diffContainers[i]);
    }
  }

  for (var i = 0; i < shuffleDiffs.length; i++) {
    diffParent.appendChild(shuffleDiffs[i].parentElement);
  }
}

function addFileSummary() {
  var fileSummaryLozenges = window.document.getElementsByClassName(fileChangeSummaryLozenge);
  var summary = {};

  for (var i = 0; i < fileSummaryLozenges.length; i++) {
    var changeText = fileSummaryLozenges[i].textContent;
    changeText = changeText.replace(/\W/g, '');
    var currentCount = summary[changeText];
    summary[changeText] = summary[changeText] ? currentCount + 1 : 1;
  }

  var summaryElement = window.document.getElementById(commitFilesSummaryId);

  if (summary["M"]) {
    var textContent = summary["M"] + " Modified";
    var lozengeClass = fileChangeSummaryLozengeCompleteClass;
    var lozenge = createLozenge(textContent, lozengeClass);
    summaryElement.parentElement.appendChild(lozenge);
  }

  if (summary["A"]) {
    var textContent = summary["A"] + " Added";
    var lozengeClass = fileChangeSummaryLozengeAddedClass;
    var lozenge = createLozenge(textContent, lozengeClass);
    summaryElement.parentElement.appendChild(lozenge);
  }

  if (summary["D"]) {
    var lozengeClass = fileChangeSummaryLozengeDeletedClass;
    var textContent = summary["D"] + " Deleted";
    var lozenge = createLozenge(textContent, lozengeClass);
    summaryElement.parentElement.appendChild(lozenge);
  }

  if (summary["R"]) {
    var lozengeClass = fileChangeSummaryLozengeRenamedClass;
    var textContent = summary["R"] + " Renamed";
    var lozenge = createLozenge(textContent, lozengeClass);
    summaryElement.parentElement.appendChild(lozenge);
  }
}

function createLozenge(textContent, lozengeClass) {
  var modifiedSummary = document.createElement("span");
  modifiedSummary.className = fileChangeSummaryLozenge + " " + lozengeClass;
  modifiedSummary.textContent = textContent;
  modifiedSummary.setAttribute("style", "width: auto; padding: 2px 5px 2px 5px; margin: 5px");
  return modifiedSummary;
}

function addLeftFileList() {
  var summaryElement = window.document.getElementById(commitFilesSummaryId);

  if (summaryElement) {
    var linkListName = summaryElement.getElementsByClassName(fileListLinkClass);
    var linkList = linkListName;
    var navigationSubList = document.getElementById(leftNavigationId).firstChild.firstChild.firstChild.firstChild.childNodes[1].firstChild.childNodes[2].firstChild.firstChild;
    var div = document.createElement("div");
    div.setAttribute("style", "border-top: 1px solid black; margin: 10px;");
    navigationSubList.appendChild(div);

    for (var i = 0; i < linkList.length; i++) {
      var clonedLink = linkList[i].cloneNode(true);
      var textContent = clonedLink.textContent;
      var splitUrl = textContent.split("/");
      var linkText = "/" + splitUrl[splitUrl.length - 1];
      clonedLink.textContent = linkText;
      clonedLink.title = textContent;
      var linkWrapper = document.createElement("div");
      linkWrapper.appendChild(clonedLink);
      navigationSubList.appendChild(linkWrapper);
    }
  } else {
    console.warn("Delay: No summary element found");
  }
}

function insertDiffTotal() {
  //enter here the action you want to do once loaded
  var summaryElement = window.document.getElementById(commitFilesSummaryId);

  if (summaryElement) {
    var removed = summaryElement.getElementsByClassName(linesRemovedClass);
    var totalRemoved = 0;

    for (var i = 0; i < removed.length; i++) {
      totalRemoved += parseInt(removed[i].innerHTML);
    }

    ;
    var added = summaryElement.getElementsByClassName(linesAddedClass);
    var totalAdded = 0;

    for (var i = 0; i < added.length; i++) {
      totalAdded += parseInt(added[i].innerHTML);
    }

    ;
    var li = document.createElement("li");
    li.className = fileSummaryRowClass;
    var div = document.createElement("div");
    div.className = diffStatsDivClass;
    var spanAdded = document.createElement("span");
    spanAdded.className = linesAddedClass;
    spanAdded.textContent = "+" + totalAdded;
    var spanRemoved = document.createElement("span");
    spanRemoved.className = linesRemovedClass;
    spanRemoved.textContent = totalRemoved.toString();
    var totalDif = totalAdded + totalRemoved;
    var totalClass = totalDif >= 0 ? linesAddedClass : linesRemovedClass;
    var totalText = totalDif > 0 ? "+" + totalDif : totalDif.toString();
    var spanTotal = document.createElement("span");
    spanTotal.className = totalClass;
    spanTotal.textContent = totalText;
    li.appendChild(div);
    div.appendChild(spanAdded);
    div.appendChild(spanRemoved);
    div.appendChild(spanTotal);
    summaryElement.appendChild(li);
  } else {
    console.warn("Delay: No summary element found");
  }
}

function addSignature() {
  var pageElement = window.document.getElementById('page');
  var spanAdded = document.createElement("span");
  spanAdded.id = completeSignatureId;
  pageElement.appendChild(spanAdded);
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var DiffBlockService_1 = __webpack_require__(0);

var DiffBlockHeaderService =
/** @class */
function () {
  function DiffBlockHeaderService() {}

  DiffBlockHeaderService.getHeader = function (diffContainer) {
    var diffContainerHeader = diffContainer.getElementsByClassName(this.diffHeaderClass)[0];
    return diffContainerHeader;
  };

  DiffBlockHeaderService.getResizeButton = function (diffContainerHeader) {
    var resizeButton = diffContainerHeader.getElementsByClassName(this.minimizeButtonClass)[0];
    return resizeButton;
  };

  DiffBlockHeaderService.addResizeBlockButton = function (diffBlock) {
    var resizeBody = document.createElement("span");
    resizeBody.className = this.minimizeButtonClass;
    resizeBody.textContent = "Minimize";

    resizeBody.onclick = function () {
      DiffBlockService_1.DiffBlockService.alternateCollapse(resizeBody.textContent, diffBlock);
    };

    var headerPrimary = DiffBlockHeaderService.getHeaderPrimary(diffBlock.header);
    headerPrimary.appendChild(resizeBody);
  };

  DiffBlockHeaderService.getHeaderPrimary = function (diffContainerHeader) {
    var headerPrimary = diffContainerHeader.getElementsByClassName(this.primaryHeaderClass)[0];
    return headerPrimary;
  };

  DiffBlockHeaderService.minimizeButtonClass = "diff-entry-lozenge aui-lozenge collapsable";
  DiffBlockHeaderService.primaryHeaderClass = "filename";
  DiffBlockHeaderService.diffHeaderClass = "heading";
  return DiffBlockHeaderService;
}();

exports.DiffBlockHeaderService = DiffBlockHeaderService;

/***/ })
/******/ ]);