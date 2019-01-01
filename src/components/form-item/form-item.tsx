import {Component, Inject, Prop, Provide} from 'vue-property-decorator';
import Vue, {CreateElement, VNode} from 'vue';
import {objAssign, prefixCls, propOfPath} from '../../utils/assist';
import AsyncValidator from 'async-validator';

@Component

class FormItem extends Vue {

    @Provide()
    public rbtFormItem = this;

    @Inject({
        from: 'rbtForm',
        default: {}
    })
    public form ?: any;

    @Prop({
        type: String
    })
    public label?: string;

    @Prop({
        type: String
    })
    public labelWidth?: string;

    @Prop({
        type: String,
        default: ''
    })
    public prop!: string;

    @Prop({
        type: [Boolean],
        default: undefined
    })
    public required?: boolean|undefined;

    @Prop({
        type: [Object, Array],
    })
    public rules?: object | object[];

    public validateState: string = '';
    public validateMessage: string = '';
    public validateDisabled: boolean = false;

    public get fieldValue(): any {
        const model = this.form.model;

        if (!model || !this.prop){
            return;
        }
        const cache = propOfPath(model, this.prop, true);
        return cache.value;
    }

    public validate(trigger: string , callback: any = null ): any {
        this.validateDisabled = false;
        const rules = this.getFilteredRule(trigger);
        if ((!rules || rules.length === 0) && this.required === undefined) {
            callback();
            return true;
        }

        const descriptor = {};
        if (rules && rules.length > 0) {
            descriptor[this.prop] = rules.map(rule => {
                delete rule.trigger;
                return rule;
            });
        }

        this.validateState = 'validating';

        const validator = new AsyncValidator(descriptor);
        const model = {};

        model[this.prop] = this.fieldValue;
        validator.validate(model, { firstFields: true }, (errors, invalidFields) => {
            this.validateState = !errors ? 'success' : 'error';
            this.validateMessage = errors ? errors[0].message : '';

            callback(this.validateMessage, invalidFields);
            // this.form && this.form.$emit('validate', this.prop, !errors, this.validateMessage || null);
        });
    }

    public clearValidate() {
        this.validateState = '';
        this.validateMessage = '';
        this.validateDisabled = false;
    }

    private getFilteredRule(trigger: string): any {
        const rules = this.getRules();

        return rules.filter(rule => {
            if (!rule.trigger || trigger === '') {
                return true;
            }
            if (Array.isArray(rule.trigger)) {
                return rule.trigger.indexOf(trigger) > -1;
            } else {
                return rule.trigger === trigger;
            }
        }).map(rule => objAssign(rule));
    }

    private getRules(): any[] {
        const selfRules = this.rules;
        const formRules = this.form.rules && this.form.rules[this.prop];
        const requiredRule = (this.required !== undefined) ? {required: this.required} : [];

        const result: any[] = [];
        return result.concat(selfRules || formRules || []).concat(requiredRule);
    }

    public mounted(): void {
        if (this.prop) {
            this.form.fieldAdd && this.form.fieldAdd(this);
            this.validate('', (m , v) => {
                console.log('m :', m);
                console.log('v :', v);
            });
        }
    }

    public beforeDestroy() {
        if (this.prop) {
            this.form.fieldRemove && this.form.fieldRemove(this);
        }
    }

    public get className(): object {
        return {
            [`${prefixCls}form-item`]: true,
        };
    }

    public render(h: CreateElement): VNode {
        const { $slots, className, fieldValue } = this;
        return (
            <div class={className}>
                <div>
                    123
                    {fieldValue}
                </div>
                {$slots.default}
            </div>
        );
    }

}

export default FormItem;
