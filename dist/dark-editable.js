/*!
 * DarkEditable.js v2.1.7
 * License: MIT
 */
import { Popover as p } from "bootstrap";
import './dark-editable.css';class c {
  context;
  constructor(t) {
    if (this.constructor === c)
      throw new Error("It's abstract class");
    this.context = t;
  }
  event_show() {
    if (this.context.typeElement.hideError(), !this.context.typeElement.element)
      throw new Error("Element is missing!");
    this.context.typeElement.element.value = this.context.getValue(), this.context.element.dispatchEvent(new CustomEvent("show", { detail: { DarkEditable: this.context } }));
  }
  event_shown() {
    this.context.element.dispatchEvent(new CustomEvent("shown", { detail: { DarkEditable: this.context } }));
  }
  event_hide() {
    this.context.element.dispatchEvent(new CustomEvent("hide", { detail: { DarkEditable: this.context } }));
  }
  event_hidden() {
    this.context.element.dispatchEvent(new CustomEvent("hidden", { detail: { DarkEditable: this.context } }));
  }
  init() {
    throw new Error("Method `init` not define!");
  }
  enable() {
    throw new Error("Method `enable` not define!");
  }
  disable() {
    throw new Error("Method `disable` not define!");
  }
  hide() {
    throw new Error("Method `hide` not define!");
  }
}
class d extends c {
  popover = null;
  init() {
    const t = {
      container: "body",
      content: this.context.typeElement.create(),
      html: !0,
      customClass: "dark-editable",
      title: this.context.options.title
    };
    this.popover = new p(this.context.element, Object.assign(
      t,
      this.context.options.popoverOptions
    )), this.context.element.addEventListener("show.bs.popover", () => {
      this.event_show();
    }), this.context.element.addEventListener("shown.bs.popover", () => {
      this.event_shown();
    }), this.context.element.addEventListener("hide.bs.popover", () => {
      this.event_hide();
    }), this.context.element.addEventListener("hidden.bs.popover", () => {
      this.event_hidden();
    }), document.addEventListener("click", (e) => {
      const s = e.target;
      if (this.popover && s === this.popover.tip || s === this.context.element) return;
      let n = s.parentNode;
      for (; n; ) {
        if (n === this.popover.tip) return;
        n = n.parentNode;
      }
      this.hide();
    });
  }
  enable() {
    this.popover && this.popover.enable();
  }
  disable() {
    this.popover && this.popover.disable();
  }
  hide() {
    this.popover && this.popover.hide();
  }
}
class u extends c {
  init() {
    const t = () => {
      if (!this.context.options.disabled) {
        const e = this.context.typeElement.create();
        this.event_show(), this.context.element.removeEventListener("click", t), this.context.element.innerHTML = "", this.context.element.append(e), this.event_shown();
      }
    };
    this.context.element.addEventListener("click", t);
  }
  enable() {
  }
  disable() {
  }
  hide() {
    this.event_hide(), this.context.element.innerHTML = this.context.getValue(), setTimeout(() => {
      this.init(), this.event_hidden();
    }, 100);
  }
}
class r {
  context;
  element = null;
  error = null;
  form = null;
  load = null;
  buttons = { success: null, cancel: null };
  constructor(t) {
    if (this.constructor === r)
      throw new Error("It's abstract class");
    this.context = t;
  }
  create() {
    throw new Error("Method `create` not define!");
  }
  createContainer(t) {
    const e = document.createElement("div");
    return this.element = t, this.error = this.createContainerError(), this.form = this.createContainerForm(), this.load = this.createContainerLoad(), this.form.append(t, this.load), this.buttons.success = null, this.buttons.cancel = null, this.context.options.showbuttons && (this.buttons.success = this.createButtonSuccess(), this.buttons.cancel = this.createButtonCancel(), this.form.append(this.buttons.success, this.buttons.cancel)), e.append(this.error, this.form), e;
  }
  createContainerError() {
    const t = document.createElement("div");
    return t.classList.add("text-danger", "fst-italic", "mb-2", "fw-bold"), t.style.display = "none", t;
  }
  createContainerForm() {
    const t = document.createElement("form");
    return t.classList.add("d-flex", "align-items-start"), t.style.gap = "10px", t.addEventListener("submit", async (e) => {
      e.preventDefault();
      const s = this.getValue();
      if (this.context.options.send && this.context.options.id && this.context.options.url && this.context.getValue() !== s) {
        this.showLoad();
        let n;
        try {
          const i = await this.ajax(s);
          i.ok ? n = await this.context.success(i, s) : n = await this.context.error(i, s) || `${i.status} ${i.statusText}`;
        } catch (i) {
          console.error(i), n = i;
        }
        n ? (this.setError(n), this.showError()) : (this.setError(""), this.hideError(), this.context.setValue(this.getValue()), this.context.modeElement.hide(), this.initText()), this.hideLoad();
      } else
        this.context.setValue(this.getValue()), this.context.modeElement.hide(), this.initText();
      this.context.element.dispatchEvent(new CustomEvent("save", { detail: { DarkEditable: this.context } }));
    }), t;
  }
  createContainerLoad() {
    const t = document.createElement("div");
    t.style.display = "none", t.style.position = "absolute", t.style.background = "white", t.style.width = "100%", t.style.height = "100%", t.style.top = "0", t.style.left = "0";
    const e = document.createElement("div");
    return e.classList.add("dark-editable-loader"), t.append(e), t;
  }
  createButton() {
    const t = document.createElement("button");
    return t.type = "button", t.classList.add("btn", "btn-sm"), t;
  }
  createButtonSuccess() {
    const t = this.createButton();
    return t.type = "submit", t.classList.add("btn-success"), t.innerHTML = '<i class="fa-solid fa-check"></i>', t;
  }
  createButtonCancel() {
    const t = this.createButton();
    return t.classList.add("btn-danger"), t.innerHTML = '<i class="fa-solid fa-times"></i>', t.addEventListener("click", () => {
      this.context.modeElement.hide();
    }), t;
  }
  hideLoad() {
    this.load && (this.load.style.display = "none");
  }
  showLoad() {
    this.load && (this.load.style.display = "block");
  }
  ajax(t) {
    let e = this.context.options.url;
    if (!e)
      throw new Error("URL is required!");
    if (!this.context.options.id)
      throw new Error("pk is required!");
    if (!this.context.options.name)
      throw new Error("Name is required!");
    const s = new FormData();
    if (s.append("id", this.context.options.id), s.append("name", this.context.options.name), s.append("value", t), this.context.options.ajaxOptions?.method === "GET") {
      const i = [];
      s.forEach((a, l) => {
        i.push(`${l}=${a}`);
      }), e += "?" + i.join("&");
    }
    const n = { ...this.context.options.ajaxOptions };
    return n.body = s, fetch(e, n);
  }
  async successResponse(t, e) {
  }
  async errorResponse(t, e) {
  }
  setError(t) {
    this.error && (this.error.innerHTML = t);
  }
  showError() {
    this.error && (this.error.style.display = "block");
  }
  hideError() {
    this.error && (this.error.style.display = "none");
  }
  createElement(t) {
    const e = document.createElement(t);
    return e.classList.add("form-control"), this.context.options.required && (e.required = this.context.options.required), this.context.options.placeholder && (e.placeholder = this.context.options.placeholder), this.context.options.showbuttons || e.addEventListener("change", () => {
      this.form && this.form.dispatchEvent(new Event("submit"));
    }), this.add_focus(e), e;
  }
  add_focus(t) {
    this.context.element.addEventListener("shown", function() {
      t.focus();
    });
  }
  initText() {
    return this.context.getValue() === "" ? (this.context.element.innerHTML = this.context.options.emptytext || "", !0) : (this.context.element.innerHTML = this.context.getValue(), !1);
  }
  initOptions() {
  }
  getValue() {
    return this.element ? this.element.value : "";
  }
}
class m extends r {
  create() {
    const t = this.createElement("input");
    t.type = typeof this.context.options.type == "string" ? this.context.options.type : "text";
    const { options: e = {} } = this.context;
    t.type = typeof e.type == "string" ? e.type : "text";
    const s = e.attributes || {}, n = [
      "step",
      "min",
      "max",
      "minlength",
      "maxlength",
      "pattern",
      "placeholder",
      "required",
      "readonly",
      "disabled",
      "autocomplete",
      "autofocus",
      "name",
      "value"
    ];
    for (const [i, a] of Object.entries(s))
      n.includes(i) && a !== void 0 && t.setAttribute(i, String(a));
    return this.createContainer(t);
  }
}
class x extends r {
  create() {
    const t = this.createElement("textarea");
    return this.createContainer(t);
  }
}
class f extends r {
  create() {
    const t = this.createElement("select");
    return this.context.options.source && Array.isArray(this.context.options.source) && this.context.options.source.forEach((e) => {
      const s = document.createElement("option");
      s.value = e.value, s.innerHTML = e.text, t.append(s);
    }), this.createContainer(t);
  }
  initText() {
    if (this.context.element.innerHTML = this.context.options.emptytext || "", this.context.getValue() !== "" && this.context.options.source && Array.isArray(this.context.options.source) && this.context.options.source.length > 0)
      for (let t = 0; t < this.context.options.source.length; t++) {
        const e = this.context.options.source[t];
        if (e.value == this.context.getValue())
          return this.context.element.innerHTML = e.text, !1;
      }
    return !0;
  }
  initOptions() {
    this.context.get_opt("source", []), this.context.options && typeof this.context.options.source == "string" && this.context.options.source !== "" && (this.context.options.source = JSON.parse(this.context.options.source));
  }
}
class h extends r {
  create() {
    const t = this.createElement("input");
    return t.type = "date", this.createContainer(t);
  }
  initText() {
    const t = this.context.getValue();
    return t === "" ? (this.context.element.innerHTML = this.context.options.emptytext || "", !0) : (this.context.element.innerHTML = t, !1);
  }
  initOptions() {
    this.context.setValue(this.context.getValue());
  }
}
class E extends h {
  create() {
    const t = this.createElement("input");
    return t.type = "datetime-local", this.createContainer(t);
  }
  initOptions() {
    this.context.setValue(this.context.getValue());
  }
}
class y {
  element;
  options;
  typeElement;
  modeElement;
  constructor(t, e = {}) {
    this.element = t, this.options = { ...e }, this.init_options(), this.typeElement = this.route_type(), this.typeElement.initOptions(), this.modeElement = this.route_mode(), this.modeElement.init(), this.setValue(this.element.innerHTML), this.init_style(), this.options.disabled && this.disable(), this.element.dispatchEvent(new CustomEvent("init", { detail: { DarkEditable: this } }));
  }
  /* INIT METHODS */
  get_opt(t, e) {
    return this.options[t] = this.element.dataset?.[t] ?? this.options?.[t] ?? e;
  }
  get_opt_bool(t, e) {
    if (this.get_opt(t, e), typeof this.options[t] != "boolean") {
      if (this.options[t] === "true") {
        this.options[t] = !0;
        return;
      }
      if (this.options[t] === "false") {
        this.options[t] = !1;
        return;
      }
      this.options[t] = e;
    }
  }
  init_options() {
    this.get_opt("value", this.element.innerHTML), this.get_opt("name", this.element.id), this.get_opt("id", null), this.get_opt("title", ""), this.get_opt("type", "text"), this.get_opt("emptytext", "Empty"), this.get_opt("placeholder", this.element.getAttribute("placeholder")), this.get_opt("mode", "popup"), this.get_opt("url", null), this.get_opt("ajaxOptions", {}), this.options.ajaxOptions = Object.assign({
      method: "POST",
      dataType: "text",
      headers: {
        RequestVerificationToken: document.querySelector('input[name="__RequestVerificationToken"]')?.value
      }
    }, this.options.ajaxOptions), this.get_opt_bool("send", !0), this.get_opt_bool("disabled", !1), this.get_opt_bool("required", !1), this.get_opt_bool("showbuttons", !0), this.options?.success && typeof this.options?.success == "function" && (this.success = this.options.success), this.options?.error && typeof this.options?.error == "function" && (this.error = this.options.error), this.get_opt("attributes", {}), this.get_opt("popoverOptions", {});
  }
  init_text() {
    const t = "dark-editable-element-empty";
    this.element.classList.remove(t), this.typeElement.initText() && this.element.classList.add(t);
  }
  init_style() {
    this.element.classList.add("dark-editable-element");
  }
  /* INIT METHODS END */
  route_mode() {
    switch (this.options.mode) {
      default:
        throw new Error(`Mode ${this.options.mode} not found!`);
      case "popup":
        return new d(this);
      case "inline":
        return new u(this);
    }
  }
  route_type() {
    if (this.options.type && typeof this.options.type != "string")
      return new this.options.type(this);
    switch (this.options.type) {
      case "text":
      case "password":
      case "email":
      case "url":
      case "tel":
      case "number":
      case "range":
      case "time":
        return new m(this);
      case "textarea":
        return new x(this);
      case "select":
        return new f(this);
      case "date":
        return new h(this);
      case "datetime":
        return new E(this);
    }
    throw new Error("Undefined type");
  }
  /* AJAX */
  async success(t, e) {
    return await this.typeElement.successResponse(t, e);
  }
  async error(t, e) {
    return await this.typeElement.errorResponse(t, e);
  }
  /* AJAX END */
  /* METHODS */
  enable() {
    this.options.disabled = !1, this.element.classList.remove("dark-editable-element-disabled"), this.modeElement.enable();
  }
  disable() {
    this.options.disabled = !0, this.element.classList.add("dark-editable-element-disabled"), this.modeElement.disable();
  }
  setValue(t) {
    this.options.value = t, this.init_text();
  }
  getValue() {
    return this.options.value ?? "";
  }
  getOption(t) {
    return this.options[t] ?? null;
  }
  /* METHODS END */
}
export {
  y as default
};
//# sourceMappingURL=dark-editable.js.map
