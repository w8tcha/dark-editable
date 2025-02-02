import BaseType from "./BaseType.js";

export default class InputType extends BaseType{
    create(){
        const input = this.createElement(`input`);
        input.type = typeof this.context.options.type === "string" ? this.context.options.type : 'text';

        return this.createContainer(input);
    }
}