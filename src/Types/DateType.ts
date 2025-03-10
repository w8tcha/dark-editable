import BaseType from "./BaseType.js";

export default class DateType extends BaseType{
    create(){
        const input = this.createElement(`input`);
        input.type = "date";

        return this.createContainer(input);
    }

    initText(): boolean
    {
		if(this.context.getValue() === ""){
            this.context.element.innerHTML = this.context.options.emptytext || "";
            return true;
        } else {
            this.context.element.innerHTML = this.context.getValue();
            return false;
        }
    }

    initOptions(): void
    {
        this.context.get_opt("format", "YYYY-MM-DD");
        this.context.get_opt("viewformat", "YYYY-MM-DD");
    }
}