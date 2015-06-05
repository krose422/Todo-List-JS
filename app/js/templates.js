this["template"] = this["template"] || {};
this["template"]["timestamp"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper;

  return "\n<li>\n<div class=\"circle\"></div>\n<span>"
    + this.escapeExpression(((helper = (helper = helpers.task || (depth0 != null ? depth0.task : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"task","hash":{},"data":data}) : helper)))
    + "</span>\n</li>\n";
},"useData":true});