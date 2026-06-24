/* FeverBee capability heatmap - reads scores live from the published Google Sheet.
   Additive and self-contained: if the fetch fails, it simply does nothing and the
   rest of the tool is unaffected. */
(function () {
  var SHEET_CSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQTXPJedcM-qVhQGcFB3YN3WWW-FRKXWlwk5z9KsZRTcwhvP9m9-5OmjZa4Zo32PhDeDTgbHT_xxeZo/pub?gid=1454559139&single=true&output=csv";

  function parseCSV(text) {
    var lines = text.replace(/\r/g, "").split("\n").filter(function (l) { return l.trim() !== ""; });
    return lines.map(function (l) { return l.split(","); });
  }

  function cellColour(v, offered) {
    if (offered === false) return ["#333333", "#8a8a8a"];
    if (v >= 8.5) return ["#3B6D11", "#ffffff"];
    if (v >= 7)   return ["#5a8f2a", "#ffffff"];
    if (v >= 5)   return ["#b07d12", "#ffffff"];
    if (v >= 3)   return ["#9c5b15", "#ffffff"];
    return ["#A32D2D", "#ffffff"];
  }

  function shorten(name) {
    return name.replace("Gainsight CC", "Gainsight").replace("Mighty Networks", "Mighty").replace("Salesforce XC", "Salesforce");
  }

  function build(rows) {
    var header = rows[0];
    var plats = header.slice(2).map(shorten);
    var caps = [], comm = [];
    rows.slice(1).forEach(function (r) {
      var metric = r[0], type = (r[1] || "").trim().toLowerCase();
      var vals = r.slice(2).map(function (x) { return parseFloat(x); });
      if (type === "capability") caps.push({ name: metric, vals: vals });
      else if (type === "commercial") comm.push({ name: metric, vals: vals });
    });
    var nP = plats.length;
    var depth = [], compl = [];
    for (var j = 0; j < nP; j++) {
      var s = 0, n = 0;
      caps.forEach(function (c) { if (c.vals[j] > 1) { s += c.vals[j]; n++; } });
      depth.push(n ? (s / n) : 0); compl.push(n);
    }

    function th(label) {
      return '<th style="height:96px;vertical-align:bottom;padding:0 2px;"><div style="writing-mode:vertical-rl;transform:rotate(180deg);white-space:nowrap;font-weight:500;color:var(--text-sec);margin:0 auto;font-size:.72rem;">' + label + '</div></th>';
    }
    function dataRow(label, vals, isCap, bold) {
      var r = '<td style="position:sticky;left:0;background:var(--bg);z-index:1;padding:0 10px 0 4px;white-space:nowrap;font-size:.78rem;color:var(--text);' + (bold ? "font-weight:600;" : "") + '">' + label + '</td>';
      for (var j = 0; j < vals.length; j++) {
        var v = vals[j], off = isCap ? v > 1 : true, c = cellColour(v, off);
        var disp = (v % 1 === 0) ? v : v.toFixed(1);
        r += '<td style="text-align:center;min-width:34px;height:26px;border-radius:4px;background:' + c[0] + ';color:' + c[1] + ';font-size:.78rem;' + (bold ? "font-weight:600;" : "") + '">' + disp + '</td>';
      }
      return "<tr>" + r + "</tr>";
    }
    function grp(label) {
      return '<tr><td colspan="' + (nP + 1) + '" style="padding:10px 4px 3px;font-weight:600;color:var(--text-sec);font-size:.72rem;letter-spacing:.04em;text-transform:uppercase;">' + label + "</td></tr>";
    }

    var h = '<table style="border-collapse:separate;border-spacing:2px;"><thead><tr><th style="position:sticky;left:0;background:var(--bg);z-index:2;"></th>';
    plats.forEach(function (p) { h += th(p); });
    h += "</tr></thead><tbody>";
    h += grp("Capabilities (scored 0&ndash;10)");
    caps.forEach(function (c) { h += dataRow(c.name, c.vals, true, false); });
    h += '<tr><td colspan="' + (nP + 1) + '" style="height:6px;"></td></tr>';
    h += dataRow("Feature quality (offered avg)", depth.map(function (v) { return +v.toFixed(1); }), false, true);
    var complRow = '<td style="position:sticky;left:0;background:var(--bg);z-index:1;padding:0 10px 0 4px;white-space:nowrap;font-weight:600;font-size:.78rem;color:var(--text);">Completeness (offered / ' + caps.length + ')</td>';
    compl.forEach(function (c) { complRow += '<td style="text-align:center;height:26px;border-radius:4px;background:var(--card);color:var(--text);font-size:.78rem;">' + c + "</td>"; });
    h += "<tr>" + complRow + "</tr>";
    h += grp("Commercial / vendor");
    comm.forEach(function (c) { h += dataRow(c.name, c.vals, false, false); });
    h += "</tbody></table>";
    return h;
  }

  function legend() {
    var items = [["#3B6D11", "8.5&ndash;10"], ["#5a8f2a", "7&ndash;8.4"], ["#b07d12", "5&ndash;6.9"], ["#9c5b15", "3&ndash;4.9"], ["#A32D2D", "0&ndash;2.9"], ["#333333", "not offered"]];
    return '<div style="display:flex;gap:14px;flex-wrap:wrap;font-size:.72rem;color:var(--text-sec);margin:0 0 10px;">' +
      items.map(function (i) { return '<span style="display:flex;align-items:center;gap:5px;"><span style="width:12px;height:12px;border-radius:3px;background:' + i[0] + ';"></span>' + i[1] + "</span>"; }).join("") + "</div>";
  }

  function render(rows) {
    if (document.getElementById("fbpct-heatmap")) return;
    var mount = document.querySelector("#fbpct .container") || document.querySelector(".container");
    if (!mount) return;
    var sec = document.createElement("div");
    sec.id = "fbpct-heatmap";
    sec.className = "container";
    sec.style.cssText = "padding-top:1rem;padding-bottom:1rem;";
    sec.innerHTML =
      '<h2 style="font-size:1.1rem;font-weight:700;margin:0 0 .25rem;color:var(--text);">How the platforms score, capability by capability</h2>' +
      '<p style="font-size:.82rem;color:var(--text-sec);margin:0 0 .9rem;max-width:760px;">Scored 0&ndash;10 against the FeverBee nine-point framework. Feature quality is the average of the capabilities each platform actually offers; greyed cells are capabilities it doesn’t offer, so they don’t count against quality. Updated live from our scoring sheet.</p>' +
      legend() +
      '<div style="overflow-x:auto;padding-bottom:6px;">' + build(rows) + "</div>";
    mount.parentNode.insertBefore(sec, mount);
  }

  function go() {
    fetch(SHEET_CSV, { mode: "cors" })
      .then(function (r) { return r.text(); })
      .then(function (t) {
        var rows = parseCSV(t);
        if (rows.length > 1) render(rows);
      })
      .catch(function (e) { if (window.console) console.warn("FeverBee heatmap: sheet fetch failed", e); });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", go);
  else go();
})();
