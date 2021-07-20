// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"script.js":[function(require,module,exports) {
var mobile_menu = document.querySelector('.menu_mobile');
var hamburger_menu = document.querySelector('.hamburger');
var dark_overlay = document.getElementById("dark_overlay");
var html_el = document.documentElement;
var links = document.querySelectorAll(".links");
var bookmark = document.querySelector(".bookmark"),
    bookmark_div = document.getElementById("bookmark"),
    bookmark_img = document.getElementById("bookmark_image");
var all_details = document.querySelectorAll(".detail");
var pledge_card = document.querySelectorAll('.reward_pledge');
var back_this_btn = document.getElementById("back_project_btn"),
    back_this_project = document.getElementById("back_this_project");
var close_this_btn = document.querySelector(".close");
var small_circles = document.querySelectorAll('.small_circle');
var thanks = document.getElementById("thanks");
var amount_contributed = document.getElementById("current_total"),
    no_of_backers = document.getElementById("no_of_backers"),
    days_left = document.getElementById("days_left"),
    current_progress = document.getElementById("live_progress");
var input = document.querySelectorAll('.pledged_amount');
var pledge_div = document.querySelectorAll('.enter_pledge');
var submit_btn = document.querySelectorAll('submit');
var about_card = document.querySelectorAll('#about .card');
var pledges_left = document.querySelectorAll('#about .card .pledges_left');
var pledges_left2 = document.querySelectorAll(".reward_pledge .pledges_left"); // Currency formatter

var currency_formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
}); // global variables

var total_amount = 89914;
var backers = 5007;
var progress = Math.floor(total_amount / 100000 * 100);
amount_contributed.innerHTML = currency_formatter.format(total_amount);
no_of_backers.innerHTML = backers.toLocaleString("en-US");
current_progress.value = progress;
pledges_left[0].innerHTML = pledges_left2[0].innerHTML;
pledges_left[1].innerHTML = pledges_left2[1].innerHTML; // Open Mobile Menu

function open_menu() {
  mobile_menu.style.visibility = 'visible';
  mobile_menu.style.opacity = 1;
  dark_overlay.style.display = 'block';
  html_el.style.overflowY = "hidden";
} // Close Mobile Menu


function close_menu() {
  mobile_menu.style.visibility = 'hidden';
  mobile_menu.style.opacity = 0;
  dark_overlay.style.display = 'none';
  html_el.style.overflowY = "auto";
  back_this_project.style.visibility = "hidden";
  back_this_project.style.opacity = "0";
  thanks.style.visibility = "hidden";
  thanks.style.opacity = "0";
} // Change Bookmark State


function bookmarked() {
  bookmark.innerHTML = "Bookmarked";
  bookmark_div.style.opacity = 1;
  bookmark_div.style.color = "--dark_cyan";
  bookmark_img.src = "images/icon-bookmark-cyan.svg";
} // Open Back This Project Pledge Card


function open_back_this() {
  back_this_project.style.visibility = "visible";
  back_this_project.style.opacity = "1";
  dark_overlay.style.display = 'block';
} // Close Back This Project Pledge Card


function close_back_this() {
  back_this_project.style.visibility = "hidden";
  back_this_project.style.opacity = "0";
  dark_overlay.style.display = 'none';
} // Function to close other detail summaries when one is open and add cyan radio button to opened card


all_details.forEach(function (det) {
  det.addEventListener('toggle', toggleOpenOnly);
});

function toggleOpenOnly(e) {
  var _this = this;

  if (this.open) {
    all_details.forEach(function (det) {
      // To Close other tabs when one is open
      if (det != _this && det.open) {
        det.open = false;
      }
    });
  }
} // Function to get input value and append it to amount and backers


pledge_div.forEach(function (pledge) {
  var pledge_input = pledge.querySelector('.pledged_amount');
  var pledge_submit = pledge.querySelector('.submit'); //On click of submit button

  pledge_submit.addEventListener('click', submit_value); // On enter keydown

  pledge_input.addEventListener('keydown', function (event) {
    if (event.key === "Enter") {
      submit_value();
    }
  });

  function submit_value() {
    if (pledge_input.value !== "" || pledge_input.value != 0) {
      total_amount += parseInt(pledge_input.value);
      backers++;
      progress = Math.floor(total_amount / 100000 * 100);
      total_backer_update();
      show_thanks();
    } else if (!pledge_input.min && pledge_input.value == "") {
      alert("Please enter a value");
    }
  }
}); // Show thanks for support modal

function show_thanks() {
  thanks.style.visibility = "visible";
  thanks.style.opacity = "1";
  dark_overlay.style.display = 'block';
  back_this_project.style.visibility = "hidden";
  back_this_project.style.opacity = "0";
} // Close modal with got it button


thanks.querySelector('.btn').addEventListener('click', function () {
  thanks.style.visibility = "hidden";
  thanks.style.opacity = "0";
  dark_overlay.style.display = 'none';
}); // Update total amount and backers in dom

function total_backer_update() {
  // Update amount_contributed and no_of_backers
  amount_contributed.innerHTML = currency_formatter.format(total_amount);
  no_of_backers.innerHTML = backers.toLocaleString("en-US");
  current_progress.value = progress; // Clear input after delay of 1s

  input.forEach(function (input) {
    setTimeout(function () {
      input.value = "";
    }, 15000);
  });
} // Reduces pledges left after every submit and success card pops up and when pledges remain 0 disable card


pledge_card.forEach(function (card) {
  var pledged_amount = card.querySelector('.pledged_amount');
  var input = card.querySelector('.currency input');
  card.querySelector('.submit').addEventListener('click', reduce_pledge);
  input.addEventListener('keydown', function (event) {
    if (event.key === "Enter") {
      reduce_pledge();
    }
  });

  function reduce_pledge() {
    var remaining_pledges = card.querySelector('.pledges_left');

    if (remaining_pledges.innerHTML != 0 && pledged_amount.value >= input.min) {
      remaining_pledges.innerHTML--;
      pledges_left[0].innerHTML = pledges_left2[0].innerHTML;
      pledges_left[1].innerHTML = pledges_left2[1].innerHTML;
    } else if (pledged_amount.value < input.min) {
      alert("Please enter a value equal to or  greater than $".concat(input.min));
    } // Grey out pledge card and about card if there are no pledges left 


    grey_out(card.querySelector('.pledges_left'), card);
    about_card.forEach(function (card) {
      grey_out(card.querySelector('.pledges_left'), card);
    });
  }
}); // Grey out

function grey_out(item1, item2) {
  if (item1.innerHTML == 0) {
    item2.classList.add('grey_out_disable');
  }
} // Event Listeners


hamburger_menu.addEventListener('click', open_menu);
dark_overlay.addEventListener('click', close_menu);
bookmark_div.addEventListener("click", bookmarked);
links.forEach(function (link) {
  link.addEventListener('click', close_menu);
});
back_this_btn.addEventListener('click', open_back_this);
close_this_btn.addEventListener('click', close_back_this);
},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "60643" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","script.js"], null)
//# sourceMappingURL=/script.75da7f30.js.map