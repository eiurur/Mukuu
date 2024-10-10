import { acceptedDomains } from "@mukuu/common/lib/constants";

const activateLink = t => {
  if (!t) return "";
  return t
    .replace(
      /(https?:\/\/(?:[\w-]+\.)+[\w-]+(?:\/[\w-./?%&=#!+@]*))/g,
      '<a href="$1" target="_blank" rel="noreferrer">$1</a>'
    )
    .replace(/(^|\s)(@|＠)(\w+)/g, '$1<a href="http://www.twitter.com/$3" target="_blank">@$3</a>')
    .replace(
      /(?:^|[^ーー゛゜々ヾヽぁ-ヶ一-龠ａ-ｚＡ-Ｚ０-９a-zA-Z0-9&_/>]+)[#＃]([ー゛゜々ヾヽぁ-ヶ一-龠ａ-ｚＡ-Ｚ０-９a-zA-Z0-9_]*[ー゛゜々ヾヽぁ-ヶ一-龠ａ-ｚＡ-Ｚ０-９a-zA-Z]+[ー゛゜々ヾヽぁ-ヶ一-龠ａ-ｚＡ-Ｚ０-９a-zA-Z0-9_]*)/g,
      ' <a href="http://twitter.com/search?q=%23$1" target="_blank" rel="noreferrer">#$1</a>'
    );
};

const parseToExternalLinks = text => {
  const urls = text
    .split(/\r\n|\n|\s/)
    .filter(word => acceptedDomains.some(domain => word.indexOf(domain) !== -1))
    .map(url => {
      const match = url.match(/(https?:\/\/(?:[\w-]+\.)+[\w-]+(?:\/[\w-./?%&=#!+]*))/);
      if (!match) return null;
      return match[1];
    });
  return urls
    .filter(url => !!url)
    .map(url => {
      const u = new URL(url);
      return {
        url: u.href,
        hostname: u.hostname,
        label: u.hostname.split(".")[0]
      };
    });
};

export { activateLink, parseToExternalLinks };
