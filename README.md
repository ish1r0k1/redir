# Redir.js

Redir.js is client-side redirect plugin for each devices.

## Downlaod

[Downlaod](https://github.com/ish1r0k1/redir/archive/master.zip)

## Usage

Only read the javascript file
```
<script src="/path/redir.min.js"></script>
```

### If put a redirect button

Please put the tag of granted the class attribute `.js-redir`

**Example**
```
<a class="js-redir">Goto PC site</a>
```

> Element that have this class will be hidden if UA is a PC.

## Change settings

This plugin is not intended to describe the setting outside for easily use.  
Rewrite the contents if change the settings.

### Change corresponding SP device

```
this.isSp = /Android|iPhone|iPad/.test(ua)
=> this.isSp = /Android|iPhone|iPad|BlackBerry/.test(ua)
```

### Relative path

`this.relativePath = true`  
Before: http://example.com/path/  
After: http://example.com/path/sp/


`this.relativePath = false`  
Before: http://example.com/path/  
After: http://example.com/sp/path/


## Change logs

`1.0.0` / Mar 31, 2016

## License

Copyright(c) 2016 Hiroki ISHIWATARI
