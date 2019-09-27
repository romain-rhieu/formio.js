import Component from '../_classes/component/Component';

export default class HTMLComponent extends Component {
  static schema(...extend) {
    return Component.schema({
      label: 'HTML',
      type: 'htmlelement',
      tag: 'p',
      attrs: [],
      content: '',
      input: false,
      persistent: false
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'HTML Element',
      group: 'layout',
      icon: 'code',
      weight: 0,
      documentation: 'http://help.form.io/userguide/#html-element-component',
      schema: HTMLComponent.schema()
    };
  }

  get defaultSchema() {
    return HTMLComponent.schema();
  }

  get content() {
    return this.component.content ? this.interpolate(this.component.content, {
      data: this.rootValue,
      row: this.data
    }) : '';
  }

  get singleTags() {
    return ['br', 'img', 'hr'];
  }

  render() {
    return super.render(this.renderTemplate('html', {
      component: this.component,
      tag: this.component.tag,
      attrs: this.component.attrs || {},
      content: this.content,
      singleTags: this.singleTags,
    }));
  }

  attach(element) {
    this.loadRefs(element, { html: 'single' });
    if (this.component.refreshOnChange) {
      this.on('change', () => {
        if (this.refs.html) {
          this.setContent(this.refs.html, this.content);
        }
      }, true);
    }
    return super.attach(element);
  }
}
