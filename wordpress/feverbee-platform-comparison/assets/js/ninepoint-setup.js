/* Phase 2 (preview only): re-base the tool's weighting/ranking on the nine-point
   capability framework + four vendor dimensions, instead of the old commercial set.
   Runs BEFORE app.js. app.js is generic (it iterates `criteria`), so rebuilding
   `criteria` here and adding per-platform capability scores is all that's needed.
   Capability scores are bundled here as the baseline (same source as the Sheet);
   the live heatmap still reads the Sheet. */
(function () {
  if (typeof platforms === "undefined" || typeof criteria === "undefined") return;

  var order = ["khoros","gainsight","higherlogic","salesforce","verint","bettermode","bevy","hivebrite","discourse","flarum","circle","mighty","gradual","thrive"];

  var capData = {
    capDiscussions: [8,7,8,6,6,7,6,4,9,6,4,3,6,6],
    capIdeation:    [7,8,6,4,4,6,4,1,3,3,1,1,3,6],
    capContent:     [7,7,7,8,7,7,5,5,5,6,6,6,7,6],
    capEvents:      [1,4,3,3,1,3,9,5,3,1,5,6,8,6],
    capGamification:[7,6,7,6,6,6,4,3,6,6,1,3,7,7],
    capModeration:  [8,8,7,6,7,6,6,5,8,7,5,5,7,5],
    capAI:          [7,8,8,8,6,5,6,4,8,7,5,6,5,7],
    capMobile:      [6,3,3,7,6,3,3,8,5,4,7,8,6,6],
    capAnalytics:   [8,7,8,8,7,6,7,5,5,5,5,4,5,7]
  };

  var capLabels = {
    capDiscussions: "Discussions & Q&A",
    capIdeation: "Ideation",
    capContent: "Content & Knowledge",
    capEvents: "Events",
    capGamification: "Gamification",
    capModeration: "Moderation",
    capAI: "AI Features",
    capMobile: "Mobile",
    capAnalytics: "Analytics & Reporting"
  };

  order.forEach(function (id, i) {
    var p = platforms.find(function (x) { return x.id === id; });
    if (!p) return;
    var offered = 0, sum = 0;
    Object.keys(capData).forEach(function (k) {
      var v = capData[k][i];
      p[k] = v;
      if (v > 1) { offered++; sum += v; }
    });
    p.featureQuality = offered ? +(sum / offered).toFixed(1) : 0;
    p.completeness = offered;
  });

  var newCriteria = [];
  Object.keys(capLabels).forEach(function (k) { newCriteria.push({ key: k, label: capLabels[k] }); });
  newCriteria.push({ key: "easeOfUse", label: "Ease of Use" });
  newCriteria.push({ key: "integrations", label: "Integrations" });
  newCriteria.push({ key: "dataPrivacySecurity", label: "Data Privacy & Security" });
  newCriteria.push({ key: "servicesSupport", label: "Services & Support" });

  criteria.length = 0;
  newCriteria.forEach(function (c) { criteria.push(c); });
})();
