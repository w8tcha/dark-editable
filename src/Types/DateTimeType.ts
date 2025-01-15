import DateType from "./DateType.js";

export default class DateTimeType extends DateType{
    create(){
        const input = this.createElement(`input`);
        input.type = "datetime-local";

        return this.createContainer(input);
    }

    initOptions(): void
    {
        this.context.get_opt("format", "YYYY-MM-DD HH:mm");
        this.context.get_opt("viewformat", "YYYY-MM-DD HH:mm");
        this.context.value = this.context.value;
    }
}