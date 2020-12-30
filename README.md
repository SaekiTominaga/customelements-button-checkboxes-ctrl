# Button to select / deselect all checkboxes by Custom Elements.

[![npm version](https://badge.fury.io/js/%40saekitominaga%2Fcustomelements-button-checkboxes-ctrl.svg)](https://badge.fury.io/js/%40saekitominaga%2Fcustomelements-button-checkboxes-ctrl)

Button to select / deselect all checkboxes by Custom Elements.

## Demo

- [Demo page](https://saekitominaga.github.io/customelements-button-checkboxes-ctrl/demo.html)

## Examples

```
<button type="button" is="x-checkboxes-ctrl"
  data-course="check"
  data-target-for="checkboxes1"
>Check all</button>
<span id="checkboxes1">
  <label><input type="checkbox"/> 1</label>
  <label><input type="checkbox"/> 2</label>
  <label><input type="checkbox"/> 3</label>
</span>

<button type="button" is="x-checkboxes-ctrl"
  data-course="check"
  data-targets-class="checkbox2"
>Check all</button>
<span>
  <label><input type="checkbox" class="checkbox2"/> 1</label>
  <label><input type="checkbox" class="checkbox2"/> 2</label>
  <label><input type="checkbox" class="checkbox2"/> 3</label>
</span>

<button type="button" is="x-checkboxes-ctrl"
  data-course="check"
  data-targets-name="checkbox3[]"
>Check all</button>
<span>
  <label><input type="checkbox" name="checkbox3[]"/> 1</label>
  <label><input type="checkbox" name="checkbox3[]"/> 2</label>
  <label><input type="checkbox" name="checkbox3[]"/> 3</label>
</span>
```

## Attributes

<dl>
<dt>type [optional]</dt>
<dd>This function automatically sets <code>type="button"</code>.
However, it is recommended to manually add <code>type="button"</code> for JavaScript disabled environments and browsers that do not <a href="https://caniuse.com/custom-elementsv1">support Customized built-in elements</a> (Safari 14, Edge Legacy, etc.). According to <a href="https://html.spec.whatwg.org/multipage/form-elements.html#attr-button-type">the description in the HTML specification</a>, <q cite="https://html.spec.whatwg.org/multipage/form-elements.html#attr-button-type">The missing value default and invalid value default are the <a href="https://html.spec.whatwg.org/multipage/form-elements.html#attr-button-type-submit-state">Submit Button</a> state</q>.</dd>
<dt>data-course [required]</dt>
<dd>'check' / 'uncheck'</dd>
<dt>data-target-for [conditionally required]</dt>
<dd>An ancestor element's ID of the checkboxes. (One of the `data-targets-class`, `data-targets-name`, or this attribute is required)</dd>
<dt>data-targets-class [conditionally required]</dt>
<dd>Checkboxes `class` attribute value. (One of the `data-target-for`, `data-targets-name`, or this attribute is required)</dd>
<dt>data-targets-name [conditionally required]</dt>
<dd>Checkboxes `name` attribute value. (One of the `data-target-for`, `data-targets-class`, or this attribute is required)</dd>
</dl>
