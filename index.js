export * from './build.js'


function capfirst(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}

export function gettext(msgid, doCapfirst) {
    const django = window.django;
    const msgstr = django ? django.gettext(msgid) : msgid;
    return doCapfirst ? capfirst(msgstr) : msgstr;
};

export function pgettext(context, msgid, doCapfirst) {
    const django = window.django;
    const msgstr = django ? django.pgettext(context, msgid) : msgid;
    return doCapfirst ? capfirst(msgstr) : msgstr;
}

export default gettext;