const rtStartTag = /^<([-A-Za-z0-9_]+)[^>]*>/,
  rtEndTag = /<\/([-A-Za-z0-9_]+)[>]*>/,
  rtAttr = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/;

export default function(html) {
  var index,
    chars,
    match,
    stack = [],
    last = html;
  stack.last = function() {
    return this[this.length - 1];
  };
  let rtResults = "";
  while (html) {
    chars = true;

    // end tag
    if (html.indexOf("</") == 0) {
      match = html.match(rtEndTag);

      if (match) {
        html = html.substring(match[0].length);
        //match[0].replace(endTag, parseEndTag);
        chars = false;
      }

      let nmach = rtToMlData(match[0], []);

      //执行替换
      rtResults = rtResults + nmach;
      // start tag
    } else if (html.indexOf("<") == 0) {
      match = html.match(rtStartTag);

      if (match) {
        html = html.substring(match[0].length);
        //match[0].replace(startTag, parseStartTag);
        chars = false;
      }
      //解析是否带有属性
      let attrData = match[0].match(rtAttr);

      let nmach = rtToMlData(match[0], attrData);

      //执行替换
      rtResults = rtResults + nmach;
    }

    if (chars) {
      index = html.indexOf("<");

      var text = index < 0 ? html : html.substring(0, index);
      html = index < 0 ? "" : html.substring(index);
      //if (handler.chars) handler.chars(text);
      rtResults = rtResults + text;
      //rtResults = rtResults.replace(/\n/g,"<br/>");
    }

    if (html == last) {
      alert(html + "标签解析错误");
      throw "Parse Error: " + html;
    }
    last = html;
  }
  function rtToMlData(rtData, attrData) {
    switch (rtData) {
      case "<align=left>":
        return '<p style="text-align: left;">';
      case "<align=right>":
        return '<p style="text-align: right;">';
      case "<align=center>":
        return '<p style="text-align: center;">';
      case "<b>":
        return "<strong>";
      case "</b>":
        return "</strong>";
      case "<i>":
        return "<em>";
      case "<u color=#FF896E>":
        return "";
      case "<link=unlockprop>":
        return "<x>";
      case "</i>":
        return "</em>";
      case "</align>":
        return "</p>";
      case "</color>":
        return "</font>";
      case "</size>":
        return "</span>";
      case "</link>":
        return "</x>";
      default:
        if (attrData[1] == "color") {
          return `<font color="${attrData.input.replace(/<color=|>/g, "")}">`;
        } else if (attrData[1] == "size") {
          return `<span style="font-size: ${attrData.input.replace(
            /<size=|>/g,
            ""
          )}px;">`;
        }
        return rtData;
    }
  }
  return rtResults;
}
