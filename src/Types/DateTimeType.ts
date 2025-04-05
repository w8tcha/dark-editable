import DateType from "./DateType.js";

export default class DateTimeType extends DateType{
    create(){
        const input = this.createElement(`input`);
        input.type = "datetime-local";

        return this.createContainer(input);
    }

    initOptions(): void
    {
	    //const format = this.context.get_opt("format", "YYYY-MM-DD HH:mm");
	    //const viewformat = this.context.get_opt("viewformat", "YYYY-MM-DD HH:mm");
	    this.context.setValue(this.context.getValue());
    }
}