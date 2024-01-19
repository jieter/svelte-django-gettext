/* Proxies to globally defined django.*gettext functions if it is available.
 */
function capfirst(str, condition) {
    return condition ? (str.charAt(0).toUpperCase() + str.slice(1)) : str;
}

export function gettext(msgid, doCapfirst) {
    const django = window.django;
    const msgstr = django ? django.gettext(msgid) : msgid;
    return capfirst(msgstr, doCapfirst);
}

export function pgettext(context, msgid, doCapfirst) {
    const django = window.django;
    const msgstr = django ? django.pgettext(context, msgid) : msgid;
    return capfirst(msgstr, doCapfirst);
}

export function ngettext(singular, plural, count, doCapfirst) {
    const django = window.django;
    const msgstr = django ? django.ngettext(singular, plural, count) : (count === 1 ? singular : plural);
    return capfirst(msgstr, doCapfirst);
}

export function npgettext(context, singular, plural, count, doCapfirst) {
    const django = window.django;
    const msgstr = django ? django.npgettext(context, singular, plural, count) : (count === 1 ? singular : plural);
    return capfirst(msgstr, doCapfirst);
}

export default gettext;