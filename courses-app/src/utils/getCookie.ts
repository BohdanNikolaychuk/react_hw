export default function getCookie(key: string) {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + key.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'),
  );

  const cookie = matches ? decodeURIComponent(matches[1]) : undefined;

  if (cookie === 'undefined') return undefined;
  return cookie;
}
