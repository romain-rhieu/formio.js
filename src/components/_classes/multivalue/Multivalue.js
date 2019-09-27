import Field from '../field/Field';
import _ from 'lodash';

export default class Multivalue extends Field {
  get dataValue() {
    const parent = super.dataValue;

    if (!parent && this.component.multiple) {
      return [];
    }
    return parent;
  }

  set dataValue(value) {
    super.dataValue = value;
  }

  get defaultValue() {
    if (this.component.multiple) {
      return [super.defaultValue];
    }
    return super.defaultValue;
  }

  get addAnother() {
    return this.t(this.component.addAnother || ' Add Another');
  }

  useWrapper() {
    return this.component.hasOwnProperty('multiple') && this.component.multiple;
  }

  render() {
    // If single value field.
    if (!this.useWrapper()) {
      return super.render(`<div ref="element">${this.renderElement(this.dataValue)}</div>`);
    }

    // If multiple value field.
    return super.render(this.renderTemplate('multiValueTable', {
      rows: this.dataValue.map(this.renderRow.bind(this)).join(''),
      disabled: this.disabled,
      addAnother: this.addAnother,
    }));
  }

  renderElement() {
    return '';
  }

  renderRow(value, index) {
    return this.renderTemplate('multiValueRow', {
      index,
      disabled: this.disabled,
      element: `${this.renderElement(value, index)}`,
    });
  }

  attach(dom) {
    const superAttach = super.attach(dom);
    this.loadRefs(dom, {
      addButton: 'multiple',
      input: 'multiple',
      removeRow: 'multiple',
      mask: 'multiple',
      select: 'multiple',
    });

    this.refs.input.forEach(this.attachElement.bind(this));
    if (!this.component.multiple) {
      return;
    }

    this.refs.removeRow.forEach((removeButton, index) => {
      this.addEventListener(removeButton, 'click', (event) => {
        event.preventDefault();
        this.removeValue(index);
      });
    });

    // If single value field.
    this.refs.addButton.forEach((addButton) => {
      this.addEventListener(addButton, 'click', (event) => {
        event.preventDefault();
        this.addValue();
      });
    });
    return superAttach;
  }

  /**
   * Attach inputs to the element.
   *
   * @param element
   * @param index
   */
  attachElement(element, index) {
    this.addEventListener(element, this.inputInfo.changeEvent, () => {
      // Delay update slightly to give input mask a chance to run.
      const textCase = _.get(this.component, 'case', 'mixed');
      if (textCase !== 'mixed') {
        const {
          selectionStart,
          selectionEnd,
        } = element;

        if (textCase === 'uppercase' && element.value) {
          element.value = element.value.toUpperCase();
        }
        if (textCase === 'lowercase' && element.value) {
          element.value = element.value.toLowerCase();
        }

        element.selectionStart = selectionStart;
        element.selectionEnd = selectionEnd;
      }
      // If a mask is present, delay the update to allow mask to update first.
      if (element.mask) {
        setTimeout(() => {
          return this.updateValue(null, {
            modified: true
          }, index);
        }, 1);
      }
      else {
        return this.updateValue(null, {
          modified: true
        }, index);
      }
    });

    if (!this.tryAttachMultipleMasksInput()) {
      this.setInputMask(this.refs.input[index]);
    }
  }

  onSelectMaskHandler(event) {
    const mask = this.component.inputMasks
      .find(inputMask => inputMask.label === event.target.value);

    if (mask) {
      this.updateMask(this.refs.mask[0], mask.mask);
    }
  }

  tryAttachMultipleMasksInput() {
    if (!(this.isMultipleMasksField && this.component.inputMasks.length && this.refs.input.length)) {
      return false;
    }

    this.refs.select[0].onchange = this.onSelectMaskHandler.bind(this);
    const input = this.refs.mask[0];
    const mask = this.activeMask || this.component.inputMasks[0].mask;
    this.activeMask = mask;
    this.setInputMask(input, mask);

    return true;
  }

  updateMask(input, mask) {
    this.activeMask = mask;
    //destroy previous mask
    if (input.mask) {
      input.mask.destroy();
    }
    //set new text field mask
    this.setInputMask(input, mask, !this.component.placeholder);
    //update text field value after new mask is applied
    this.updateValue();
  }

  /**
   * Adds a new empty value to the data array.
   */
  addNewValue(value) {
    if (value === undefined) {
      value = this.component.defaultValue ?
      this.component.defaultValue : this.emptyValue;
      // If default is an empty aray, default back to empty value.
      if (Array.isArray(value) && value.length === 0) {
        value = this.emptyValue;
      }
    }
    let dataValue = this.dataValue || [];
    if (!Array.isArray(dataValue)) {
      dataValue = [dataValue];
    }

    if (Array.isArray(value)) {
      dataValue = dataValue.concat(value);
    }
    else {
      dataValue.push(value);
    }
    this.dataValue = dataValue;
  }

  /**
   * Adds a new empty value to the data array, and add a new row to contain it.
   */
  addValue() {
    this.addNewValue();
    this.redraw();
    this.checkConditions(this.root ? this.root.data : this.data);
    if (!this.isEmpty(this.dataValue)) {
      this.restoreValue();
    }
    if (this.root) {
      this.root.onChange();
    }
  }
}
