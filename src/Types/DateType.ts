import BaseType from "./BaseType.js";

export default class DateType extends BaseType{
    create(){
        const input = this.createElement(`input`);
        input.type = "date";

        return this.createContainer(input);
    }

    initText(): boolean
    {
	    const value = this.context.getValue();
	    if (value === "") {
            this.context.element.innerHTML = this.context.options.emptytext || "";
            return true;
        } else {
            this.context.element.innerHTML = value;
            return false;
        }
    }

    initOptions(): void
    {
	    //const format = this.context.get_opt("format", "YYYY-MM-DD");
	    //const viewformat = this.context.get_opt("viewformat", "YYYY-MM-DD");
	    this.context.setValue(this.context.getValue());
    }
}