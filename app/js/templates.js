this["template"] = this["template"] || {};
this["template"]["addtask"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "\n<li>\n<div class=\"circle\"></div>\n<span>"
    + alias3(((helper = (helper = helpers.task || (depth0 != null ? depth0.task : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"task","hash":{},"data":data}) : helper)))
    + "</span>\n<div class=\"timestamp\">"
    + alias3(((helper = (helper = helpers.date || (depth0 != null ? depth0.date : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"date","hash":{},"data":data}) : helper)))
    + "</div>\n</li>\n";
},"useData":true});
this["template"] = this["template"] || {};
this["template"]["timestamp"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "";
},"useData":true});