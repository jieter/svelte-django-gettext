# Use django's `gettext` in Svelte

Wrapper around django's JavaScript i18n features in Svelte.

Django docs: [Using the JavaScript translation catalog](https://docs.djangoproject.com/en/stable/topics/i18n/translation/#using-the-javascript-translation-catalog)

In your rollup configuration:
```
import svelte from 'rollup-plugin-svelte';
import { writeGettextExtracts, gettextStringExtractor } from 'svelte-django-gettext';

export default {
    input: 'app.js',
    output: {...},
    plugins: [
        svelte({
            preprocessors: {
                markup: gettextStringExtractor
            }
        }),
        ...

        writeGettextExtracts('js/_svelte_django_extracted_messages.js'),
    ]
}
```


In your application:

```Svelte
<script>
import gettext from 'svelte-django-gettext';

</script>

<h1>{gettext('hello')}</h1>
```

Make sure the page loads the generated catalog, from a django template: `<script src="{% url 'javascript-catalog' %}"></script>`. If this is not the case, all functions will just return their message id.

# How it works:

Django's `./manage.py makemessages` cannot parse `.svelte` files to extract `gettext()` calls.
A rollup plugin extracts all `gettext()` calls and outputs `_svelte_django_extracted_messages.js`, containh contains `gettext` calls extracted from your `.svelte` files.

This file should be added to `.gitignore`, but is readable by django's [`magemessages` management command](https://docs.djangoproject.com/en/stable/ref/django-admin/#django-admin-makemessages).
