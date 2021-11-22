/* globals describe, expect, test */
import { gettext, ngettext, npgettext, pgettext } from '../index.js';


describe('gettext', function() {
    test('Is identity function if django is not defined', function() {
        window.django = undefined;
        expect(gettext('house')).toBe('house');
        expect(gettext('house', true)).toBe('House');
    });

    test('Proxies to django.gettext', function() {
        window.django = {
            gettext: function() {
                return 'huis';
            }
        };
        expect(gettext('house')).toBe('huis');
        expect(gettext('house', true)).toBe('Huis');
    });
});

describe('ngettext', function() {
    test('Is identity function if django is not defined', function() {
        window.django = undefined;
        expect(ngettext('house', 'houses', 1)).toBe('house');
        expect(ngettext('house', 'houses', 2)).toBe('houses');
        expect(ngettext('house', 'houses', 1, true)).toBe('House');
        expect(ngettext('house', 'houses', 2, true)).toBe('Houses');
    });
    test('Proxies to django.ngettext', function() {
        window.django = {
            ngettext: function(singular, plural, count) {
                return count == 1 ? 'huis' : 'huizen';
            }
        };
        expect(ngettext('house', 'houses', 1)).toBe('huis');
        expect(ngettext('house', 'houses', 2)).toBe('huizen');
    });
});

describe('npgettext', function() {
    test('Is identity function if django is not defined', function() {
        window.django = undefined;
        expect(npgettext('search results', '1 result', '%d results', 1)).toBe('1 result');
    });
});


describe('pgettext', function() {
    test('Is identity function if django is not defined', function() {
        window.django = undefined;
        expect(pgettext('date', 'may')).toBe('may');
        expect(pgettext('date', 'may', true)).toBe('May');
    });
    test('Proxies to django.pgettext', function() {
        window.django = {
            pgettext: function() {
                return 'mei'
            }
        };
        expect(pgettext('date', 'may')).toBe('mei');
        expect(pgettext('date', 'may', true)).toBe('Mei');
    });
});