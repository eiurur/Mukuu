export default function activateLink(t) {
  if (!t) return '';
  return t
    .replace(
      /((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&amp;%@!&#45;/]))?)/g,
      '<a href="$1" target="_blank">$1</a>'
    )
    .replace(/(^|\s)(@|＠)(\w+)/g, '$1<a href="http://www.twitter.com/$3" target="_blank">@$3</a>')
    .replace(
      /(?:^|[^ーー゛゜々ヾヽぁ-ヶ一-龠ａ-ｚＡ-Ｚ０-９a-zA-Z0-9&_/>]+)[#＃]([ー゛゜々ヾヽぁ-ヶ一-龠ａ-ｚＡ-Ｚ０-９a-zA-Z0-9_]*[ー゛゜々ヾヽぁ-ヶ一-龠ａ-ｚＡ-Ｚ０-９a-zA-Z]+[ー゛゜々ヾヽぁ-ヶ一-龠ａ-ｚＡ-Ｚ０-９a-zA-Z0-9_]*)/g,
      ' <a href="http://twitter.com/search?q=%23$1" target="_blank">#$1</a>'
    );
}
